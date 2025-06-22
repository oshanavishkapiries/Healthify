import z from "zod";

export const profileSchema = z.object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters"),
    gender: z.string().min(1, "Please select a gender"),
    birthDate: z.string().min(1, "birthDate is required"),
    mobileNumber: z
      .string()
      .min(1, "Mobile number is required")
      .min(10, "Mobile number must be at least 10 digits")
      .max(10, "Mobile number must be less than 10 digits"),
  });

export type ProfileFormData = z.infer<typeof profileSchema>;