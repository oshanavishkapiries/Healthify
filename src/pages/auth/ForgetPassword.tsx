import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import AnimatedContainer, {
  AnimatedItem,
} from "@/components/common/animated-container";
import EmailInput from "@/components/common/input-email";
import InputOTP from "@/components/common/input-otp";
import PasswordInput from "@/components/common/input-password";
import { useSendOtp, useForgetPassword } from "@/hooks/query/useAuth";
import { Loader2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const emailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

const resetSchema = z.object({
  email: z.string().min(1),
  otp: z
    .string()
    .min(6, "Please enter a 6-digit OTP")
    .max(6, "Please enter a 6-digit OTP")
    .regex(/^\d{6}$/, "Please enter a valid 6-digit number"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

type EmailFormData = z.infer<typeof emailSchema>;
type ResetFormData = z.infer<typeof resetSchema>;

const ForgetPassword = () => {
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Step 1: Email form
  const {
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
    setValue: setEmailValue,
    watch: watchEmail,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  // Step 2: OTP + new password form
  const {
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
    setValue: setResetValue,
    watch: watchReset,
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: { email, otp: "", newPassword: "" },
  });

  const sendOtpMutation = useSendOtp();
  const forgetPasswordMutation = useForgetPassword();

  const onSendOtp = (data: EmailFormData) => {
    sendOtpMutation.mutate(
      { email: data.email },
      {
        onSuccess: () => {
          setEmail(data.email);
          setResetValue("email", data.email);
          setStep("reset");
        },
      }
    );
  };

  const onReset = (data: ResetFormData) => {
    forgetPasswordMutation.mutate(
      {
        email: data.email,
        otp: data.otp,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          navigate("/auth/login");
        },
      }
    );
  };

  return (
    <AnimatedContainer className="max-w-md w-full space-y-8 p-8 rounded-lg">
      <AnimatedItem>
        <h1 className="text-3xl font-bold text-center text-foreground">
          Forgot Password
        </h1>
      </AnimatedItem>
      {step === "email" && (
        <form className="space-y-6" onSubmit={handleEmailSubmit(onSendOtp)}>
          <AnimatedItem>
            <EmailInput
              label="Email Address"
              value={watchEmail("email")}
              onChange={(value) => setEmailValue("email", value)}
              required
              error={emailErrors.email?.message}
            />
          </AnimatedItem>
          <AnimatedItem>
            <Button
              type="submit"
              className="w-full py-3 rounded-md"
              disabled={sendOtpMutation.isPending}
            >
              {sendOtpMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </AnimatedItem>
          <AnimatedItem>
            <p className="text-center text-foreground">
              Remember your password?{" "}
              <Link to="/auth/login" className="hover:underline text-primary">
                Sign in
              </Link>
            </p>
          </AnimatedItem>
        </form>
      )}
      {step === "reset" && (
        <form className="space-y-6" onSubmit={handleResetSubmit(onReset)}>
          <AnimatedItem>
            <EmailInput
              label="Email Address"
              value={watchReset("email")}
              onChange={(value) => setResetValue("email", value)}
              required
              error={resetErrors.email?.message}
              // Disabled to prevent changing email at this step
              // @ts-ignore
              disabled
            />
          </AnimatedItem>
          <AnimatedItem>
            <div className="flex justify-center justify-items-center">
              <InputOTP
                label="Verification Code"
                value={watchReset("otp")}
                onChange={(value) => setResetValue("otp", value)}
                maxLength={6}
                error={resetErrors.otp?.message}
              />
            </div>
          </AnimatedItem>
          <AnimatedItem>
            <PasswordInput
              label="New Password"
              value={watchReset("newPassword")}
              onChange={(value) => setResetValue("newPassword", value)}
              required
              error={resetErrors.newPassword?.message}
            />
          </AnimatedItem>
          <AnimatedItem>
            <Button
              type="submit"
              className="w-full py-3 rounded-md"
              disabled={forgetPasswordMutation.isPending}
            >
              {forgetPasswordMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </AnimatedItem>
          <AnimatedItem>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setStep("email")}
              disabled={forgetPasswordMutation.isPending}
            >
              Back
            </Button>
          </AnimatedItem>
        </form>
      )}
    </AnimatedContainer>
  );
};

export default ForgetPassword;
