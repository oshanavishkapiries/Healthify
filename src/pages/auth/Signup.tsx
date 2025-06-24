import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AnimatedContainer, {
  AnimatedItem,
} from "@/components/common/animated-container";
import EmailInput from "@/components/common/input-email";
import PasswordInput from "@/components/common/input-password";
import { signupSchema, type SignupFormData } from "@/validations/signupSchema";
import { useRegisterPatient } from "@/hooks/query/useAuth";
import { Loader2 } from "lucide-react";
import GoogleAuth from "@/components/auth/GoogleAuth";

const Signup = () => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerPatientMutation = useRegisterPatient();

  const onSubmit = (data: SignupFormData) => {
    registerPatientMutation.mutate({
      email: data.email,
      password: data.password,
      signUpVia: 1,
    });
  };

  return (
    <AnimatedContainer className="max-w-md w-full space-y-8 p-8 rounded-lg">
      <AnimatedItem>
        <h1 className="text-3xl font-bold text-center text-foreground">
          Create your account
        </h1>
      </AnimatedItem>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <AnimatedItem>
          <div className="space-y-2">
            <EmailInput
              label="Email Address"
              value={watch("email")}
              onChange={(value) => setValue("email", value)}
              required
              error={errors.email?.message}
            />
          </div>
        </AnimatedItem>

        <AnimatedItem>
          <div className="space-y-2">
            <PasswordInput
              label="Password"
              value={watch("password")}
              onChange={(value) => setValue("password", value)}
              required
              error={errors.password?.message}
            />
          </div>
        </AnimatedItem>

        <AnimatedItem>
          <div className="space-y-2">
            <PasswordInput
              label="Confirm Password"
              value={watch("confirmPassword")}
              onChange={(value) => setValue("confirmPassword", value)}
              required
              error={errors.confirmPassword?.message}
            />
          </div>
        </AnimatedItem>

        <AnimatedItem>
          <Button
            type="submit"
            className="w-full py-3 rounded-md"
            disabled={registerPatientMutation.isPending}
          >
            {registerPatientMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing up...
              </>
            ) : (
              "Sign Up with Email"
            )}
          </Button>
        </AnimatedItem>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <AnimatedItem>
          <div className="flex justify-center">
            <GoogleAuth />
          </div>
        </AnimatedItem>
      </form>

      <AnimatedItem>
        <p className="text-center text-foreground">
          Already have an account?{" "}
          <Link to="/auth/login" className="hover:underline text-primary">
            Sign in
          </Link>
        </p>
      </AnimatedItem>
    </AnimatedContainer>
  );
};

export default Signup;
