import { createContext } from 'react';

const AuthContext = createContext({
	isLoggedIn: '',
	onLogout: () => {},
});
export default AuthContext;
