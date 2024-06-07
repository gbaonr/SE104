import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { loginApi } from "apis/auth";
import { USER_ROUTES } from "constants/Paths";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import HeaderPage from "../User/components/Layouts/PageHeader";
import { useAuth } from "./AuthProvider";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { token, setToken } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    if (typeof username === "string" && typeof password === "string") {
      const response = await loginApi(username, password);

      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      console.log(response.data);
      const { access_token } = response.data;
      setToken(access_token);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (token) {
    return <Navigate to={USER_ROUTES.HOME} />;
  }

  return (
    <>
      <HeaderPage headerName="Sign In" />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              InputProps={{
                endAdornment: (
                  <VisibilityIcon onClick={handleShowPassword} sx={{ cursor: "pointer" }} />
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#007bff", color: "#fff" }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
