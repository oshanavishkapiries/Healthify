import { BookOpen } from "lucide-react";

const NoBlogFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <BookOpen className="w-8 h-8 mb-4 text-muted-foreground" />
      <h3 className="font-medium text-muted-foreground mb-2">No blogs found</h3>
      <p className="text-muted-foreground text-sm max-w-md">
        There are no blogs available at the moment. Check back later for new
        content.
      </p>
    </div>
  );
};

export default NoBlogFound;
