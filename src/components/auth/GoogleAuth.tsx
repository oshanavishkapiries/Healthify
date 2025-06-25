import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

const GoogleAuthButton = () => {
  const { handleGoogleSuccess, handleGoogleError } = useGoogleAuth();

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"
        width="100%"
        locale="en"
      />
    </div>
  );
};

const GoogleAuth = () => {
  const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID as string;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleAuthButton />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
