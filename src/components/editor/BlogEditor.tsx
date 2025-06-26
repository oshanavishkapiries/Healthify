import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import InputImage from "@/components/common/input-Image";
import InputText from "@/components/common/input-text";
import InputDropdown from "@/components/common/input-dropdown";
import ContentEditor from "@/components/editor/ContentEditor";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { blogSchema, type BlogFormData } from "@/validations/blogSchema";
import {
  useCreateBlog,
  useUpdateBlog,
  useGetBlogById,
} from "@/hooks/query/useBlog";
import { useGetBlogCategories } from "@/hooks/query/useMetaData";
import { useUserStore } from "@/store/userStore";
import { bmiOptions } from "@/types/constant";
import BlogViewSkeleton from "../skeleton/BlogViewSkeleton";
import { queryClient } from "@/lib/react-query/query-client";
import { Loader2 } from "lucide-react";

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const isEditMode = !!id;

  const { categories } = useGetBlogCategories();
  const { data: existingBlog, isLoading } = useGetBlogById(id || "");
  const createBlogMutation = useCreateBlog();
  const updateBlogMutation = useUpdateBlog();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      description: "",
      categoryId: "",
      bmi: "",
      image: "",
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    if (isEditMode && existingBlog?.data) {
      const blog = existingBlog.data;
      reset({
        title: blog.title || "",
        content: blog.content || "",
        description: blog.description || "",
        categoryId: blog.categoryId._id || "",
        bmi: blog.bmi?.toString() || "",
        image: blog.image || "",
      });
    }
  }, [isEditMode, existingBlog, reset]);

  const onSubmit = async (data: BlogFormData) => {
    if (!user?._id) {
      toast.error("User not authenticated");
      return;
    }

    const blogData = {
      title: data.title,
      content: data.content,
      description: data.description,
      image: data.image,
      userId: user._id,
      categoryId: data.categoryId,
      bmi: parseInt(data.bmi),
      tags: [],
    };

    try {
      if (isEditMode && id) {
        await updateBlogMutation.mutateAsync({
          blogId: id,
          blogData,
        });
        // refetch blog
        queryClient.invalidateQueries({ queryKey: ["blog", id] });
        navigate(`/blog/${id}`);
      } else {
        await createBlogMutation.mutateAsync(blogData);
        navigate("/blog");
      }
    } catch (error) {
      console.error("Blog submission error:", error);
    }
  };

  if (isLoading) return <BlogViewSkeleton />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mb-8">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <InputImage
            onImageUpload={(url) => setValue("image", url)}
            defaultImageUrl={watchedValues.image}
            error={errors.image?.message}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <header className="space-y-4">
          {/* title input  */}
          <InputText
            label="Blog Title"
            placeholder="Enter your blog title..."
            value={watchedValues.title}
            onChange={(val) => setValue("title", val)}
            error={errors.title?.message}
          />

          <div className="flex flex-wrap items-center gap-4">
            {/* blog category input */}
            <div className="flex-1 min-w-[200px]">
              <InputDropdown
                label="Category"
                placeholder="Select category..."
                options={categories}
                value={watchedValues.categoryId}
                onChange={(val: string) => setValue("categoryId", val)}
                error={errors.categoryId?.message}
              />
            </div>

            {/* bmi status dropdown */}
            <div className="flex-1 min-w-[200px]">
              <InputDropdown
                label="BMI Status"
                placeholder="Select BMI status..."
                options={bmiOptions}
                value={watchedValues.bmi}
                onChange={(val: string) => setValue("bmi", val)}
                error={errors.bmi?.message}
              />
            </div>
          </div>
        </header>

        {/* blog description input */}
        <div>
          <label
            htmlFor="blog-description"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Blog Description
          </label>
          <Textarea
            id="blog-description"
            placeholder="Write a brief description of your blog post..."
            rows={4}
            className="w-full border border-border rounded-md px-3 py-2 text-sm"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* blog content editor */}
        <ContentEditor
          placeholder="Write your blog content here..."
          value={watchedValues.content}
          onChange={(val) => setValue("content", val)}
          error={errors.content?.message}
        />

        {/* submit button */}
        <Button type="submit" className="w-full py-6" disabled={isSubmitting}>
          {isSubmitting
            ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </div>
            )
            : isEditMode
            ? "Update Blog"
            : "Create Blog"}
        </Button>
      </form>
    </div>
  );
};

export default BlogEditor;
