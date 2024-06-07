import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getUsersApi } from "./apis/get-users";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { AddUserPopup } from "./AddUser";
import { deleteUserApi } from "./apis/delete-users";
import { toast } from "react-toastify";

// TODO: add team for manager
const usersColumns = [
  { id: "id", header: "#", width: 1, prop: "user_id" },
  { id: "role", header: "Role", width: 1, prop: "role" },
  { id: "name", header: "Name", width: 2, prop: "full_name" },
  { id: "email", header: "Email", width: 2, prop: "user_mail" },
  { id: "nation", header: "Nation", width: 1, prop: "user_nation" },
  { id: "edit", header: "Edit", width: 1, prop: "edit" },
  { id: "delete", header: "Delete", width: 1, prop: "delete" },
];

const fetchUsers = async () => {
  const response = await getUsersApi({});

  if (response.status === "success") {
    return response.data;
  }

  return [];
};

export const LoadingUsers = () => {
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState(null);

  useEffect(() => {
    (async () => {
      const users = await fetchUsers();
      setUsers(users);
    })();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        p: 2,
        boxShadow: "0 0 10px 0 rgba(100, 100, 100, 0.1)",
        borderRadius: 2,
        my: 2,
      }}
    >
      <AddUserPopup
        users={users}
        setUsers={setUsers}
        showAddUser={showAddUser}
        setShowAddUser={setShowAddUser}
        fetchUsers={fetchUsers}
        currentEditUser={currentEditUser}
        setCurrentEditUser={setCurrentEditUser}
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
          User Management
        </Typography>

        <Button
          variant="outlined"
          onClick={(e) => setShowAddUser(true)}
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

      {/* loading filter */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          alignContent: "center",
        }}
      >
        {/* Team 1 */}
        {/* <TextField
          value={selectedTeamOne}
          sx={{ mr: 2 }}
          select
          label="Team 1"
          onChange={(e) => setSelectedTeamOne(e.target.value as string)}
        >
          {Object.keys(teamsInfo).map((team) => (
            <MenuItem key={team} value={team}>
              {team}
            </MenuItem>
          ))}
          <MenuItem value="All">All</MenuItem>
        </TextField> */}

        {/* Team 2 */}
        {/* <TextField
          value={selectedTeamTwo}
          sx={{ mr: 2 }}
          select
          label="Team 2"
          onChange={(e) => setSelectedTeamTwo(e.target.value as string)}
        >
          {Object.keys(teamsInfo).map((team) => (
            <MenuItem key={team} value={team}>
              {team}
            </MenuItem>
          ))}
          <MenuItem value="All">All</MenuItem>
        </TextField> */}

        {/* date filtering */}
        {/* <Box sx={{ mr: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(date) => setStartDate(date as Dayjs)}
                views={["day", "month", "year"]}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>

        <Box sx={{ mr: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date) => setEndDate(date as Dayjs)}
                views={["day", "month", "year"]}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box> */}
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
          {users.map((user, index) => (
            <Grid
              container
              key={user.id}
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
                            const userId = user.user_id;
                            // const userId = 189414;

                            if (column.id === "edit") {
                              setCurrentEditUser(user);
                              setShowAddUser(true);
                            } else {
                              const response = await deleteUserApi({ user_id: userId });

                              if (response.status === "success") {
                                toast.success("User deleted successfully");
                                setUsers(users.filter((user) => user.user_id !== userId));
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
                    {user[column.prop]}
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
