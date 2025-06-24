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

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const isEditMode = !!id;

  const { categories } = useGetBlogCategories();
  const { data: existingBlog } = useGetBlogById(id || "");
  const createBlogMutation = useCreateBlog();
  const updateBlogMutation = useUpdateBlog();

  // BMI status options
  const bmiOptions = [
    { label: "Underweight", value: "0" },
    { label: "Normal", value: "1" },
    { label: "Overweight", value: "2" },
    { label: "Obese", value: "3" },
  ];

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
      blogCategoryId: "",
      bmi: "",
      imageUrl: "",
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
        blogCategoryId: blog.blogCategoryId || "",
        bmi: blog.bmi?.toString() || "",
        imageUrl: blog.image || "",
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
      imageUrl: data.imageUrl,
      imagePath: data.imageUrl, 
      userId: user._id,
      blogCategoryId: data.blogCategoryId,
      bmi: parseInt(data.bmi),
      tags: [], 
    };

    try {
      if (isEditMode && id) {
        await updateBlogMutation.mutateAsync({
          blogId: id,
          blogData,
        });
        navigate(`/blog/${id}`);
      } else {
        await createBlogMutation.mutateAsync(blogData);
        navigate("/blog");
      }
    } catch (error) {
      console.error("Blog submission error:", error);
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setValue("imageUrl", imageUrl);
  };

  const handleContentChange = (content: string) => {
    setValue("content", content);
  };

  const handleCategoryChange = (categoryId: string) => {
    setValue("blogCategoryId", categoryId);
  };

  const handleBmiChange = (bmiValue: string) => {
    setValue("bmi", bmiValue);
  };

  const handleTitleChange = (title: string) => {
    setValue("title", title);
  };

  console.log("💢💢💢💢" , existingBlog?.data);
  console.log("⚡⚡⚡⚡" , watchedValues);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mb-8">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <InputImage
            onImageUpload={handleImageUpload}
            defaultImageUrl={watchedValues.imageUrl}
            error={errors.imageUrl?.message}
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm mt-1">
              {errors.imageUrl.message}
            </p>
          )}
        </div>

        <header className="space-y-4">
          {/* title input  */}
          <InputText
            label="Blog Title"
            placeholder="Enter your blog title..."
            value={watchedValues.title}
            onChange={handleTitleChange}
            error={errors.title?.message}
          />

          <div className="flex flex-wrap items-center gap-4">
            {/* blog category input */}
            <div className="flex-1 min-w-[200px]">
              <InputDropdown
                label="Category"
                placeholder="Select blog category..."
                options={categories}
                value={watchedValues.blogCategoryId}
                onChange={handleCategoryChange}
                error={errors.blogCategoryId?.message}
              />
            </div>

            {/* bmi status dropdown */}
            <div className="flex-1 min-w-[200px]">
              <InputDropdown
                label="BMI Status"
                placeholder="Select BMI status..."
                options={bmiOptions}
                value={watchedValues.bmi}
                onChange={handleBmiChange}
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
          onChange={handleContentChange}
          error={errors.content?.message}
        />

        {/* submit button */}
        <Button
          type="submit"
          className="w-full py-6"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Submitting..."
            : isEditMode
            ? "Update Blog"
            : "Create Blog"}
        </Button>
      </form>
    </div>
  );
};

export default BlogEditor;
