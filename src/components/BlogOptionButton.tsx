import { EllipsisIcon, Bookmark, Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteBlog } from "@/hooks/query/useBlog";
import BlogDeleteWarningAlert from "./alerts/BlogDeleteWarningAlert";
import { useNavigate } from "react-router-dom";
import {
  useSetBookmark,
  useRemoveBookmark,
  useIsBookmarked,
} from "@/hooks/query/useBookmark";

interface BlogOptionButtonProps {
  blogId: string;
  className?: string;
}

export default function BlogOptionButton({
  blogId,
  className,
}: BlogOptionButtonProps) {
  const deleteBlogMutation = useDeleteBlog();
  const navigate = useNavigate();

  const setBookmarkMutation = useSetBookmark();
  const removeBookmarkMutation = useRemoveBookmark();
  const { isBookmarked, bookmarkInfo } = useIsBookmarked(blogId);
  const bookmarkId = bookmarkInfo?._id;

  const handleDelete = async () => {
    await deleteBlogMutation.mutateAsync(blogId);
    navigate("/blog");
  };

  const handleBookmark = async () => {
    if (isBookmarked) {
      await removeBookmarkMutation.mutateAsync(bookmarkId);
    } else {
      await setBookmarkMutation.mutateAsync(blogId);
    }
  };

  const handleEdit = async () => {
    navigate(`/blog/edit/${blogId}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="secondary"
          className={`rounded-full shadow-none ${className} ${
            isBookmarked
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : ""
          }`}
          aria-label="Open edit menu"
        >
          <EllipsisIcon size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={handleBookmark}
          disabled={
            setBookmarkMutation.isPending || removeBookmarkMutation.isPending
          }
        >
          <Bookmark
            size={16}
            className="mr-2"
            fill={isBookmarked ? "currentColor" : "none"}
          />
          Bookmark
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleEdit}>
          <Edit size={16} className="mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <BlogDeleteWarningAlert onConfirm={handleDelete}>
            <div className="hover:bg-destructive/10 hover:text-destructive relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0">
              <Trash2 size={16} className="mr-2" />
              Delete
            </div>
          </BlogDeleteWarningAlert>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
