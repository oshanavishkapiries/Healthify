import InputImage from "@/components/common/input-Image";
import InputText from "@/components/common/input-text";
import InputDropdown from "@/components/common/input-dropdown";
import ContentEditor from "@/components/editor/ContentEditor";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";

const BlogEditor = () => {
  // BMI status options
  const bmiOptions = [
    { label: "Underweight", value: "0" },
    { label: "Normal", value: "1" },
    { label: "Overweight", value: "2" },
    { label: "Obese", value: "3" },
  ];

  // Blog category options
  const categoryOptions = [
    { label: "Health & Wellness", value: "health" },
    { label: "Nutrition", value: "nutrition" },
    { label: "Fitness", value: "fitness" },
    { label: "Mental Health", value: "mental-health" },
    { label: "Medical", value: "medical" },
    { label: "Lifestyle", value: "lifestyle" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="space-y-8 mb-8">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <InputImage />
        </div>

        <header className="space-y-4">
          {/* title input  */}
          <InputText
            label="Blog Title"
            placeholder="Enter your blog title..."
          />

          <div className="flex flex-wrap items-center gap-4">
            {/* blog category input */}
            <div className="flex-1 min-w-[200px]">
              <InputDropdown
                label="Category"
                placeholder="Select blog category..."
                options={categoryOptions}
              />
            </div>

            {/* bmi status dropdown => Underweight < 18.5, Normal 18.5 - 24.9, Overweight 25 - 29.9, Obese ≥ 30 */}
            <div className="flex-1 min-w-[200px]">
              <InputDropdown
                label="BMI Status"
                placeholder="Select BMI status..."
                options={bmiOptions}
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
          />
        </div>

        {/* blog content editor */}
        <ContentEditor placeholder="Write your blog content here..." />

        {/* submit button */}
        <Button className="w-full mt-6 py-6">Submit</Button>
      </article>
    </div>
  );
};

export default BlogEditor;
