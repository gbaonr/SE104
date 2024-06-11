import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Referee } from "../MatchManager/apis/types";
import { addRefereeApi } from "./apis/add-referee";
import { toast } from "react-toastify";
import { updatecRefereeApi } from "./apis/update-referee";
import { validateReferee } from "../MatchManager/utils/validator";

const optionInput = [
  { id: "ref_name", name: "Full Name", width: 2, prop: "ref_name" },
  { id: "ref_nation", name: "Nation", width: 1, prop: "ref_nation" },
  { id: "ref_mail", name: "Email", width: 2, prop: "ref_mail" },
  { id: "ref_bday", name: "Date of Birth", width: 2, prop: "ref_bday" },
];

type AddRefereeProps = {
  showAddUser: boolean;
  setShowAddUser: (value: boolean) => void;
  // users: User[];
  // setUsers: (value: User[]) => void;
  // fetchUsers: () => Promise<User[]>;
  referees: Referee[];
  setReferees: (value: Referee[]) => void;
  fetchReferees: () => Promise<void>;
  currentEditUser: Referee | null;
  setCurrentEditUser: (value: Referee | null) => void;
  typeEdit: string;
};

export const AddRefereePopup = ({
  showAddUser,
  setShowAddUser,
  currentEditUser,
  setCurrentEditUser,
  typeEdit,
  referees,
  setReferees,
  fetchReferees,
}: AddRefereeProps) => {
  const [inputFullname, setInputFullname] = useState("");
  const [inputNation, setInputNation] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputBirthday, setInputBirthday] = useState(Date.now() / 1000);

  useEffect(() => {
    if (currentEditUser) {
      setInputFullname(currentEditUser.ref_name);
      setInputEmail(currentEditUser.ref_mail);
      setInputNation(currentEditUser.ref_nation);
      setInputBirthday(currentEditUser.ref_bday);
    }
  }, [currentEditUser]);

  useEffect(() => {
    if (!showAddUser) {
      setInputFullname("");
      setInputEmail("");
      setInputNation("");
      setInputBirthday(Date.now() / 1000);
      setCurrentEditUser(null);
    }
  }, [showAddUser, setCurrentEditUser]);

  return (
    <>
      {showAddUser && (
        <Dialog open={showAddUser} onClose={(e) => setShowAddUser(false)}>
          <DialogTitle>{typeEdit === "add" ? "Add" : "Edit"} User</DialogTitle>

          <DialogContent>
            <Grid container columns={12} spacing={2} sx={{ mt: 1 }}>
              {optionInput.map((column) => {
                let value = null;

                if (column.id === "ref_bday") {
                  value = (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="Date"
                          value={dayjs.unix(inputBirthday)}
                          onChange={(e) => {
                            setInputBirthday(e.unix());
                          }}
                          views={["day", "month", "year"]}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  );
                } else if (
                  column.id === "ref_name" ||
                  column.id === "ref_nation" ||
                  column.id === "ref_mail"
                ) {
                  value = (
                    <TextField
                      fullWidth
                      label={column.name}
                      value={
                        column.id === "ref_name"
                          ? inputFullname
                          : column.id === "ref_nation"
                            ? inputNation
                            : column.id === "ref_mail"
                              ? inputEmail
                              : ""
                      }
                      id={column.id}
                      onChange={(e) => {
                        if (column.id === "ref_name") {
                          setInputFullname(e.target.value);
                        } else if (column.id === "ref_mail") {
                          setInputEmail(e.target.value);
                        } else if (column.id === "ref_nation") {
                          setInputNation(e.target.value);
                        }
                      }}
                    />
                  );
                }

                return (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                    }}
                  >
                    {column.id === "password" && typeEdit === "edit" ? null : column.id ===
                        "confirm_password" && typeEdit === "edit" ? null : (
                      <>
                        <Grid
                          item
                          xs={4}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Typography>{column.name}</Typography>
                        </Grid>

                        <Grid item xs={8}>
                          {value}
                        </Grid>
                      </>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                backgroundColor: "#ff5c5c",
                p: 1,
                m: 1,
                fontWeight: 700,
                "&:hover": {
                  color: "white",
                  backgroundColor: "#ff5c5c",
                },
              }}
              onClick={() => setShowAddUser(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                backgroundColor: "#4caf50",
                p: 1,
                m: 1,
                fontWeight: 700,
                "&:hover": {
                  color: "white",
                  backgroundColor: "#4caf50",
                },
              }}
              onClick={() => {
                (async () => {
                  const data = {
                    ref_name: inputFullname,
                    ref_nation: inputNation,
                    ref_mail: inputEmail,
                    ref_bday: inputBirthday,
                  };

                  if (validateReferee(data) !== "") {
                    toast.error(validateReferee(data));
                    setShowAddUser(false);
                    return;
                  }

                  if (typeEdit === "add") {
                    const res = await addRefereeApi(data);

                    if (res.status === "success") {
                      toast.success("Referee added successfully");
                      await fetchReferees();
                    }

                    setShowAddUser(false);
                  }

                  if (typeEdit === "edit") {
                    data["ref_id"] = currentEditUser?.ref_id;

                    const res = await updatecRefereeApi(data);

                    if (res.status === "success") {
                      toast.success("Referee updated successfully");
                      await fetchReferees();
                    }
                  }

                  setShowAddUser(false);
                })();
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
