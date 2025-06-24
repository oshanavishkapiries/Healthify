import { useCallback } from "react";
import { useGoogleAuth as useGoogleAuthMutation } from "@/hooks/query/useAuth";

export const useGoogleAuth = () => {
  const googleAuthMutation = useGoogleAuthMutation();

  const handleGoogleSuccess = useCallback(
    (credentialResponse: { credential?: string }) => {
      if (!credentialResponse.credential) {
        console.error("No credential received from Google");
        return;
      }

      googleAuthMutation.mutate({
        token: credentialResponse.credential,
      });
    },
    [googleAuthMutation]
  );

  const handleGoogleError = useCallback(() => {
    console.log("Login Failed");
  }, []);

  return {
    handleGoogleSuccess,
    handleGoogleError,
    isPending: googleAuthMutation.isPending,
  };
};
