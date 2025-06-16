import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import EmailInput from "@/components/common/input-email";
import PasswordInput from "@/components/common/input-password";
import { loginSchema, type LoginFormData } from "@/validations/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AnimatedContainer, {
  AnimatedItem,
} from "@/components/common/animated-container";

const Login = () => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    // Handle login logic here
    console.log(data);
  };

  return (
    <AnimatedContainer className="max-w-md w-full space-y-8 p-8 rounded-lg">
      <AnimatedItem>
        <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={watch("remember")}
                onCheckedChange={(checked) =>
                  setValue("remember", checked as boolean)
                }
              />

              <label htmlFor="remember" className="text-sm">
                Remember me
              </label>
            </div>
            <Link
              to="/auth/forget-password"
              className="text-sm hover:underline"
            >
              Forgot Password!
            </Link>
          </div>
        </AnimatedItem>

        <AnimatedItem>
          <Button type="submit" className="w-full py-3 rounded-md">
            Login
          </Button>
        </AnimatedItem>

        <AnimatedItem>
          <Button
            type="button"
            variant="outline"
            className="w-full border py-3 rounded-md flex items-center justify-center gap-2"
          >
            <img src="/google-icon.svg" alt="Google" width={24} height={24} />
            Sign In with Google
          </Button>
        </AnimatedItem>
      </form>

      <AnimatedItem>
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link to="/auth/signup" className="hover:underline text-primary">
            Sign up
          </Link>
        </p>
      </AnimatedItem>
    </AnimatedContainer>
  );
};

export default Login;
