export interface User {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  gender: number;
  phoneNumber?: string;
  dob?: string;
  countryCode?: string;
  dialCode?: string;
  roleId: {
    _id: string;
    role: string;
  };
  isEmailVerified: boolean;
  isPhoneNumberVerified: boolean;
  isAccountVerified: boolean;
  isProfileCompleted: boolean;
  signUpVia: number;
  themeColor: number;
  isActive: boolean;
  created_at: string;
  updated_at: string;
  __v: number;
  lastLoginAt: string;
}
