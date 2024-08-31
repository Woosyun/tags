export type PostCardT = {
  _id: string;
  title: string;
  author: string;
  lastModified: Date;
  tags: string[];
};


export type PostT = {
  _id?: string;
  title: string;
  author: string;
  content: string;
  lastModified: Date;
  tags: string[];
};

export type CommentT = {
  _id?: string;
  author: string;
  content: string;
  lastModified: Date;
  postId: string;
}

export type UserT = {
  name: string;
  email: string;
  posts: string[];
  comments: string[];
}