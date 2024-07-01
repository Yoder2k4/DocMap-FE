import React, { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE from '../../utils/api_url';
import axios from 'axios';
import AuthContext from '../../utils/auth-context';

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
			<form onSubmit={handleSubmit} className="h-[91vh]">
				<input
					type="email"
					name="email"
					id="email"
					onChange={handleChange}
					value={data.email}
					className="text-black"
				/>
				<label htmlFor="email">Email</label>
				<br />
				<br />
				<input
					type="password"
					name="password"
					id="password"
					onChange={handleChange}
					value={data.password}
					className="text-black"
				/>
				<label htmlFor="password">Password</label>
				<br />
				<br />
				<button>Log In</button>
			</form>
		</Fragment>
	);
};

export default PatientLogin;
