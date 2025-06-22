import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BlogCreate = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.roleId?.role !== "ADMIN") {
      navigate("/");
    }
  }, [user]);

  return <div>BlogCreate</div>;
};

export default BlogCreate;
