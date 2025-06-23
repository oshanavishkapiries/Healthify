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

interface BlogOptionButtonProps {
  blogId: string;
}

export default function BlogOptionButton({ blogId }: BlogOptionButtonProps) {
  const deleteBlogMutation = useDeleteBlog();

  const handleDelete = async () => {
    await deleteBlogMutation.mutateAsync(blogId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="secondary"
          className="rounded-full shadow-none"
          aria-label="Open edit menu"
        >
          <EllipsisIcon size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Bookmark size={16} className="mr-2" />
          Bookmark
        </DropdownMenuItem>

        <DropdownMenuItem>
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
