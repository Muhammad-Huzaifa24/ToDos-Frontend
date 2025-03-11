import { toast } from "react-toastify";

// Success Toast
export const showSuccessToast = (message) => {
    toast.success(message, {
        style: { backgroundColor: "#006400", color: "white" },
        progressClassName: "toast-progress-add",
    });
};

// Error Toast
export const showErrorToast = (message) => {
    toast.error(message, {
        style: { background: "#8B0000", color: "white" },
        progressClassName: "toast-progress-delete",
    });
};
