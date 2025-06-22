export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterPatientData {
  email: string;
  password: string;
  signUpVia: number;
  token?: string;
}

export interface GoogleAuthData {
  token: string;
}

export interface ForgetPasswordData {
  email: string;
  otp: string;
  newPassword: string;
}

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface SendOtpData {
  email: string;
}

export interface ChangePasswordData {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface UpdateProfileData {
  userId: string;
  firstName: string;
  lastName: string;
  gender: number;
  dob: string;
  phoneNumber: string;
  countryCode: string;
  dialCode: string;
}

export interface GetAuthDataParams {
  userId: string;
}
