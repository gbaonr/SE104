import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getRefereesApi } from "../MatchManager/apis/get-referees";
import { Referee } from "../MatchManager/apis/types";
import { AddRefereePopup } from "./AddReferee";
import { deleteRefereeApi } from "./apis/delete-referee";
// import { deleteUserApi } from "./apis/delete-users";

// TODO: add team for manager
const usersColumns = [
  { id: "id", header: "#", width: 1, prop: "user_id" },
  { id: "ref_name", header: "Full Name", width: 2, prop: "ref_name" },
  { id: "ref_nation", header: "Nation", width: 1, prop: "ref_nation" },
  { id: "ref_mail", header: "Email", width: 2, prop: "ref_mail" },
  { id: "ref_bday", header: "Date of Birth", width: 2, prop: "ref_bday" },
  { id: "edit", header: "Edit", width: 1, prop: "edit" },
  { id: "delete", header: "Delete", width: 1, prop: "delete" },
];

export const LoadingReferees = () => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState<Referee>(null);
  const [typeEdit, setTypeEdit] = useState("add");
  const [referees, setReferees] = useState<Referee[]>([]);

  const fetchReferees = async () => {
    const response = await getRefereesApi();

    if (response?.status === "success") {
      setReferees(response.data);
    }
  };

  useEffect(() => {
    fetchReferees();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        p: 2,
        boxShadow: "0 0 10px 0 rgba(100, 100, 100, 0.1)",
        borderRadius: 2,
        mb: 2,
      }}
    >
      <AddRefereePopup
        // users={users}
        // setUsers={setUsers}
        showAddUser={showAddUser}
        setShowAddUser={setShowAddUser}
        // fetchUsers={fetchUsers}
        referees={referees}
        setReferees={setReferees}
        fetchReferees={fetchReferees}
        currentEditUser={currentEditUser}
        setCurrentEditUser={setCurrentEditUser}
        typeEdit={typeEdit}
      />

      <Box
        sx={{
          display: "flex",
          alignContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.7rem",
            color: "#37003c",
            mb: 4,
          }}
        >
          Referees Management
        </Typography>

        <Button
          variant="outlined"
          onClick={(e) => {
            setTypeEdit("add");
            setShowAddUser(true);
          }}
          sx={{
            color: "white",
            backgroundColor: "#4caf50",
            p: 1,
            m: 1,
            "&:hover": {
              color: "#4caf50",
              backgroundColor: "white",
            },
          }}
        >
          <AddBoxIcon />
        </Button>
      </Box>

      {/* loading users */}
      <Box>
        <Grid
          container
          columns={{ xs: usersColumns.reduce((acc, column) => acc + column.width, 0) }}
        >
          {/* load header */}
          {usersColumns.map((column) => (
            <Grid
              item
              xs={column.width}
              sx={{
                border: "1px solid #f0f0f0",
                p: "0.5rem !important",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {column.header}
            </Grid>
          ))}

          {/* load users */}
          {referees.map((referee, index) => (
            <Grid
              container
              key={referee.ref_id}
              columns={{ xs: usersColumns.reduce((acc, column) => acc + column.width, 0) }}
            >
              {usersColumns.map((column) => {
                if (column.prop === "edit" || column.prop === "delete") {
                  return (
                    <Grid
                      item
                      xs={column.width}
                      sx={{
                        border: "1px solid #f0f0f0",
                        textAlign: "center",
                        p: "0.5rem !important",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: column.id === "edit" ? "gray" : "red",
                          color: "white",
                        }}
                        onClick={(e) => {
                          (async () => {
                            const userId = referee.ref_id;
                            // const userId = 189414;

                            if (column.id === "edit") {
                              setCurrentEditUser(referee);
                              setShowAddUser(true);
                              setTypeEdit("edit");
                            } else {
                              const response = await deleteRefereeApi(referee);

                              if (response?.status === "success") {
                                toast.success("User deleted successfully");
                                fetchReferees();
                              }
                            }
                          })();
                        }}
                      >
                        {column.id === "edit" && <EditIcon />}
                        {column.id === "delete" && <DeleteIcon />}
                      </Button>
                    </Grid>
                  );
                }

                return (
                  <Grid
                    item
                    xs={column.width}
                    sx={{
                      border: "1px solid #f0f0f0",
                      p: "0.5rem !important",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {column.id === "id"
                      ? index + 1
                      : column.id === "ref_bday"
                        ? dayjs.unix(referee[column.prop]).format("DD/MM/YYYY")
                        : referee[column.prop]}
                  </Grid>
                );
              })}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
