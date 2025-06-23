import { Button } from "@/components/ui/button";
import { LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";

const GotoSignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      <div className="p-8 max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <LockKeyhole className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="font-semibold mb-2">
          Access Restricted
        </h2>
        <p className="text-muted-foreground mb-6 test-sm">
          If you want to access this page, please log in.
        </p>
        <Button asChild className="w-full">
          <Link to="/auth/login">Go to Sign In</Link>
        </Button>
      </div>
    </div>
  );
};

export default GotoSignIn;
