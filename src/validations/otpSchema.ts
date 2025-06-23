import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "Please enter a 6-digit OTP")
    .max(6, "Please enter a 6-digit OTP")
    .regex(/^\d{6}$/, "Please enter a valid 6-digit number"),
});

export type OtpFormData = z.infer<typeof otpSchema>;
