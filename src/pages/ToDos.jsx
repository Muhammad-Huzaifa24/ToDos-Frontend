import React, {useState, useEffect} from 'react'
import List from "../components/ToDos/List"
import {AddIcon} from "../components/svg/"
import AddItem from "../components/ToDos/Add-item";
import { FaUser } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import {useUploadProfilePicture} from "../hooks/useUser"


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
      },
    });
  };

  return (
    <>
      <div className='h-screen w-screen  darkBackground relative'>
        <div className='absolute top-5 left-20 flex items-center gap-2 px-3 py-2'>
           <label title="Upload picture" className="cursor-pointer flex items-center gap-2">
            {isPending ? (
              <div className=" ml-2 w-5 h-5 border-2 border-[#2148C0] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isPending} // Disable while uploading
                />
                {userImage ? (
                  <img
                    src={userImage}
                    alt="User"
                    className="border rounded-full size-8 object-cover"
                  />
                ) : (
                  <FaUser className="border rounded-full size-8 p-1" />
                )}
              </>
            )}
          </label>
          <span className='text-gray-400'>Hey there! {userName}</span>
        </div>
        <div 
          title='logout' 
          onClick={handleLogout}
          className='hover:cursor-pointer hover:bg-gray-700 rounded-full absolute top-5 right-20 flex items-center gap-2 px-3 py-2'
        >
          <RiLogoutCircleRLine className='size-5' />
          <span className='text-gray-400'>Logout</span>
        </div>
      <div className="max-w-[750px] m-auto relative h-screen">
        <List onClick={handleTheme} isDarkMode={isDarkMode}/>
        <div role='add-btn' onClick={open} className='shadow-lg absolute right-2 bottom-8 h-[50px] w-[50px] bg-[#6C63FF] rounded-full flex items-center justify-center hover:bg-[#534CC2] hover:cursor-pointer hover:border-2 hover:border-[#6C63FF] hover:shadow-[0_0_4px_0_#6C63FF]'>
            <AddIcon/>
        </div>
      </div>
      {isOpen && <AddItem close={close} isOpen={isOpen} data={null} type='add'/>}
    </div>
    </>
  )
}

export default ToDos
