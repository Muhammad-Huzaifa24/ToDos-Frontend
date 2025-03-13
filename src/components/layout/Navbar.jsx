import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const Navbar = ({ 
  userImage, 
  userName, 
  handleLogout, 
  handleImageUpload, 
  isPending, 
  onClick, 
  isDarkMode 
}) => {
  return (
    <nav className="bg-[#252525] text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        {/* Upload Picture */}
        <label title="Upload Picture" className="cursor-pointer flex items-center gap-2">
          {isPending ? (
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isPending} />
              {userImage ? (
                <img src={userImage} alt="User" className="rounded-full size-8 object-cover" />
              ) : (
                <FaUser className="border rounded-full size-8 p-1" />
              )}
            </>
          )}
        </label>
        {/* User Name */}
        <span className="text-gray-300">{userName ? `Hey, ${userName}!` : "Guest"}</span>
      </div>

        {/* Logout Button */}
        <div className="flex items-center ">
          <button onClick={handleLogout} title="Logout" className="cursor-pointer flex items-center gap-2 hover:bg-gray-700 p-2 rounded-full">
          <RiLogoutCircleRLine className='size-5' />
          <span className='text-gray-400 md:block hidden'>Logout</span>
        </button>
        <button onClick={onClick} className="md:hidden flex cursor-pointer items-center gap-2 hover:bg-gray-700 p-2 rounded-full">
          {isDarkMode
            ? <MdDarkMode className='size-5 ' />
            : <MdLightMode className='size-5 ' />
          }
        </button>
        </div>
    </nav>
  );
};

export default Navbar;
