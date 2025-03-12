import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useVerifyUser} from "../../hooks/useUser"
import queryClient from "../../main.jsx"
import {useForm} from "react-hook-form"
import {showErrorToast, showSuccessToast} from "../../utils/toast-messages.js"

const Login = () => {
    const { mutate, isLoading } = useVerifyUser();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleResponse = (response, navigate) => { 
        console.log(response);
            
        if (response?.success) {
            showSuccessToast(response?.message);
            queryClient.invalidateQueries(["users"]);
            navigate("/to-dos", { replace: true });
            localStorage.setItem("token", response?.token)
        } else {
            showErrorToast("Unexpected response format.");
        }
    };

    const handleError = (error) => {        
        const errorMessage = error?.response?.data?.message || "Something went wrong!";
        showErrorToast(errorMessage);
    };

    const onSubmit = (data) => {
        mutate(data, {
            onSuccess: (response) => handleResponse(response, navigate),
            onError: handleError,
        });
    };
  return (
    <div 
        className='min-w-sm min-h-screen flex items-center justify-center bg-[#2148C0] relative' 
    >
        <img 
            src="/src/assets/login-bg.svg" 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover hidden md:block"
        />
        <div className='flex items-center flex-col z-20'>
            <img src="/src/assets/login-logo.svg" alt="" className='mb-[71.15px]'/>
            <form action="" className='w-[300px]' onSubmit={handleSubmit(onSubmit)}>
                {/* email field */}
                <div role='username' className='rounded-sm border border-white py-3.25 px-3 flex items-center gap-4.25'>
                    <img src="/src/assets/user.svg" alt="" />
                    <input 
                        type="text" 
                        placeholder='EMAIL' 
                        {...register("email", { required: "Email is required" })}
                        className='font-light montserrat focus:outline-none text-sm/5 text-white w-full'
                    />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                {/* password field */}
                <div role='password' className='mt-5 rounded-sm border border-white py-3.25 px-3 flex items-center gap-4.25'>
                    <img src="/src/assets/lock.svg" alt="" />
                    <input 
                        type="text" 
                        placeholder='PASSWORD'
                        {...register("password", { required: "Password is required" })} 
                        className='font-light montserrat focus:outline-none text-sm/5 text-white w-full'
                    />
                </div>
                <button          
                    type='submit' 
                    className='cursor-pointer montserrat font-semibold text-[#2148C0] bg-white py-3.25 w-full rounded-sm mt-10.75 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>    
                    {isLoading ? "Signing in..." : "LOGIN"}
                </button>
                <div 
                    title="reset password"
                    className='w-full mt-2.75 flex items-center justify-end'>
                    <Link className='font-medium text-base montserrat text-white text-right' to="/forgot-password">Forgot password?</Link>
                </div>
        </form>
        </div>
    </div>
  )
}

export default Login
