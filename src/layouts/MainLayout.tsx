import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <h1>header</h1>
      <Outlet />
      <h1>footer</h1>
    </>
  );
};

export default MainLayout;
