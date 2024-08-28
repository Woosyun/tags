export type PostCardT = {
  _id: string;
  title: string;
  author: string;
  lastModified: Date;
  tags: string[];
};

export type CommentT = {
  author: string;
  content: string;
  lastModified: Date;
}
export type PostT = {
  title: string;
  author: string;
  content: string;
  lastModified: Date;
  comments: CommentT[];
  tags: string[];
};