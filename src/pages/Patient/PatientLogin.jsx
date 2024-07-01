import React, { Fragment, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE from '../../utils/api_url';
import axios from 'axios';
import AuthContext from '../../utils/auth-context';
import logo from '../../assets/logo.png';

const PatientLogin = (props) => {
	const navigate = useNavigate();
	const { setIsLoggedIn, setUserID } = useContext(AuthContext);
	const [data, setData] = useState({
		email: '',
		password: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(API_BASE + '/patient/login', data, {
				withCredentials: true,
			});
			if (res.data.success) {
				setIsLoggedIn(1);
				setUserID(res.data.userID);
				navigate('/patient/home');
			} else {
				console.error('Error submitting data');
			}
		} catch (error) {
			console.log('handleSubmit');
			console.error('Error:', error.message);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<Fragment>
			<div className="flex flex-col items-center justify-center px-6 my-[7vh] mx-auto">
				<div className="flex items-center mb-6 text-4xl font-semibold dark:text-white">
					<img className="w-14 h-14 mr-2" src={logo} alt="logo" />
					DocMap
				</div>
				<div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
							Sign in as Patient
						</h1>
						<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-white"
								>
									Your email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									onChange={handleChange}
									value={data.email}
									className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
									placeholder="name@company.com"
									required=""
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-white"
								>
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									onChange={handleChange}
									value={data.password}
									placeholder="••••••••"
									className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
									required=""
								/>
							</div>
							<button
								type="submit"
								className="w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700"
							>
								Sign in
							</button>
							<p className="text-sm font-light text-white">
								Don’t have an account yet?{' '}
								<Link
									to="/patient/register"
									className="font-mediumhover:underline text-primary-500"
								>
									Sign up
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default PatientLogin;
