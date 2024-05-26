import LockIcon from "@mui/icons-material/Lock";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { USER_ROUTES } from "constants/Paths";

const BackgroundBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f0f4f8",
  padding: theme.spacing(2),
  textAlign: "center",
}));

const ContentBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  padding: theme.spacing(4),
  maxWidth: "500px",
  width: "100%",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const PermissionDeniedPage = () => {
  return (
    <BackgroundBox>
      <ContentBox>
        <LockIcon color="primary" style={{ fontSize: 60, marginBottom: 16 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Permission Denied
        </Typography>
        <Typography variant="body1" gutterBottom>
          You do not have permission to access this page.
        </Typography>
        <StyledButton variant="contained" color="primary" href={USER_ROUTES.HOME}>
          Go to Home
        </StyledButton>
      </ContentBox>
    </BackgroundBox>
  );
};

export default PermissionDeniedPage;
