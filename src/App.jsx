import { useState, useEffect } from 'react';
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import AuthContext from './utils/auth-context';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/HomePage';
import DoctorRegister from './pages/Doctor/DoctorRegister';
import DoctorLogin from './pages/Doctor/DoctorLogin';
import PatientRegister from './pages/Patient/PatientRegister';
import PatientLogin from './pages/Patient/PatientLogin';
import PatientHome from './pages/Patient/PatientHome';
import DoctorPage from './pages/Doctor/DoctorPage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import DoctorDetailRegister from './pages/Doctor/DoctorDetailRegister';
library.add(fas);

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState('');

	useEffect(() => {
		const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
		if (storedUserLoggedInInformation === '1') {
			setIsLoggedIn('doctor');
		}
		if (storedUserLoggedInInformation === '2') {
			setIsLoggedIn('patient');
		}
	}, []);

	const loginHandler = (authType) => {
		if (authType === 'doctor') localStorage.setItem('isLoggedIn', '1');
		else localStorage.setItem('isLoggedIn', '2');
		setIsLoggedIn(authType);
	};

	const logoutHandler = () => {
		setIsLoggedIn('');
		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('accID');
		localStorage.removeItem('userID');
		localStorage.removeItem('patientObj');
	};

	// handling ResizeObserver error (suppressing it)
	useEffect(() => {
		window.addEventListener('error', (e) => {
			if (
				e.message ===
				'ResizeObserver loop completed with undelivered notifications.'
			) {
				const resizeObserverErrDiv = document.getElementById(
					'webpack-dev-server-client-overlay-div',
				);
				const resizeObserverErr = document.getElementById(
					'webpack-dev-server-client-overlay',
				);
				if (resizeObserverErr) {
					resizeObserverErr.setAttribute('style', 'display: none');
				}
				if (resizeObserverErrDiv) {
					resizeObserverErrDiv.setAttribute('style', 'display: none');
				}
			}
		});
	}, []);

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				path="/"
				element={<Navbar isLogin={isLoggedIn} onLogout={logoutHandler} />}
			>
				<Route index Component={HomePage} />
				<Route path="doctor">
					<Route exact path=":userID" element={<DoctorPage />} />
					<Route exact path="register">
						<Route index element={<DoctorRegister onLogin={loginHandler} />} />
						<Route exact path=":userID" element={<DoctorDetailRegister />} />
					</Route>
					<Route
						exact
						path="login"
						element={<DoctorLogin onLogin={loginHandler} />}
					/>
				</Route>
				<Route path="patient">
					<Route exact path=":userID" element={<PatientHome />} />
					<Route
						exact
						path="register"
						element={<PatientRegister onLogin={loginHandler} />}
					/>
					<Route
						exact
						path="login"
						element={<PatientLogin onLogin={loginHandler} />}
					/>
				</Route>
			</Route>,
		),
	);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
			}}
		>
			<RouterProvider router={router} />
		</AuthContext.Provider>
	);
}

export default App;
