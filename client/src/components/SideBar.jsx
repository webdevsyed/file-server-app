import { useState, useEffect, useContext } from 'react';
import Avatar from './Avatar'
import { VscFolderOpened } from 'react-icons/Vsc';
import { VscTrash } from 'react-icons/Vsc';
import { VscAccount } from 'react-icons/Vsc';
import { VscSettingsGear } from 'react-icons/Vsc';

import UserContext from '../utils/UserContext';

const SideBar = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const {userData} = useContext(UserContext)

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 1280);
    };

    handleResize(); // set initial state
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`hidden sm:block sticky inset-y-0 left-0 top-0 h-screen pt-10 shadow-md transition-all duration-1000 ${isCollapsed ? 'w-24 px-1.5' : 'min-w-[350px] px-3'}`}>
      <div className={`h-full flex flex-col gap-3  ${isCollapsed ? 'items-center' : ""}`}>
        <img src='https://krayo-assets.s3.ap-south-1.amazonaws.com/krayo-logo-with-better-everyday-800x290.svg' className={` h-10 mr-auto ${isCollapsed ?"px-1":"px-5"}`} />
        <div className={` rounded-md  flex items-center ${isCollapsed ? 'justify-center text-center p-1.5 w-14 my-14' : 'p-5 bg-dark-teal-2 my-10'}`}>
          <Avatar />
          {!isCollapsed && <p className='mx-3 text-xl font-medium text-white'>{userData.name}</p>}
        </div>
        <nav >
          <div className={`bg-gray-200 rounded-md flex items-center cursor-pointer ${isCollapsed ? 'justify-center text-center py-2 px-1 w-12 my-4' : 'py-4 px-6 '}`}>
            <VscFolderOpened className={`h-7 w-7 text-dark-teal-2`} />
            {!isCollapsed && <p className='mx-5 text-lg font-medium'>Files</p>}
          </div>
          <div className={`hover:bg-gray-100  flex items-center cursor-pointer ${isCollapsed ? 'justify-center text-center py-1 px-1 w-12 my-4' : 'py-4 px-6 '}`}  onClick={()=>document.getElementsByTagName("dialog")[0].showModal()}>
            <VscTrash className='h-7 w-7 text-gray-300' />
            {!isCollapsed && <p className='mx-5 text-lg'>Recycle Bin</p>}
          </div>
          <div className={` hover:bg-gray-100 flex items-center cursor-pointer ${isCollapsed ? 'justify-center text-center py-1 px-1 w-12 my-4' : 'py-4 px-6 '}`}  onClick={()=>document.getElementsByTagName("dialog")[0].showModal()}>
            <VscAccount className='h-7 w-7 text-gray-300' />
            {!isCollapsed && <p className='mx-5 text-lg'>Account</p>}
          </div>
          <div className={` hover:bg-gray-100 flex items-center cursor-pointer ${isCollapsed ? 'justify-center text-center py-1 px-1 w-12 my-4' : 'py-4 px-6 '}`}  onClick={()=>document.getElementsByTagName("dialog")[0].showModal()}>
            <VscSettingsGear className='h-7 w-7 text-gray-300' />
            {!isCollapsed && <p className='mx-5 text-lg'>Settings</p>}
          </div>

        </nav>
        <div className='flex justify-center mt-auto mb-7'>
          <button 
          onClick={() => toggleSidebar()} 
          className={` focus:outline-none flex items-center justify-center mx-5 py-2  rounded-md border border-dark-teal-2 hover:text-white hover:bg-dark-teal-2  ${isCollapsed ? "w-12" : "w-full"} `}>
            {!isCollapsed && <span className='mx-5 font-medium'>Toggle Sidebar</span>}
            {isCollapsed ?
              <svg
                className=' h-5 w-fit '
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg> : <svg
                className=' h-5 w-fit '
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>}
          </button>
        </div>

        <dialog className='top-10 -left-1/2 text-dark-teal-2 font-semibold'>Coming Soon!</dialog>

      </div>
    </div>
  )
}

export default SideBar
