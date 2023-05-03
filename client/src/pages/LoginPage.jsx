import React, { useContext } from 'react'
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import UserContext from '../utils/UserContext';

const LoginPage = () => {

    const {setUserData} = useContext(UserContext)

       return (
        <div className='bg-gradient-to-b from-dark-teal from-25%  to-dark-teal-2 to-99% w-screen h-screen flex flex-col items-center justify-center' >
            <div className='w-[400px]  bg-white border border-gray-200 shadow-xl px-10 py-16 rounded-2xl text-center flex flex-col items-center gap-7'>
                <div>
                    <img src='https://krayo-assets.s3.ap-south-1.amazonaws.com/krayo-logo-with-better-everyday-800x290.svg' className='w-2/3 mx-auto' />
                    <h2 className='font-medium my-3 text-gray-600'>Unified OS for Corporate Spend</h2>
                </div>
                <div>
                    <p className='text-3xl font-semibold text-gray-600 mb-3'>Hello!</p>
                    <h2 className='text-3xl font-semibold text-gray-600 leading-7'>Welcome to <span className='text-dark-teal-2 font-bold text-4xl'>FileServer</span></h2>
                </div>

                <GoogleLogin
                    size="large"
                    shape="pill"
                    theme="filled_black"
                    width="250px"

                    onSuccess={async(credentialResponse) => {
                        // console.log(credentialResponse);
                        try {
                            const response = await axios.post("http://localhost:8080/auth/login", { token: credentialResponse.credential }, {
                                withCredentials: true
                            });
                            // console.log(response.data.userData);
                            setUserData(response.data.userData)
                        }
                        catch(error) {
                            console.log(error , ": Could not fetch user data!")
                        }
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
            <p className='mt-1.5'>*For demonstration purposes only.</p>
        </div>
    )
}

export default LoginPage

