import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { loginApi } from "apis/auth";
import { ToastContainer, toast } from "react-toastify";

import HeaderPage from "../User/components/Layouts/PageHeader";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

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
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <ToastContainer />
      </Container>
    </>
  );
}
