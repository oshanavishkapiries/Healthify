const About = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Health Web</h1>
      <div className="space-y-4">
        <p className="text-gray-600">
          Health Web is a comprehensive healthcare management platform designed
          to make healthcare more accessible and manageable for everyone.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600">
            To empower individuals to take control of their health journey by
            providing easy access to healthcare services and information.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-600">
            To create a world where quality healthcare is accessible to
            everyone, everywhere, at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
