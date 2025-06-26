import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Timer } from "lucide-react";
import { OptimizedImage } from "@/components/common/optimized-image";
import type { BlogPostView } from "@/types/Blog";
import { formatDate } from "@/utils/formatDate";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { pastTime } from "@/utils/pastTime";
import BlogOptionButton from "./BlogOptionButton";
import { useAdmin } from "@/hooks/useAdmin";

export default function BlogViewPage({ blogPost }: { blogPost: BlogPostView }) {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <article className="space-y-8">
        {/* Blog Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <OptimizedImage
            src={blogPost.image}
            alt={blogPost.title}
            className="object-cover"
          />
          {/* Back button */}
          <Button
            variant="secondary"
            size="icon"
            className="rounded-lg shadow-none absolute top-2 left-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          {/* Blog Option Button */}
          {isAdmin && (
            <BlogOptionButton
              className="absolute top-2 right-2 rounded-md"
              blogId={blogPost._id}
            />
          )}
        </div>

        {/* Blog Header */}
        <header className="space-y-4">
          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl break-words whitespace-pre-line">
            {blogPost.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              {blogPost.categoryId.category}
            </Badge>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <time dateTime={blogPost.date}>{formatDate(blogPost.date)}</time>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Timer className="h-4 w-4" />
              <p>{pastTime(blogPost.date)}</p>
            </div>
          </div>
        </header>

        {/* Blog Description */}
        <div className="border-l-4 border-primary/20 pl-6">
          <p className="text-lg text-muted-foreground leading-relaxed break-words whitespace-pre-line">
            {blogPost.description}
          </p>
        </div>

        {/* Blog Content */}
        <div
          className="prose prose-gray max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-base prose-p:leading-7 prose-p:mb-6 break-words whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: blogPost.content.startsWith("<")
              ? blogPost.content
              : `<p>${blogPost.content}</p>`,
          }}
        />
      </article>
    </div>
  );
}
