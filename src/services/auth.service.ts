import type {
  LoginData,
  RegisterPatientData,
  GoogleAuthData,
  ForgetPasswordData,
  VerifyOtpData,
  SendOtpData,
  ChangePasswordData,
  GetAuthDataParams,
} from "@/types/auth-api-type";
import axiosClient from "./axios.client";

export const getAuthDataByUser = async (params: GetAuthDataParams) => {
  const response = await axiosClient.get(`/api/auth/${params.userId}`);
  return response.data;
};

export const login = async (loginData: LoginData) => {
  const response = await axiosClient.post("/api/auth/login", loginData);
  return response.data;
};

export const registerPatient = async (registerData: RegisterPatientData) => {
  const response = await axiosClient.post(
    "/api/auth/register-patient",
    registerData
  );
  return response.data;
};

export const googleAuth = async (googleData: GoogleAuthData) => {
  const response = await axiosClient.post("/api/auth/google", googleData);
  return response.data;
};

export const forgetPassword = async (forgetData: ForgetPasswordData) => {
  const response = await axiosClient.post(
    "/api/auth/forget-password",
    forgetData
  );
  return response.data;
};

export const verifyOtp = async (verifyData: VerifyOtpData) => {
  const response = await axiosClient.post("/api/auth/verify-otp", verifyData);
  return response.data;
};

export const sendOtp = async (sendOtpData: SendOtpData) => {
  const response = await axiosClient.post("/api/auth/send-otp", sendOtpData);
  return response.data;
};

export const changePassword = async (passwordData: ChangePasswordData) => {
  const response = await axiosClient.post(
    "/api/auth/change-password",
    passwordData
  );
  return response.data;
};