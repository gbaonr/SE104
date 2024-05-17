import { Box, Container, Grid, Typography } from "@mui/material";
import { ReadingArticle } from "./ArticleList";
import { latestVideos, latestFPLNews, latestArticles } from "../../constants";

export default function RightSideBar() {
  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 900, color: "#37003c" }}>
          Latest Videos
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <ReadingArticle
              data={latestVideos[0]}
              showSource={false}
              showMoreInfo={true}
              headLine={true}
            />
          </Grid>

          <Grid item xs={6}>
            {latestVideos.map((article, index) => (
              <Grid item xs={12} key={index}>
                <ReadingArticle data={article} showSource={false} showHorizontal={true} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 900, color: "#37003c" }}>
          Latest News
        </Typography>

        <Grid container spacing={1}>
          {latestArticles.map((article, index) => (
            <Grid item xs={3} key={index}>
              <ReadingArticle data={article} showSource={true} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 900, color: "#37003c" }}>
          Latest FPL News
        </Typography>

        <Grid container spacing={1}>
          {latestFPLNews.map((article, index) => (
            <Grid item xs={4} key={index}>
              <ReadingArticle data={article} showSource={true} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
