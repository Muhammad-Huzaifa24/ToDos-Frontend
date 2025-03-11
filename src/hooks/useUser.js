import { useMutation } from "@tanstack/react-query";
import { registerUser, verifyUser } from "../api/user.service"
import queryClient from "../main.jsx"
import { showErrorToast, showSuccessToast } from "../utils/toast-messages.js"

// create a user
export const useCreateUser = () => {
    return useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            showSuccessToast("Registered Successfully! 🎉")
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || "Something went wrong!";
            showErrorToast(errorMessage)
        }
    });
};

// login a user
export const useVerifyUser = () => {
    return useMutation({
        mutationFn: verifyUser,
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
        },
    });
};
