import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AnimatedContainer, {
  AnimatedItem,
} from "@/components/common/animated-container";
import InputPassword from "@/components/common/input-password";
import { useChangePasswordAuth } from "@/hooks/query/useAuth";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import { Loader2, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const ChangePassword = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const changePasswordMutation = useChangePasswordAuth();

  const onSubmit = async (data: ChangePasswordFormData) => {
    if (!user?.email) {
      toast.error("No email found. Please login again.");
      navigate("/auth/login");
      return;
    }

    try {
      await changePasswordMutation.mutateAsync({
        email: user.email,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      toast.success("Password changed successfully!");
      reset();
      navigate("/");
    } catch (error: any) {
      console.error("Failed to change password:", error);
      toast.error(
        error?.response?.data?.message || "Failed to change password"
      );
    }
  };

  if (!user?.email) {
    return (
      <AnimatedContainer className="max-w-md w-full space-y-8 p-8 rounded-lg">
        <AnimatedItem>
          <h1 className="text-3xl font-bold text-center text-foreground">
            Change Password
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            No user found. Please login again.
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
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-center text-foreground">
            Change Password
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Enter your current password and choose a new one
          </p>
        </div>
      </AnimatedItem>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <AnimatedItem>
          <InputPassword
            label="Current Password"
            placeholder="Enter your current password"
            value={watch("oldPassword")}
            onChange={(value) => setValue("oldPassword", value)}
            required
            error={errors.oldPassword?.message}
          />
        </AnimatedItem>

        <AnimatedItem>
          <InputPassword
            label="New Password"
            placeholder="Enter your new password"
            value={watch("newPassword")}
            onChange={(value) => setValue("newPassword", value)}
            required
            error={errors.newPassword?.message}
          />
        </AnimatedItem>

        <AnimatedItem>
          <InputPassword
            label="Confirm New Password"
            placeholder="Confirm your new password"
            value={watch("confirmPassword")}
            onChange={(value) => setValue("confirmPassword", value)}
            required
            error={errors.confirmPassword?.message}
          />
        </AnimatedItem>

        <AnimatedItem>
          <Button
            type="submit"
            className="w-full py-3 rounded-md"
            disabled={changePasswordMutation.isPending}
          >
            {changePasswordMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Changing Password...
              </>
            ) : (
              "Change Password"
            )}
          </Button>
        </AnimatedItem>
      </form>

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

export default ChangePassword;
