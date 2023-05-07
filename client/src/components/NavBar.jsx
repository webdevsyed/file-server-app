import axios from 'axios'
import { useContext } from 'react'
// import { TfiSearch } from 'react-icons/tfi';
import Avatar from './Avatar';
import UserContext from '../utils/UserContext';

const NavBar = () => {

  const { setUserData } = useContext(UserContext)

  const handleLogout = (e) => {
    e.preventDefault();
    setUserData()
    localStorage.setItem("token","")
    console.log("Logged Out!")


    // const logout = async () => {
    // const response = await axios.post("http://localhost:8080/auth/logout",{}, { withCredentials: true })

    //   if (response.status == 200) {
    //     setUserData()
    //     console.log("Logged Out!")
    //   }
    // }
    // logout()
  }

  return (
    <div className='px-10 sticky top-0 z-10 h-28 bg-gray-light bg-opacity-75 backdrop-filter backdrop-blur-sm pt-10 '>
      <div className='flex justify-end items-center self-center'>
        {/* <TfiSearch style="" className='text-dark-teal-2 w-6 h-6 mr-4' />
        <input
          className='flex-grow px-5 py-3 bg-gray-light bg-opacity-10 focus:outline-none rounded-md focus:border focus:border-gray-300   '
          placeholder='Search...'
          type='text'
        /> */}
        <button
          className='mx-5 py-1.5 px-4 rounded-md border-2 border-dark-teal-2 hover:text-white hover:bg-dark-teal-2 '
          onClick={(e) => handleLogout(e)}
        >
          Logout
        </button>

        <Avatar />

      </div>
    </div>
  )
}

export default NavBar
