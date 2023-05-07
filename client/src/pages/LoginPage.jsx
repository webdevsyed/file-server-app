import React, { useContext } from 'react'
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google'
import UserContext from '../utils/UserContext';


const LoginPage = () => {
    const { setUserData } = useContext(UserContext)

    // const googleLogin = useGoogleLogin({
    //     flow: 'auth-code',
    //     onSuccess: async (codeResponse) => {
    //         console.log(codeResponse);
    //         const tokens = await axios.post(
    //             'http://localhost:3001/auth/google', {
    //                 code: codeResponse.code,
    //             });

    //         console.log(tokens);
    //     },
    //     onError: errorResponse => console.log(errorResponse),
    // });

    const login = useGoogleLogin({
        onSuccess: async ({ code }) => {
            const response = await axios.post('http://localhost:8080/auth/login', {
                code,
            });
            //   console.log(response);
            setUserData(response.data.userData)
            localStorage.setItem("token", response.data.jwt)
        },
        flow: 'auth-code',
    });


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

                {/* <GoogleLogin
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
                /> */}

                <button
                    className='bg-black px-5 py-3 rounded-md flex items-center'
                    onClick={() => login()}>
                    <svg className='h-5 w-5 max-h-5 max-w-5' version="1.1" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                    <span className='ml-4 text-white font-semibold text-lg'>Sign in with Google</span>
                </button>
            </div>
            <p className='mt-1.5'>*For demonstration purposes only.</p>
        </div>
    )
}

export default LoginPage

