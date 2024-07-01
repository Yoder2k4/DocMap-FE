import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import API_BASE from './api_url';

const AuthContext = createContext({});

export const AuthContextProvider = ({children}) => {
	const [isLoggedIn, setIsLoggedIn] = useState(-1);
	const [userID, setUserID] = useState('');
	const logoutHandler = async () => {
		const response = await axios.get(API_BASE + '/logout', {withCredentials: true});
		console.log(response.data);
		setIsLoggedIn(0);
	};
	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		const authStatus = async () => {
			try {
				const response = await axios.get(API_BASE + '/checkAuth', {withCredentials: true, signal: controller.signal});
				if(isMounted) {
					setIsLoggedIn(response.data.auth);
					if(response.data.userID) setUserID(response.data.userID);
				}
			} catch (err) {
				console.log(err);
			}
		};
		authStatus();

		return () => {
			isMounted = false;
			controller.abort();
		}
	}, []);

	return <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, logoutHandler, userID, setUserID}}>
		{children}
	</AuthContext.Provider>
}

export default AuthContext;
