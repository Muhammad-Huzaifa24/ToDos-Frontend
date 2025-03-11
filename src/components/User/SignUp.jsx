import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { MdAlternateEmail, MdPerson, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import FormLogo from "../../components/svg/form-logo"
import {useCreateUser} from "../../hooks/useUser"
import {showErrorToast, showSuccessToast} from "../../utils/toast-messages"
import queryClient from "../../main.jsx"


const SignUp = () => {
    const { mutate, isLoading } = useCreateUser();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleResponse = (response, navigate) => {     
        if (response?.success) {
            showSuccessToast(response?.message);
            queryClient.invalidateQueries(["users"]);
            navigate("/login");
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
        className='min-w-sm min-h-screen flex items-center justify-center bg-white relative' 
    >
        <img 
            src="/src/assets/login-bg.svg" 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover hidden md:block"
        />
        <div className='flex items-center flex-col z-20'>
            <FormLogo stroke='#2148C0' className='mb-[30px]'/>
            {/* <img src="/src/assets/login-logo.svg" alt="" className='mb-[71.15px]'/> */}
            <form action="" className='w-[300px]' onSubmit={handleSubmit(onSubmit)}>
                {/* user name field */}
                <div role='username' className='rounded-sm border border-[#2148C0] py-3.25 px-3 flex items-center gap-4.25'>
                    <MdPerson className='text-[#2148C0] size-5 font-light'/>
                    <input 
                        type="text" 
                        placeholder='USERNAME' 
                        className='font-medium montserrat focus:outline-none text-sm/5 text-[#2148C0] w-full'
                        {...register("username", { required: "Username is required" })}
                    />
                </div>
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}

                {/* email field */}
                <div role='email' className='mt-5 rounded-sm border border-[#2148C0]  py-3.25 px-3 flex items-center gap-4.25'>
                    <MdAlternateEmail className='text-[#2148C0] size-5 font-light'/>
                    <input 
                        type="email" 
                        placeholder='EMAIL' 
                        className='font-medium montserrat focus:outline-none text-sm/5 text-[#2148C0] w-full'
                        {...register("email", { 
                                required: "Email is required", 
                                pattern: { 
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address"
                                }
                        })}
                    />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

                {/* password field */}
                <div
                    role="password"
                    className="mt-5 rounded-sm border border-[#2148C0] py-3.25 px-3 flex items-center gap-4.25"
                    >
                    <MdLock className="text-[#2148C0] size-5 font-light" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="PASSWORD"
                        className="font-medium montserrat focus:outline-none text-sm/5 text-[#2148C0] w-full"
                        {...register("password", { 
                                required: "Password is required", 
                                minLength: { 
                                    value: 6, 
                                    message: "Password must be at least 6 characters" 
                                } 
                        })}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="focus:outline-none"
                    >
                        {showPassword ? (
                        <MdVisibilityOff className="text-[#2148C0] size-5 cursor-pointer" />
                        ) : (
                        <MdVisibility className="text-[#2148C0] size-5 cursor-pointer" />
                        )}
                    </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

                {/* submit button */}
                <button 
                    type='submit' 
                    className='cursor-pointer montserrat font-semibold text-white bg-[#2148C0] py-3.25 w-full rounded-sm mt-10.75 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
                >
                    {isLoading ? "Creating Account..." : "SIGNUP"}
                </button>
                
                {/* login redirect */}
                <div className='w-full mt-2.75 flex items-center justify-center'>
                    <Link 
                        className='font-medium text-base montserrat text-[#2148C0]' 
                        to="/login"
                    >
                        Don't have an account?
                    </Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp
