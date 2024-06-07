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
import { useState } from "react";
import { addUsersApi } from "./apis/add-users";
import { toast } from "react-toastify";

const optionInput = [
  { id: "full_name", name: "Full Name" },
  { id: "role", name: "Role" },
  { id: "user_name", name: "User Name" },
  { id: "user_mail", name: "User Mail" },
  { id: "user_nation", name: "User Nation" },
  { id: "user_bday", name: "User Birthday" },
  { id: "password", name: "Password" },
  { id: "confirm_password", name: "Confirm Password" },
];

type AddUserProps = {
  showAddUser: boolean;
  setShowAddUser: (value: boolean) => void;
};

const validatePassword = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

export const AddUserPopup = ({ showAddUser, setShowAddUser }: AddUserProps) => {
  const [inputFullname, setInputFullname] = useState<string>("");
  const [inputRole, setInputRole] = useState<string>("");
  const [inputUsername, setInputUsername] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputNation, setInputNation] = useState<string>("");
  const [inputBirthday, setInputBirthday] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState<string>("");

  // TODO: add validation for input
  const validateInput = () => {
    return (
      inputFullname !== "" &&
      inputRole !== "" &&
      inputUsername !== "" &&
      inputEmail !== "" &&
      inputNation !== "" &&
      inputBirthday !== "" &&
      inputPassword !== "" &&
      inputConfirmPassword !== ""
    );
  };

  return (
    <>
      {showAddUser && (
        <Dialog open={showAddUser} onClose={(e) => setShowAddUser(false)}>
          <DialogTitle>Add User</DialogTitle>

          <DialogContent>
            <Grid container columns={12} spacing={2} sx={{ mt: 1 }}>
              {optionInput.map((column) => {
                let value = null;

                if (column.id === "user_bday") {
                  value = (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="Date"
                          value={dayjs.unix(Number(inputBirthday))}
                          onChange={(e) => {
                            setInputBirthday(String(e.unix()));
                            console.log(e.unix());
                          }}
                          views={["day", "month", "year"]}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  );
                } else if (
                  column.id === "full_name" ||
                  column.id === "role" ||
                  column.id === "user_name" ||
                  column.id === "user_mail" ||
                  column.id === "user_nation" ||
                  column.id === "password" ||
                  column.id === "confirm_password"
                ) {
                  value = (
                    <TextField
                      fullWidth
                      label={column.name}
                      type={
                        column.id === "password" || column.id === "confirm_password"
                          ? "password"
                          : "text"
                      }
                      value={
                        column.id === "full_name"
                          ? inputFullname
                          : column.id === "role"
                            ? inputRole
                            : column.id === "user_name"
                              ? inputUsername
                              : column.id === "user_mail"
                                ? inputEmail
                                : column.id === "user_nation"
                                  ? inputNation
                                  : column.id === "password"
                                    ? inputPassword
                                    : inputConfirmPassword
                      }
                      id={column.id}
                      onChange={(e) => {
                        if (column.id === "full_name") {
                          setInputFullname(e.target.value);
                        } else if (column.id === "role") {
                          setInputRole(e.target.value);
                        } else if (column.id === "user_name") {
                          setInputUsername(e.target.value);
                        } else if (column.id === "user_mail") {
                          setInputEmail(e.target.value);
                        } else if (column.id === "user_nation") {
                          setInputNation(e.target.value);
                        } else if (column.id === "password") {
                          setInputPassword(e.target.value);
                        } else if (column.id === "confirm_password") {
                          setInputConfirmPassword(e.target.value);
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
                  if (!validatePassword(inputPassword, inputConfirmPassword)) {
                    toast.error("Passwords do not match");
                    setShowAddUser(false);
                    return;
                  }

                  console.log(inputBirthday);

                  const data = {
                    full_name: inputFullname,
                    role: inputRole,
                    user_name: inputUsername,
                    user_mail: inputEmail,
                    user_nation: inputNation,
                    user_bday: inputBirthday,
                    password: inputPassword,
                  };

                  const res = await addUsersApi(data);

                  if (res.status === "success") {
                    toast.success("User added successfully");
                  } else {
                    toast.error("Failed to add user");
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
