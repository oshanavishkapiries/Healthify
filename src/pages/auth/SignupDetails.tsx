import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AnimatedContainer, {
  AnimatedItem,
} from "@/components/common/animated-container";
import InputDropdown from "@/components/common/input-dropdown";
import InputText from "@/components/common/input-text";
import {
  signupDetailsSchema,
  type SignupDetailsFormData,
} from "@/validations/signupDetailsSchema";

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const SignupDetails = () => {
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
      age: "",
      mobileNumber: "",
    },
  });

  const onSubmit = (data: SignupDetailsFormData) => {
    // Handle signup details logic here
    console.log(data);
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
            <InputText
              label="Age"
              type="number"
              placeholder="Enter age"
              value={watch("age")}
              onChange={(value) => setValue("age", value)}
              required
              error={errors.age?.message}
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
          <Button type="submit" className="w-full py-3 rounded-md">
            Continue
          </Button>
        </AnimatedItem>
      </form>
    </AnimatedContainer>
  );
};

export default SignupDetails;
