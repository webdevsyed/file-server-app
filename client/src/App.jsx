import axios from 'axios'
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import UserContext from './utils/UserContext';

function App() {
	const [userData, setUserData] = useState();

	useEffect(() => {
		console.log("check login!")
		const checkLogin = async () => {
			try {
				let jwt = localStorage.getItem("token")
				if (!jwt) {
					return console.log("User not Logged in!")
				}
				const response = await axios.post("http://localhost:8080/auth/login", {},
					{
						headers: { Authorization: `Bearer ${jwt}` }
					})

				// console.log(response)
				setUserData(response.data.userData)
			} catch (error) {
				console.log(error, "Login Failed!")
			}
		}
		checkLogin()
	}, [])

	return (
		<UserContext.Provider
			value={{
				userData: userData,
				setUserData: setUserData
			}}>
			<div className="font-Poppins bg-gray-light">
				{userData
					?
					<Dashboard />
					:
					<LoginPage />
				}
			</div>
		</UserContext.Provider>
	);
}

export default App;
