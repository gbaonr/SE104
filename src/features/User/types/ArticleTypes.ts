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
