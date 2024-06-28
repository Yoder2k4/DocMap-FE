import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:3001';

const PatientRegister = (props) => {
	const navigate = useNavigate();
	const [data, setData] = useState({
		email: '',
		username: '',
		password: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(API_BASE + '/patient/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				const user = await response.json();
				const userID = user._id;
				props.onLogin('patient');
				navigate(`/patient/${userID}`);
				const patientObj = {
					email: data.email,
					username: user.username,
					patientID: userID,
				};
				localStorage.setItem('patientObj', JSON.stringify(patientObj));
				console.log('Data submitted successfully');
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
					type="text"
					name="username"
					id="username"
					onChange={handleChange}
					value={data.username}
					className="text-black"
				/>
				<label htmlFor="username">Name</label>
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

export default PatientRegister;
