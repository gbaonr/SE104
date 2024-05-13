import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

export interface ArticleProps {
  title: string;
  content: string;
  thumbnail: string;
}

export default function Article(props: ArticleProps) {
  return (
    <Paper sx={{ borderRadius: "5px" }}>
      <Box
        sx={{
          cursor: "pointer",
          width: "100%",
        }}
      >
        <img src="https://source.unsplash.com/random/400x200" alt="random" />
      </Box>

      <Box sx={{ p: 1 }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: "1rem",
            color: "#37003c",
            "&:hover": {
              color: "#8e24aa",
              textDecorationLine: "underline",
            },
          }}
        >
          <Link to="#">{props.title}</Link>
        </Typography>
      </Box>
    </Paper>
  );
}
