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
