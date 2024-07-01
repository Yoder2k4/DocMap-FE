import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import { AuthContextProvider } from './utils/auth-context';
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
import ProtectedRoutes from './utils/ProtectedRoutes';
import AuthRoute from './utils/AuthRoute';
library.add(fas);

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Navbar />}>
				<Route index Component={HomePage} />
				<Route path="doctor">
					<Route element={<AuthRoute />}>
						<Route exact path="login" element={<DoctorLogin />} />
						<Route exact path="register" element={<DoctorRegister />} />
					</Route>
					<Route element={<ProtectedRoutes />}>
						<Route exact path="profile" element={<DoctorPage />} />
						<Route exact path="details" element={<DoctorDetailRegister />} />
					</Route>
				</Route>
				<Route path="patient">
					<Route element={<AuthRoute />}>
						<Route exact path="register" element={<PatientRegister />} />
						<Route exact path="login" element={<PatientLogin />} />
					</Route>
					<Route element={<ProtectedRoutes />}>
						<Route exact path="home" element={<PatientHome />} />
					</Route>
				</Route>
			</Route>,
		),
	);

	return (
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	);
}

export default App;
