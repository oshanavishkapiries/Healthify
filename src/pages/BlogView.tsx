import { useParams } from "react-router-dom";
import BlogViewPage from "@/components/BlogViewPage";
import type { BlogPostView } from "@/types/Blog";
import { sampleBlogPosts } from "@/dump/types";

const BlogView = () => {
  const { id } = useParams<{ id: string }>();

  const blogPost: BlogPostView = {
    id: Number(id) - 1,
    title: sampleBlogPosts[Number(id) - 1].title,
    description: sampleBlogPosts[Number(id) - 1].description,
    date: sampleBlogPosts[Number(id) - 1].date,
    image: sampleBlogPosts[Number(id) - 1].image,
    category: sampleBlogPosts[Number(id) - 1].category,
    content: `
      <p>The web development landscape is constantly evolving, and 2024 promises to bring exciting new trends and technologies that will reshape how we build and interact with web applications.</p>
      
      <h2>AI-Powered Development Tools</h2>
      <p>Artificial Intelligence is revolutionizing the way developers write code. From intelligent code completion to automated testing, AI tools are becoming indispensable in modern development workflows. These tools not only increase productivity but also help reduce bugs and improve code quality.</p>
      
      <h2>Server-Side Rendering Renaissance</h2>
      <p>With frameworks like Next.js, Nuxt.js, and SvelteKit leading the charge, server-side rendering is experiencing a renaissance. The benefits of improved SEO, faster initial page loads, and better user experience are driving more developers to adopt SSR solutions.</p>
      
      <h2>WebAssembly Goes Mainstream</h2>
      <p>WebAssembly (WASM) is finally reaching mainstream adoption, enabling developers to run high-performance applications in the browser. From gaming to complex data processing, WASM is opening up new possibilities for web applications.</p>
      
      <h2>The Rise of Edge Computing</h2>
      <p>Edge computing is transforming how we think about web application architecture. By processing data closer to users, edge computing reduces latency and improves performance, making it an essential consideration for modern web applications.</p>
      
      <h2>Micro-Frontends Architecture</h2>
      <p>As applications grow in complexity, micro-frontends are becoming a popular architectural pattern. This approach allows teams to develop, deploy, and maintain different parts of an application independently, improving scalability and team productivity.</p>
      
      <p>The future of web development is bright, with these trends promising to make development more efficient, applications more performant, and user experiences more engaging. As we move forward, staying updated with these trends will be crucial for any web developer looking to remain competitive in the field.</p>
    `,
  };

  return (
    <div className="min-h-screen">
      <BlogViewPage blogPost={blogPost} />
    </div>
  );
};

export default BlogView;
