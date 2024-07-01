import React, { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE from '../../utils/api_url';
import axios from 'axios';
import AuthContext from '../../utils/auth-context';

const DoctorRegister = () => {
	const navigate = useNavigate();
	const [data, setData] = useState({
		email: '',
		password: '',
	});
	const {setIsLoggedIn} = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.post(API_BASE + '/doctor/register', data, {withCredentials: true});
			setIsLoggedIn(2);
			navigate('/doctor/details');
		} catch (error) {
			console.error('Error:', error);
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
				<button>Sign Up</button>
			</form>
		</Fragment>
	);
};

export default DoctorRegister;
