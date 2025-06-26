import { useId, useEffect } from "react";
import { User as UserIcon, LogOut, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import InputDropdown from "@/components/common/input-dropdown";
import InputDatePicker from "@/components/common/input-datepicker";
import AvatarComponent from "@/components/common/Avatar";
import type { User } from "@/types/user";
import { useLogout } from "@/hooks/query/useAuth";
import { useUpdateUserProfileAuth } from "@/hooks/query/useUser";
import {
  profileSchema,
  type ProfileFormData,
} from "@/validations/profileSchema";
import { genderOptions } from "@/types/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import CompleteAccountBanner from "../CompleteAccountBanner";
import { Link } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";

export default function ProfileComponent({ user }: { user: User }) {
  const id = useId();
  const logout = useLogout();
  const updateProfile = useUpdateUserProfileAuth();
  const { isAdmin } = useAdmin();

  const formatUserDataForForm = (user: User): ProfileFormData => {
    return {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      gender: user.gender?.toString() || "",
      birthDate: user.dob ? new Date(user.dob).toISOString().split("T")[0] : "",
      mobileNumber: user.phoneNumber || "",
    };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: formatUserDataForForm(user),
  });

  // Reset form when user data changes
  useEffect(() => {
    reset(formatUserDataForForm(user));
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile.mutateAsync({
        userId: user._id,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: parseInt(data.gender) || 0,
        dob: data.birthDate,
        phoneNumber: data.mobileNumber,
        countryCode: user.countryCode || "LK",
        dialCode: user.dialCode || "+94",
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="aspect-square p-0 m-0 rounded-full">
          <AvatarComponent name={user.email} image={undefined} />
        </Button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="flex flex-col gap-0 overflow-hidden p-0 sm:max-w-lg max-h-[90vh] w-[95vw] max-w-md"
      >
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-4 sm:px-6 py-3 sm:py-4 text-base">
            Profile
            {isAdmin && (
              <Badge
                variant="secondary"
                className="text-xs ml-2 bg-amber-300 text-black"
              >
                ADMIN
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Make changes to your profile here. You can change your photo and set a
          username.
        </DialogDescription>
        <ScrollArea className="flex max-h-full flex-col overflow-hidden">
          <ProfileBg />
          <Avatar />
          <div className="px-4 sm:px-6 pt-4 pb-6">
            {!user?.isProfileCompleted ? (
              <CompleteAccountBanner />
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${id}-first-name`}>First name</Label>
                    <Input
                      id={`${id}-first-name`}
                      placeholder="Enter first name"
                      {...register("firstName")}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${id}-last-name`}>Last name</Label>
                    <Input
                      id={`${id}-last-name`}
                      placeholder="Enter last name"
                      {...register("lastName")}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <InputDropdown
                    label="Gender"
                    placeholder="Select gender"
                    value={watch("gender")}
                    onChange={(value: string) => setValue("gender", value)}
                    options={genderOptions}
                    error={errors.gender?.message}
                  />
                </div>
                <div className="space-y-2">
                  <InputDatePicker
                    label="Birth Date"
                    value={watch("birthDate")}
                    onChange={(value) => setValue("birthDate", value)}
                    required
                    error={errors.birthDate?.message}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${id}-mobile-number`}>Mobile Number</Label>
                  <Input
                    id={`${id}-mobile-number`}
                    placeholder="Enter mobile number"
                    {...register("mobileNumber")}
                    className={errors.mobileNumber ? "border-red-500" : ""}
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-xs">
                      {errors.mobileNumber.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${id}-email`}>Email</Label>
                  <Input
                    id={`${id}-email`}
                    value={user.email}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed
                  </p>
                </div>
                <Link to="/auth/change-password">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center justify-center gap-2 w-full"
                  >
                    <Lock size={16} />
                    Change Password
                  </Button>
                </Link>
              </form>
            )}
          </div>
        </ScrollArea>
        <DialogFooter className="border-t px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <LogOut size={16} />
            Logout
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="flex-1 sm:flex-none"
            disabled={updateProfile.isPending}
          >
            {updateProfile.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ProfileBg() {
  return (
    <div className="h-24 sm:h-32">
      <div className="bg-muted relative flex size-full items-center justify-center overflow-hidden">
        <img
          className="size-full object-cover"
          src="https://freerangestock.com/sample/124868/reading-book-in-park-.jpg"
          alt="Profile background"
          width={512}
          height={96}
        />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="-mt-8 sm:-mt-10 px-4 sm:px-6">
      <div className="border-background bg-muted relative flex size-16 sm:size-20 items-center justify-center overflow-hidden rounded-full border-4 shadow-xs shadow-black/10">
        <UserIcon size={24} className="text-muted-foreground sm:w-8 sm:h-8" />
      </div>
    </div>
  );
}
