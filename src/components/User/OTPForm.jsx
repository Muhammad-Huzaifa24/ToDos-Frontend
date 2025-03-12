import React from "react";
import OTPInput from "react-otp-input";
import { motion } from "framer-motion";

const OTPForm = ({ otp, setOtp, onSubmit, isLoading }) => {
  return (
    <motion.form
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.5 }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="w-full"
    >
      {/* <div className="rounded-sm border border-white py-3 px-3 flex items-center gap-4">
        <input
          type="text"
          placeholder="ENTER OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="font-light montserrat focus:outline-none text-sm text-white w-full bg-transparent text-center"
          required
        />
      </div> */}
       {/* OTP Input */}
       <OTPInput
        value={otp}
        onChange={setOtp}
        numInputs={6} // Number of OTP digits
        renderSeparator={<span className="mx-1 text-white">-</span>}
        renderInput={(props) => <input {...props} className="bg-transparent border border-white text-white h-10 text-center text-xl focus:outline-none rounded-sm" />}
        containerStyle="flex gap-1 justify-center my-1 w-full"
        inputStyle={{
          width: "100%",
          color: "white",
          borderRadius: "8px",
        }}
      />
      <button
        type="submit"
        className="cursor-pointer montserrat font-semibold text-[#2148C0] bg-white py-3 w-full rounded-sm mt-4 shadow-md flex justify-center items-center gap-2"
        disabled={isLoading}
      >
        {isLoading ? "VERIFYING . . ." : "VERIFY OTP"}
        {isLoading && (
          <svg className="animate-spin h-5 w-5 text-[#2148C0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
          </svg>
        )}
      </button>
    </motion.form>
  );
};

export default OTPForm;
