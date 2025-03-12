import React from "react";
import { motion } from "framer-motion";

const EmailForm = ({ email, setEmail, onSubmit, isLoading }) => {
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
      <div className="rounded-sm border border-white py-3 px-3 flex items-center gap-4">
        <img src="/src/assets/user.svg" alt="" />
        <input
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="font-light montserrat focus:outline-none text-sm text-white w-full bg-transparent"
          required
        />
      </div>
      <button
        type="submit"
        className="cursor-pointer montserrat font-semibold text-[#2148C0] bg-white py-3 w-full rounded-sm mt-3 shadow-md flex justify-center items-center gap-2"
        disabled={isLoading} // Disable button when loading
      >
        {isLoading ? "RESETTING . . ." : "RESET PASSWORD"}
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

export default EmailForm;
