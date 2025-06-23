import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface ContentEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  value = "",
  onChange,
  placeholder = "Write your blog content here...",
  className,
}) => {
  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  // Quill editor formats
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "color",
    "background",
    "align",
    "link",
  ];

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-foreground mb-2">
        Blog Content
      </label>
      <div className="">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="min-h-[400px] content-editor"
          style={{
            height: "400px",
          }}
        />
      </div>
    </div>
  );
};

export default ContentEditor;
