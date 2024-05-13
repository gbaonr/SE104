import { Box, Container, Grid, Typography } from "@mui/material";
import { ArticleProps, ReadingArticle } from "./ArticleList";

const latestVideos: ArticleProps[] = [
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 1",
    thumbnail: "assets/images/main/random_image.jpeg",
    source: [
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
    ],
    moreInfo:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ...",
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 2",
    thumbnail: "assets/images/main/random_image.jpeg",
    source: [
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
    ],
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 3",
    thumbnail: "assets/images/main/random_image.jpeg",
    source: [
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
    ],
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 3",
    thumbnail: "assets/images/main/random_image.jpeg",
    source: [
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
    ],
  },
];

const dataArticle: ArticleProps[] = [
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 1",
    thumbnail: "assets/images/main/random_image.jpeg",
    source: [
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
    ],
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 2",
    thumbnail: "assets/images/main/random_image.jpeg",
    source: [
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
    ],
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 3",
    thumbnail: "assets/images/main/random_image.jpeg",
    source: [
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
    ],
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 4",
    thumbnail: "assets/images/main/random_image.jpeg",
    source: [
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
    ],
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 5",
    thumbnail: "assets/images/main/random_image.jpeg",
    source: [
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
    ],
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 5",
    thumbnail: "assets/images/main/random_image.jpeg",
    source: [
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
    ],
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 5",
    thumbnail: "assets/images/main/random_image.jpeg",
    source: [
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
    ],
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 5",
    thumbnail: "assets/images/main/random_image.jpeg",
    source: [
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
    ],
  },
];

const latestFPLNews: ArticleProps[] = [
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 1",
    thumbnail: "assets/images/main/random_image.jpeg",
    source: [
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
    ],
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 2",
    thumbnail: "assets/images/main/random_image.jpeg",
    source: [
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
    ],
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 3",
    thumbnail: "assets/images/main/random_image.jpeg",
    source: [
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
      {
        name: "Lorem Ipsum is simply dummy text of the printing",
        link: "#",
      },
    ],
  },
];

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
                <ReadingArticle
                  data={article}
                  showSource={false}
                  showHorizontal={true}
                />
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
          {dataArticle.map((article, index) => (
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
