import { useAdmin } from "@/hooks/useAdmin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BlogCreate = () => {
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  return <div>BlogCreate</div>;
};

export default BlogCreate;
