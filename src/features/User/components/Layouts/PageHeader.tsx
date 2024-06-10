import { Box, Container, Typography } from "@mui/material";

type HeaderPageProps = {
  headerName: string;
  logo?: string;
};

export default function HeaderPage({ headerName, logo }: HeaderPageProps) {
  return (
    <Container maxWidth={false} sx={{ height: "200px", padding: "0 !important", mb: 5 }}>
      <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundImage: `url(${"https://www.premierleague.com/resources/rebrand/v7.145.1/i/elements/backgrounds/primary-bg.svg"})`,
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              backgroundImage: `url(${"https://www.premierleague.com/resources/rebrand/v7.145.1/i/elements/backgrounds/primary-graphic.svg"})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "auto",
              backgroundPosition: "0 0",
            }}
          ></Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {logo && <img src={logo} alt={headerName} style={{ height: "100px" }} />}

          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "white",
              my: 1,
            }}
          >
            {headerName}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
