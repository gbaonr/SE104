import ArticleIcon from "@mui/icons-material/Article";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

export interface SourceArticle {
  name: string;
  link: string;
}

export interface ArticleProps {
  title: string;
  content: string;
  thumbnail: string;
  source: SourceArticle[];
  moreInfo?: string;
}

export interface ReadingArticleProps {
  data: ArticleProps;
  showSource?: boolean | true;
  showHorizontal?: boolean | false;
  showMoreInfo?: boolean | false;
  headLine?: boolean | false;
}

export function ReadingArticle(props: ReadingArticleProps) {
  return (
    <Paper sx={{ borderRadius: "5px", my: 1.5, boxShadow: "0" }}>
      <Grid container>
        <Grid item xs={props.showHorizontal ? 4 : 12}>
          <Box
            sx={{
              overflow: "hidden",
              width: "100%",
            }}
          >
            <Box
              sx={{
                cursor: "pointer",
                width: "100%",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "scale(1.25)",
                  borderRadius: "5px",
                },
              }}
            >
              <img
                src={props.data.thumbnail}
                alt="random"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={props.showHorizontal ? 8 : 12}>
          <Typography
            variant="h5"
            sx={{
              fontSize: (props.headLine && "1.8rem") || "1rem",
              color: "#37003c",
              py: 1,
              fontWeight: 700,
              px: (props.showHorizontal && 1) || 0,
              "&:hover": {
                color: "#8e24aa",
                textDecorationLine: "underline",
              },
            }}
          >
            <Link to="#">{props.data.title}</Link>
          </Typography>

          {props.showSource && (
            <Box>
              <Divider />

              {props.data.source.map((source, index) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: 0.5,
                    py: 0,
                  }}
                  key={index}
                >
                  <ArticleIcon />

                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.8rem",
                      color: "#37003c",
                      p: 1,
                      "&:hover": {
                        color: "#8e24aa",
                        textDecorationLine: "underline",
                      },
                    }}
                  >
                    <Link to={source.link}>{source.name}</Link>
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {props.showMoreInfo && (
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "1rem",
                  color: "#37003c",
                  py: 1,
                }}
              >
                {props.data.moreInfo}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export function VideoList(props: ArticleProps) {}
