export interface BlogPost {
  _id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  categoryId: {
    _id: string;
    category: string;
  };
}

export interface BlogPostView {
  _id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  categoryId: {
    _id: string;
    category: string;
  };
  content: string;
}
