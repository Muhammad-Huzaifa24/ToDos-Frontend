const customStyles = {
    control: (provided) => ({
      ...provided,
    //   padding: "0.375rem 0.625rem", // px-2.5 py-1.5 equivalent
      borderRadius: "5px",
      border: "1px solid #6C63FF",
      backgroundColor: "#6C63FF",
      boxShadow: "0 0 4px 0 #6C63FF",
      display: "flex",
      alignItems: "center",
       "&:hover": {
        borderColor: "#6C63FF", 
        backgroundColor: "#6C63FF",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "white",
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: "0rem", // mt-8 equivalent
      backgroundColor: "white", // bg-white
      border: "1px solid #6C63FF", // border-[#6C63FF]
      borderRadius: "0.5rem", // rounded-lg
      boxShadow: "0 0 4px 0 #6C63FF", // shadow-lg equivalent
      maxHeight: "184px", // max-h-[84px]
      overflowY: "auto", // overflow-auto
      zIndex: 10, // Ensures dropdown is above other elements
      padding: "8.4px 0px"
    }),
    option: (provided, state) => ({
      ...provided,
      padding: "2px 6px", // px-1.5 py-1.5 equivalent
      backgroundColor: state.isSelected
        ? "#6C63FF" // Selected option background
        : state.isFocused
        ? "#6C63FF20" // Focused option background (light shade of blue)
        : "white", // Default option background
      color: state.isSelected ? "white" : "#6C63FF", // Text color based on selection
      fontWeight: state.isSelected ? "bold" : "normal", // Bold selected option
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "white", // Make placeholder text color white
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white", // Keep selected value text color white
    }), 
     input: (provided) => ({
      ...provided,
      color: "white", // Keep typing text color white
    }),
};
export {customStyles}