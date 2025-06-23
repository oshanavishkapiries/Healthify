import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AnimatedContainer, {
  AnimatedItem,
} from "@/components/common/animated-container";
import InputOTP from "@/components/common/input-otp";
import { useVerifyOtp, useSendOtp } from "@/hooks/query/useAuth";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import { Loader2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { otpSchema, type OtpFormData } from "@/validations/otpSchema";

const EmailVerify = () => {
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const hasInitialOtpSent = useRef(false);
  const { user } = useUserStore();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const verifyOtpMutation = useVerifyOtp();
  const sendOtpMutation = useSendOtp();

  const handleSendOtp = useCallback(async () => {
    if (!user?.email) {
      toast.error("No email found. Please login again.");
      navigate("/auth/login");
      return;
    }

    try {
      setIsSendingOtp(true);
      await sendOtpMutation.mutateAsync({ email: user.email });
      setIsSendingOtp(false);
    } catch (error: any) {
      console.error("Failed to send OTP:", error);
      toast.error(
        error?.response?.data?.message || "Failed to send verification code"
      );
    }
  }, [user?.email, navigate]);

  useEffect(() => {
    if (user?.email && !hasInitialOtpSent.current) {
      hasInitialOtpSent.current = true;
      handleSendOtp();
    }
  }, [user?.email]);

  const onSubmit = async (data: OtpFormData) => {
    if (!user?.email) {
      toast.error("No email found. Please login again.");
      navigate("/auth/login");
      return;
    }

    try {
      await verifyOtpMutation.mutateAsync({
        email: user.email,
        otp: data.otp,
      });
      navigate("/");
    } catch (error: any) {
      console.error("Failed to verify OTP:", error);
      toast.error(
        error?.response?.data?.message || "Invalid verification code"
      );
    }
  };

  if (!user?.email) {
    return (
      <AnimatedContainer className="max-w-md w-full space-y-8 p-8 rounded-lg">
        <AnimatedItem>
          <h1 className="text-3xl font-bold text-center text-foreground">
            Email Verification
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            No email found. Please login again.
          </p>
        </AnimatedItem>
        <AnimatedItem>
          <Button asChild className="w-full">
            <Link to="/auth/login">Go to Login</Link>
          </Button>
        </AnimatedItem>
      </AnimatedContainer>
    );
  }

  return (
    <AnimatedContainer className="max-w-md w-full space-y-8 p-8 rounded-lg">
      <AnimatedItem>
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-center text-foreground">
            Verify your email
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            We've sent a verification code to
          </p>
          <p className="text-center text-sm font-medium text-foreground">
            {user.email}
          </p>
        </div>
      </AnimatedItem>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <AnimatedItem>
          <div className="flex justify-center items-center gap-2 mb-4">
            <InputOTP
              label="Verification Code"
              value={watch("otp")}
              onChange={(value) => setValue("otp", value)}
              maxLength={6}
              error={errors.otp?.message}
            />
          </div>
        </AnimatedItem>

        <AnimatedItem>
          <Button
            type="submit"
            className="w-full py-3 rounded-md"
            disabled={verifyOtpMutation.isPending}
          >
            {verifyOtpMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </Button>
        </AnimatedItem>
      </form>

      <AnimatedItem>
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Didn't receive the email?
          </p>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleSendOtp}
            disabled={isSendingOtp}
          >
            {isSendingOtp ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Resend verification code"
            )}
          </Button>
        </div>
      </AnimatedItem>

      <AnimatedItem>
        <p className="text-center text-sm text-muted-foreground">
          <Link to="/" className="hover:underline text-primary">
            Back to Home
          </Link>
        </p>
      </AnimatedItem>
    </AnimatedContainer>
  );
};

export default EmailVerify;
