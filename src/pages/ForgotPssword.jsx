import React, { useState } from "react";
import EmailForm from "../components/User/EmailForm";
import OTPForm from "../components/User/OTPForm";
import { IoArrowBack } from "react-icons/io5"; // Importing back arrow icon
import PasswordForm from "../components/User/PasswordForm";
import { useSendOTP, useVerifyOTP, useResetPassword } from "../hooks/useUser";
import {showErrorToast, showSuccessToast} from "../utils/toast-messages"
import { useNavigate } from "react-router-dom";
import FormLogo from "../components/svg/form-logo";

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

// Hooks for API calls
  const { mutate: sendOtpMutate, isPending: isSendingOTP } = useSendOTP();
  const { mutate: verifyOtpMutate, isPending: isVerifyingOTP } = useVerifyOTP();
  const { mutate: resetPasswordMutate, isPending: isResettingPassword } = useResetPassword();


  const handleError = (error) => {        
    const errorMessage = error?.response?.data?.message || "Something went wrong!";
    showErrorToast(errorMessage);
  };

  // Handle Email Submission
  const handleEmailSubmit = () => {
    sendOtpMutate ({email}, {
      onSuccess: (response) => {
        console.log(response);
         if (response?.success) {
            showSuccessToast(response.message);
            setStep(2);
          }
        else showErrorToast(response.message);
      },
      onError: handleError,
    });
  };

 // Handle OTP Submission
  const handleOtpSubmit = () => {
    verifyOtpMutate(
      { email, otp },
      {
        onSuccess: (response) => {
          if (response?.success) {
            showSuccessToast(response.message);
            setStep(3);
          } else {
            showErrorToast(response.message);
          }
        },
        onError: handleError,
      }
    );
  };

  // Handle Password Reset
  const handlePasswordSubmit = () => {
    resetPasswordMutate(
      { email, newPassword },
      {
        onSuccess: (response) => {
          console.log(response);
          
          if (response?.success) {
            showSuccessToast("Password changed successfully!");
            navigate("/to-dos")
          } else {
            showErrorToast(response.message);
          }
        },
        onError: handleError,
      }
    );
  };

   // Go to the previous step
  const goBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  return (
    <div className="w-full min-w-[320px] h-screen flex items-center justify-center bg-[#2148C0] relative overflow-hidden">
      {/* <img
        src="/src/assets/login-bg.svg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
      /> */}
      {/* Back Button (only visible if step > 1) */}
      {step > 1 && (
        <button 
          onClick={goBack} 
          className="absolute top-6 left-6 text-white text-2xl hover:opacity-80 transition"
        >
          <IoArrowBack className="text-white"/>
        </button>
      )}
      
      <div className="flex items-center flex-col z-20 w-[320px]">
        <FormLogo className='mb-[71.15px]'/>
        {/* <img src="/src/assets/login-logo.svg" alt="" className="mb-[50px]" /> */}

        {step === 1 && <EmailForm email={email} setEmail={setEmail} onSubmit={handleEmailSubmit} isLoading={isSendingOTP} />}
        {step === 2 && <OTPForm otp={otp} setOtp={setOtp} onSubmit={handleOtpSubmit} isLoading={isVerifyingOTP} />}
        {step === 3 && <PasswordForm newPassword={newPassword} setNewPassword={setNewPassword} onSubmit={handlePasswordSubmit} isLoading={isResettingPassword} />}
      </div>
    </div>
  );
};

export default ForgotPassword;
