const Home = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Welcome to Health Web</h1>
      <p className="text-gray-600">
        Your one-stop solution for managing your health and wellness.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Health Tracking</h2>
          <p className="text-gray-600">
            Monitor your vital signs and health metrics
          </p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Appointments</h2>
          <p className="text-gray-600">
            Schedule and manage your medical appointments
          </p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Medical Records</h2>
          <p className="text-gray-600">Access your complete medical history</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
