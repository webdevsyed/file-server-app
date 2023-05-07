import axios from 'axios'
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { SlOptions } from 'react-icons/sl';
import { AiOutlineDownload } from 'react-icons/Ai';
// import { VscPreview } from 'react-icons/Vsc';
import { MdOutlineDelete } from 'react-icons/Md';
// import { canPreview } from '../utils/helper';


const Files = ({ files, getFiles }) => {
    const modal = document.getElementById("preview-modal")
    const [activeMenu, setActiveMenu] = useState(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!(event.target.id || event.target.id === 'menu-item')) {
                setActiveMenu(null);
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [activeMenu]);

    const handleMenuClick = (id) => {
        setActiveMenu(activeMenu === id ? null : id);
    };


    const handleDownload = async (event) => {
        event.preventDefault();
        try {
            let jwt = localStorage.getItem("token")
            const serverName = event.target.parentNode.id
            const response = await toast.promise(axios.get("http://localhost:8080/file/download", {
                headers: {Authorization: `Bearer ${jwt}`},
                responseType: 'blob',
                params: {
                    serverName: serverName
                }
            }), {
                loading: "Downloading file...",
                error: "Error! File Could not be Downloaded.",
                success: "File Downloaded Successfully."
            }, {
                success: {
                    duration: 5000,
                }
            })
            // console.log(response)
            const name = response.config.params.serverName.split('__')[1]
            const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error('Failed to download file', error)
        }
    };

    // const handlePreview = async (event) => {
    //     event.preventDefault();
    //     const serverName = event.target.parentNode.id
    //     console.log(serverName)
    //     modal.showModal()
    //     if (canPreview(serverName)) {
    //         const extension = serverName.split(".").pop()
    //         const response = await axios.get("http://localhost:8080/file/download", {
    //             withCredentials: true,
    //             responseType: 'blob',
    //             params: {
    //                 serverName: serverName
    //             }
    //         })
    //         const url = window.URL.createObjectURL(new Blob([response.data]));;
    //         switch (extension) {
    //             case 'png' || 'jpg' || 'bmp':
    //                 try {
    //                     let img = document.createElement('img');
    //                     img.setAttribute('src', url);
    //                     modal.appendChild(img);
    //                 } catch (error) {
    //                     console.log("Error fetching image file:", error);
    //                 }
    //                 break;

    //             // case 'mp4':
    //             //     var video = document.createElement('video');
    //             //     video.setAttribute('src', file.url);
    //             //     video.setAttribute('controls', true);
    //             //     previewModal.appendChild(video);
    //             //     break;
    //             // case 'application/pdf':
    //             //     var iframe = document.createElement('iframe');
    //             //     iframe.setAttribute('src', file.url);
    //             //     previewModal.appendChild(iframe);
    //             //     break;
    //             default:
    //                 previewModal.innerText = 'Preview for this file format is not supported.';
    //         }

    //         console.log("CAN PREVIEW")

    //     } else {
    //         console.log("CANnOT PREVIEW")
    //         alert(`Preview for ${serverName.split(".").pop()} is not supported`);
    //     }
    // };

    const handleDelete = async (event) => {
        event.preventDefault();
        // console.log(event.target.parentNode.id)
        try {
            let jwt = localStorage.getItem("token")
            const response = await toast.promise(axios.delete("http://localhost:8080/file/delete", {
                headers: {Authorization: `Bearer ${jwt}`},
                params: {
                    serverName: event.target.parentNode.id
                }
            }), {
                loading: "Deleting file...",
                error: "Error! File Could not be Deleted.",
                success: "File Deleted Successfully."
            })
            // console.log(response)
        } catch (error) {
            console.error('Failed to delete file', error)
        }
        getFiles();
    };

    return (
        <>
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left w-3/5">NAME</th>
                        <th className="hidden md:block px-4 py-2 text-left w-1/5">FILESIZE</th>
                        <th className="px-4 py-2 text-left w-1/5">UPLOAD DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file, index) => (
                        <tr key={index} className={` group/row ${index == activeMenu ? "bg-gray-200 " : "hover:bg-gray-100"}`} >
                            <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 ">
                                <div className="relative flex justify-between items-center">
                                    {file.name}
                                    <SlOptions id={index}
                                        className={`hidden w-6 h-6 p-1 m-0 hover:bg-dark-teal-2 hover:opacity-75 rounded-full ${index == activeMenu ? "!block" : "group-hover/row:block"}`}
                                        onClick={(e) => handleMenuClick(e.target.id)}
                                    />
                                    {activeMenu == index &&
                                        <div id={file.serverName} className={'absolute z-20 right-7 -top-full  text-sm bg-white shadow-md flex flex-col justify-between items-start divide-y-2 divide border border-gray-200 '}>
                                            <div className="w-full px-4 py-3 hover:bg-dark-teal-2 hover:opacity-75 hover:text-light-teal cursor-pointer flex items-center group/menu" id="menu-item" onClick={(event) => handleDownload(event)}><AiOutlineDownload className="h-5 w-5 mr-2 text-gray-700 group-hover/menu:text-light-teal" />Download</div>
                                            {/* <div className="w-full px-4 py-3 hover:bg-dark-teal-2 hover:opacity-75 hover:text-light-teal cursor-pointer flex items-center group/menu" id="menu-item" onClick={(event) => handlePreview(event)}><VscPreview className="h-5 w-5 mr-2 text-gray-700 group-hover/menu:text-light-teal" />Preview</div> */}
                                            <div className="w-full px-4 py-3 hover:bg-dark-teal-2 hover:opacity-75 hover:text-red-700 cursor-pointer flex items-center group/menu" id="menu-item" onClick={(event) => handleDelete(event)}><MdOutlineDelete className="h-5 w-5 mr-2 text-gray-700 group-hover/menu:text-red-700" />Delete</div>
                                        </div>
                                    }
                                </div>
                            </td>
                            <td className=" hidden md:table-cell border-t-2 border-b-2 border-gray-200 px-4 py-3">{file.size < 1000 ? file.size + ' KB' : parseFloat(file.size / 1000).toFixed(2) + ' MB'}</td>
                            <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">{file.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <dialog className='relative p-5 max-w-screen-xl max-h-screen border border-dark-teal-2' id="preview-modal">
                Hello test box yall



                <div className='absolute top-1 right-1 cursor-pointer' onClick={() => modal.close()}>X</div>
            </dialog>
        </>
    )
}

export default Files
