import { Box, Button, Container, Grid, Typography } from "@mui/material";
import TableMatches from "../../components/TableResults/Base";
import dataTouraments from "../../components/TableResults/data";
import Article from "./Article";
import { ArticleProps } from "./Article";

const dataArticle: ArticleProps[] = [
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 1",
    thumbnail: "https://source.unsplash.com/random/800x600",
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 2",
    thumbnail: "https://source.unsplash.com/random/800x600",
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 3",
    thumbnail: "https://source.unsplash.com/random/800x600",
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 4",
    thumbnail: "https://source.unsplash.com/random/800x600",
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 5",
    thumbnail: "https://source.unsplash.com/random/800x600",
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 5",
    thumbnail: "https://source.unsplash.com/random/800x600",
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 5",
    thumbnail: "https://source.unsplash.com/random/800x600",
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing",
    content: "Content 5",
    thumbnail: "https://source.unsplash.com/random/800x600",
  },
];

export default function RightSideBar() {
  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Grid container spacing={1}>
        {dataArticle.map((article, index) => (
          <Grid item xs={3} key={index}>
            <Article {...article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
