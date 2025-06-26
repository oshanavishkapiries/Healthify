export interface CreateBlogData {
  title: string;
  content: string;
  image: string;
  userId: string;
  bmi: number;
  categoryId: string;
  tags: string[];
}

export interface UpdateBlogData {
  title: string;
  content: string;
  image: string;
  userId: string;
  categoryId: string;
  tags: string[];
}

export interface GetBlogsParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  tags?: string;
  search?: string;
  bmi?: string;
}
