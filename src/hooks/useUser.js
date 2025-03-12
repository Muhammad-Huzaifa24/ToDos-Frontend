import { useMutation } from "@tanstack/react-query";
import {
    registerUser,
    verifyUser,
    resetPassword,
    sendOtp,
    verifyOtp,
    uploadProfilePicture
} from "../api/user.service"
import queryClient from "../main"

// create a user
export const useCreateUser = () => {
    return useMutation({
        mutationFn: registerUser
    });
};

// login a user
export const useVerifyUser = () => {
    return useMutation({
        mutationFn: verifyUser,
    });
};

// send otp
export const useSendOTP = () => {
    return useMutation({
        mutationFn: sendOtp
    });
};

// verify otp
export const useVerifyOTP = () => {
    return useMutation({
        mutationFn: verifyOtp
    });
};

// reset password
export const useResetPassword = () => {
    return useMutation({
        mutationFn: resetPassword
    });
};

export const useUploadProfilePicture = () => {
    return useMutation({
        mutationFn: uploadProfilePicture,
        onSuccess: (data) => {
            let user = JSON.parse(localStorage.getItem("user")) || {};
            user.profilePicture = data.profilePicture;
            localStorage.setItem("user", JSON.stringify(user));
            queryClient.invalidateQueries(["user"])
        },
        onError: (error) => {
            console.error("Image upload failed:", error);
        },
    })
}
