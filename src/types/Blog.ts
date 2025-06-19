export interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
}

export interface BlogPostView {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
  content: string;
}