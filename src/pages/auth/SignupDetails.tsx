import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AnimatedContainer, {
  AnimatedItem,
} from "@/components/common/animated-container";
import InputDropdown from "@/components/common/input-dropdown";
import InputText from "@/components/common/input-text";
import InputDatePicker from "@/components/common/input-datepicker";
import {
  signupDetailsSchema,
  type SignupDetailsFormData,
} from "@/validations/signupDetailsSchema";
import { genderOptions } from "@/types/constant";
import { useUpdateUserProfileAuth } from "@/hooks/query/useUser";
import { Loader2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useUserStore } from "@/store/userStore";

const SignupDetails = () => {
  const updateProfile = useUpdateUserProfileAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useUserStore();

  const userId = searchParams.get("userId") || "";

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignupDetailsFormData>({
    resolver: zodResolver(signupDetailsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      birthDate: "",
      mobileNumber: "",
    },
  });

  const onSubmit = async (data: SignupDetailsFormData) => {
    try {

      await updateProfile.mutateAsync({
        userId: userId || "",
        firstName: data.firstName,
        lastName: data.lastName,
        gender: parseInt(data.gender) || 0,
        dob: data.birthDate,
        phoneNumber: data.mobileNumber,
        countryCode: "LK",
        dialCode: "+94",
      });
      if (user) {
        navigate("/");
      } else {
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <AnimatedContainer className="max-w-md w-full space-y-8 p-8 rounded-lg">
      <AnimatedItem>
        <h1 className="text-3xl font-bold text-center text-foreground">
          Complete your profile
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Tell us a bit more about yourself
        </p>
      </AnimatedItem>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedItem>
            <InputText
              label="First Name"
              placeholder="Enter first name"
              value={watch("firstName")}
              onChange={(value) => setValue("firstName", value)}
              required
              error={errors.firstName?.message}
            />
          </AnimatedItem>

          <AnimatedItem>
            <InputText
              label="Last Name"
              placeholder="Enter last name"
              value={watch("lastName")}
              onChange={(value) => setValue("lastName", value)}
              required
              error={errors.lastName?.message}
            />
          </AnimatedItem>

          <AnimatedItem>
            <InputDropdown
              label="Gender"
              placeholder="Select gender"
              value={watch("gender")}
              onChange={(value) => setValue("gender", value)}
              options={genderOptions}
              error={errors.gender?.message}
            />
          </AnimatedItem>

          <AnimatedItem>
            <InputDatePicker
              label="Birth Date"
              value={watch("birthDate")}
              onChange={(value) => setValue("birthDate", value)}
              required
              error={errors.birthDate?.message}
            />
          </AnimatedItem>
        </div>

        <AnimatedItem>
          <InputText
            label="Mobile Number"
            type="tel"
            placeholder="Enter mobile number"
            value={watch("mobileNumber")}
            onChange={(value) => setValue("mobileNumber", value)}
            required
            error={errors.mobileNumber?.message}
          />
        </AnimatedItem>

        <AnimatedItem>
          <Button
            type="submit"
            className="w-full py-3 rounded-md"
            disabled={updateProfile.isPending}
          >
            {updateProfile.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </AnimatedItem>
      </form>
    </AnimatedContainer>
  );
};

export default SignupDetails;
