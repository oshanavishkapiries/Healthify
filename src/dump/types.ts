import type { BlogPost } from "@/types/Blog";

export const sampleBlogPosts: BlogPost[] = [
  {
    _id: "1",
    title: "Understanding Mental Health",
    description:
      "A comprehensive guide to understanding mental health and its importance in our daily lives.",
    date: "2024/03/20",
    image: "https://picsum.photos/1600/900?random=1",
    categoryId: {
      _id: "1",
      category: "Mental Health",
    },
  },
  {
    _id: "2",
    title: "Healthy Eating Habits",
    description:
      "Learn about the essential nutrients and balanced diet for maintaining good health.",
    date: "2024/03/19",
    image: "https://picsum.photos/1600/900?random=2",
    categoryId: {
      _id: "2",
      category: "Health",
    },
  },
  {
    _id: "3",
    title: "Exercise and Wellness",
    description:
      "Discover the benefits of regular exercise and how it contributes to overall wellness.",
    date: "2024/03/18",
    image: "https://picsum.photos/1600/900?random=3",
    categoryId: {
      _id: "3",
      category: "Health",
    },
  },
  ...Array.from({ length: 47 }, (_, i) => {
    const id = i + 4;
    return {
      _id: id.toString(),
      title: `Health Blog Post ${id}`,
      description: `This is a sample description for blog post number ${id}, covering an important health topic in depth.`,
      date: `2024/03/${(20 - (id % 20)).toString().padStart(2, "0")}`,
      image: `https://picsum.photos/1600/900?random=${id}`,
      categoryId: {
        _id: id.toString(),
        category: "Health",
      },
    };
  }),
];
