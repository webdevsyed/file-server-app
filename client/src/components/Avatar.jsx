import {useContext} from 'react'
import UserContext from '../utils/UserContext'

const Avatar = () => {

  const {userData} = useContext(UserContext)

  return (
    <img
      className='mx-3 h-11 w-11 rounded-full bg-light-teal' 
      src={userData.picLink} 
      alt="User Profile Picture"
    /> 
  )
}

export default Avatar
 