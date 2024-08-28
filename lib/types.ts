export type PostCardT = {
  objectId: string;
  title: string;
  description: string;
  lastModified: Date;
  user: string;
};
export type PostT = PostCardT & {
  tags: string[];
  content: string;
};