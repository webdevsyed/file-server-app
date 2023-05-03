import React from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import FilesSection from '../components/FilesSection'

const Dashboard = () => {
  return (
    <div className='relative flex divide-x divide-dashed divide-gray-200 '>
      <SideBar />
      <div>
        <NavBar />
        <FilesSection/>
      </div>
    </div>
  )
}

export default Dashboard
