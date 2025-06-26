import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .min(1, "Blog title is required")
    .min(10, "Blog title must be at least 10 characters")
    .max(100, "Blog title must be less than 100 characters"),
  content: z
    .string()
    .min(1, "Blog content is required")
    .min(50, "Blog content must be at least 50 characters"),
  description: z
    .string()
    .min(1, "Blog description is required")
    .min(20, "Blog description must be at least 20 characters")
    .max(200, "Blog description must be less than 200 characters"),
  categoryId: z.string().min(1, "Please select a category"),
  bmi: z.string().min(1, "Please select BMI status"),
  image: z.string().min(1, "Blog image is required"),
});

export type BlogFormData = z.infer<typeof blogSchema>;
