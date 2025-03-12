import { useMutation } from "@tanstack/react-query";
import {
    registerUser,
    verifyUser,
    resetPassword,
    sendOtp,
    verifyOtp
} from "../api/user.service"

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
