import axiosInstance from "./axiosInstance";


// create a user
export const registerUser = async (data) => {
    const response = await axiosInstance.post("/user/signUp", data);
    return response.data;
};

// login user
export const verifyUser = async (data) => {
    const response = await axiosInstance.post("/user/login", data);
    return response.data;
}

export const sendOtp = async (data) => {
    const response = await axiosInstance.post("/user/forgot-password", data);
    console.log('response', response);
    return response.data;
};

export const verifyOtp = async (data) => {
    const response = await axiosInstance.post("/user/verify-otp", data);
    return response.data;
}

export const resetPassword = async (data) => {
    const response = await axiosInstance.post("/user/reset-password", data);
    return response.data;
}

export const uploadProfilePicture = async (formData) => {
    const response = await axiosInstance.put("/user/update-avatar", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data;
}


