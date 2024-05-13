import { Box, Container, Typography } from "@mui/material";

export default function HeaderPage(props: any) {
  return (
    <>
      <Container maxWidth={false} disableGutters sx={{ height: "200px", padding: "0 !important" }}>
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
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
            }}
          >
            {props.headerName}
          </Typography>
        </Box>
      </Container>
    </>
  );
}
