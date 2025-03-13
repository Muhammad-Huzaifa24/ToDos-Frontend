import React, {useState, useEffect} from 'react'
import List from "../components/ToDos/List"
import {AddIcon} from "../components/svg/"
import AddItem from "../components/ToDos/Add-item";
import { useNavigate } from 'react-router-dom';
import {useUploadProfilePicture} from "../hooks/useUser"
import Navbar from '../components/layout/Navbar';
import {showErrorToast,showSuccessToast} from "../utils/toast-messages"


const ToDos = () => {

  const navigate = useNavigate()
  const {mutate: uploadImage, isPending} = useUploadProfilePicture()
  let [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userImage, setUserImage] = useState(null)
  let [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    document.body.style.backgroundColor = isDarkMode ? "#252525" : "white";
  }, [isDarkMode]);

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  
  const handleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      document.documentElement.setAttribute("data-theme", newTheme ? "dark" : "light");
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  useEffect (() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user) { 
      setUserName(user?.name)
      setUserImage(user?.profilePicture);
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login")
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file); 
    uploadImage(formData, {
      onSuccess: (data) => {
        setUserImage(data.profilePicture);
        showSuccessToast(data.message)
      },
      onError: (err) => {
        console.log('err', err?.response?.data?.message);
        const errorMessage = err?.response?.data?.message || 'Something Went wrong'
        showErrorToast(errorMessage);
      },
    });
  };

  return (
    <>
      <div className='h-screen w-screen min-w-[320px] darkBackground relative'>
        <Navbar 
          userImage={userImage} 
          userName={userName} 
          handleLogout={handleLogout} 
          handleImageUpload={handleImageUpload} 
          isPending={isPending} 
          onClick={handleTheme}
          isDarkMode ={isDarkMode}
        />
      <div className="max-w-[750px] m-auto relative">
        <List onClick={handleTheme} isDarkMode={isDarkMode}/>
        <div role='add-btn' title='Add ToDo' onClick={open} className='shadow-lg absolute right-2 bottom-12 h-[50px] w-[50px] bg-[#6C63FF] rounded-full flex items-center justify-center hover:bg-[#534CC2] hover:cursor-pointer hover:border-2 hover:border-[#6C63FF] hover:shadow-[0_0_4px_0_#6C63FF]'>
            <AddIcon/>
        </div>
      </div>
      {isOpen && <AddItem close={close} isOpen={isOpen} data={null} type='add'/>}
    </div>
    </>
  )
}

export default ToDos
