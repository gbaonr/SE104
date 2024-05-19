import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Button, Container, Typography } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: "#ff1744" }} />
      <Typography variant="h2" component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h5" component="h2" color="textSecondary" gutterBottom>
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary" href="/">
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
