import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";

import Files from './Files'
import UserContext from '../utils/UserContext'

const FilesSection = () => {

  const [selectedFile, setSelectedFile] = useState()
  const [files, setFiles] = useState([])
  const [filesNum, setFilesNum] = useState("")
  const [filesSize, setFilesSize] = useState("")

  const { userData } = useContext(UserContext)

  useEffect(() => {
    getFiles()

  }, [])

  const getFiles = async () => {
    const response = await axios.get("http://localhost:8080/file/list", {
      withCredentials: true
    });
    // console.log("get files response")
    // console.log(response)
    setFiles(response.data.filesData);
    setFilesNum(response.data.totalFiles)
    setFilesSize(response.data.totalSize)
  }

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = async (event) => {
    event.preventDefault();
    // console.log("handle Upload")
    try {
      const data = new FormData()
      data.append('file', selectedFile)
      data.append('filename', "test")

      if (selectedFile) {
        const response = await toast.promise(axios.post("http://localhost:8080/file/upload", data, {
          withCredentials: true,
          "Content-Type": "multipart/form-data"
        }), {
          loading: "Uploading file...",
          error: "Error! File Could not be Uploaded.",
          success: "File Uploaded Successfully."
        });
        getFiles()
        // console.log(response);
      }
      else { throw error }
    } catch (error) {
      console.log("Please select file")
    }
    document.getElementById('file-input').value = ""
  }

  return (
    <div className='p-5 lg:px-20 lg:py-10'>
      <Toaster />
      <h1 className='text-3xl font-semibol mb-10'>
        Hi <span className='font-semibold text-dark-teal-2'>{userData.name?.split(" ")[0]}</span>! Welcome Back.
      </h1>

      <h1 className='hidden md:block text-2xl mb-3 font-semibold'>
        Summary
      </h1>
      <section className='hidden md:flex flex-col lg:flex-row mb-10 gap-4 xl:gap-10 items-stretch xl:items-center justify-center lg:justify-start '>
        <div className='lg:basis-96 bg-white border border-gray-200 flex justify-between flex-shrink rounded-xl shadow-md hover:shadow-lg p-8' >
          <div className='self-center'>
            <h3 className='font-semibold text-gray-500 my-4'>NO. OF FILES</h3>
            <p className='font-bold text-5xl my-4'>{filesNum ? filesNum : "0"}</p>
          </div>
          <div className='w-20'>

            <svg className='w-fit f-fit fill-green-600' viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 27.9999 47.9219 C 16.9374 47.9219 8.1014 39.0625 8.1014 28 C 8.1014 16.9609 16.9140 8.0781 27.9765 8.0781 C 39.0155 8.0781 47.8983 16.9609 47.9219 28 C 47.9454 39.0625 39.0390 47.9219 27.9999 47.9219 Z M 21.9530 39.4375 C 22.8671 39.4375 23.4296 38.9922 23.6171 38.1016 L 24.6718 33.0859 L 29.0312 33.0859 L 28.0702 37.6797 C 27.8593 38.6406 28.5390 39.4375 29.4999 39.4375 C 30.4374 39.4375 31.0468 38.9922 31.2343 38.1016 L 32.2890 33.0625 L 34.7265 33.0625 C 35.6405 33.0625 36.2968 32.3828 36.2968 31.4688 C 36.2968 30.6719 35.7343 30.0859 34.9609 30.0859 L 32.9218 30.0859 L 33.9296 25.3516 L 36.3905 25.3516 C 37.3046 25.3516 37.9609 24.6719 37.9609 23.7578 C 37.9609 22.9609 37.3983 22.3750 36.6249 22.3750 L 34.5390 22.3750 L 35.4530 18.0156 C 35.6405 17.0547 34.9374 16.2344 33.9765 16.2344 C 33.0624 16.2344 32.4765 16.7031 32.2890 17.5703 L 31.2812 22.3750 L 26.9218 22.3750 L 27.8124 18.0156 C 28.0234 17.0781 27.3671 16.2344 26.3827 16.2344 C 25.4452 16.2344 24.8593 16.7031 24.6718 17.5703 L 23.6874 22.3750 L 21.2030 22.3750 C 20.3124 22.3750 19.6327 23.0781 19.6327 23.9688 C 19.6327 24.7656 20.1952 25.3516 20.9921 25.3516 L 23.0312 25.3516 L 22.0468 30.0859 L 19.5390 30.0859 C 18.6249 30.0859 17.9687 30.7890 17.9687 31.6797 C 17.9687 32.4766 18.5312 33.0625 19.3280 33.0625 L 21.4374 33.0625 L 20.4765 37.6797 C 20.2890 38.6406 20.9921 39.4375 21.9530 39.4375 Z M 25.0936 30.3672 L 26.1718 25.1172 L 30.9062 25.1172 L 29.8046 30.3672 Z" /></svg>
          </div>
        </div>
        <div className='lg:basis-96 bg-white border border-gray-200 flex justify-between flex-shrink rounded-xl shadow-md hover:shadow-lg p-8' >
          <div className='self-center'>
            <h3 className='font-semibold text-gray-500 my-4'>TOTAL FILE SIZE</h3>
            <p className='font-bold text-5xl my-4'>
              {filesSize > 0 ?
                filesSize < 1000 ? filesSize + ' KB' : parseFloat(filesSize / 1000).toFixed(2) + ' MB'
                : "0 KB"
              }
            </p>
          </div>
          <div className='w-20'>
            <svg className='w-fit h-fit stroke-red-500' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Arrow / Arrow_Circle_Down"> <path id="Vector" d="M9 13L12 16M12 16L15 13M12 16V8M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
          </div>
        </div>
      </section>

      <h1 className='text-2xl mb-3 font-semibold'>
        Upload Files
      </h1>
      <section className='bg-white border border-gray-200 p-5 rounded-xl flex flex-col md:flex-row items-center justify-center md:justify-between gap-5 lg:gap-10 shadow-md'>
        <h2>Upload your files here:</h2>
        <input
          className='text-center md:ml-0'
          type='file'
          id='file-input'
          onChange={(event) => handleChange(event)}
        />
        <button
          className='py-2 px-3 bg-dark-teal-2 text-white font-semibold rounded-md hover:shadow-lg'
          onClick={(event) => handleUpload(event)}
        >
          <svg className='inline w-7 mr-2 stroke-white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 16H6C4.89543 16 4 15.1046 4 14V7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V14C20 15.1046 19.1046 16 18 16H17M12 20V9M12 9L15 12M12 9L9 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g>
          </svg>
          <span>Upload File</span>
        </button>

      </section>
      <h1 className='text-2xl mt-10 mb-3 font-semibold'>
        Your Files
      </h1>
      <section className='bg-white border border-gray-200 p-5 rounded-xl shadow-md'>
        <Files files={files} getFiles={getFiles} />
      </section>

    </div>
  )
}

export default FilesSection
