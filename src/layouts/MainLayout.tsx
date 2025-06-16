import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <nav className="container mx-auto">
          <h1 className="text-2xl font-bold">Health Web</h1>
        </nav>
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-100 p-4 mt-8">
        <div className="container mx-auto text-center text-gray-600">
          © 2024 Health Web. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
