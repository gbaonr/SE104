import { Container, Divider, Grid } from "@mui/material";
import { Club } from "features/Admin/components/ClubManager/apis/types";
import { LoadPlayersClubPage } from "./LoadPlayers";
import { LoadResultsClubPage } from "./LoadResults";
import HeaderPage from "../Layouts/PageHeader";
import { ReadingArticle } from "../HomePage/ArticleList";
import { latestVideos, latestFPLNews, latestArticles } from "../../constants/Articles";

type ClubInfoProps = {
  club: Club;
};

export const ClubInfoPage = ({ club }: ClubInfoProps) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        p: "0 !important",
      }}
    >
      <HeaderPage headerName={club.club_name} logo={club.logo_high} />

      <Container>
        <Grid container spacing={1}>
          {latestArticles.slice(0, 4).map((article, index) => (
            <Grid item xs={3} key={index}>
              <ReadingArticle data={article} showSource={true} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider sx={{ my: 2 }} />

      <LoadResultsClubPage club={club} />

      <Divider sx={{ my: 2 }} />

      <Container>
        <LoadPlayersClubPage club={club} />
      </Container>
    </Container>
  );
};
