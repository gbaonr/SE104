import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Grid, Typography } from "@mui/material";
import { latestClubArticles } from "features/Admin/constants/Articles";
import { ReadingArticle } from "features/User/components/HomePage/ArticleList";
import { Team } from "types/Team";

type ArticlesProps = {
  team: Team;
};

export const Articles = ({ team }: ArticlesProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        p: 2,
        boxShadow: "0 0 10px 0 rgba(100, 100, 100, 0.1)",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#37003c",
            fontWeight: 700,
            mb: 4,
          }}
        >
          Articles
        </Typography>

        <Button
          variant="outlined"
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
          <EditIcon />
        </Button>
      </Box>

      <Grid container spacing={2}>
        {latestClubArticles.map((article, index) => (
          <Grid item xs={12} md={4} lg={4} xl={2} key={index}>
            <ReadingArticle data={article} showSource={false} showHorizontal={false} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
