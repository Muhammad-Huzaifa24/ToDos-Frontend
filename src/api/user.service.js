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


