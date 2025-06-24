export interface CreateBlogData {
  title: string;
  content: string;
  imageUrl: string;
  imagePath: string;
  userId: string;
  bmi: number;
  blogCategoryId: string;
  tags: string[];
}

export interface UpdateBlogData {
  title: string;
  content: string;
  imageUrl: string;
  imagePath: string;
  userId: string;
  blogCategoryId: string;
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
