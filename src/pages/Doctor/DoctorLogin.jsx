import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClinicForm from '../../components/doctor/Forms/ClinicForm';

const API_BASE = 'http://localhost:3001';

const DoctorLogin = (props) => {
	const navigate = useNavigate();
	const [data, setData] = useState({
		email: '',
		password: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(API_BASE + '/doctor/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				const user = await response.json();
				const userID = user._id;
				props.onLogin('doctor');
				navigate(`/doctor/${userID}`);
				localStorage.setItem('accID', user.accID);
				localStorage.setItem('userID', userID);
			} else {
				console.error('Error submitting data');
			}
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
				<button>Log In</button>
			</form>
		</Fragment>
	);
};

export default DoctorLogin;
