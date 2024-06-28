import React, { useCallback, useEffect, useState } from 'react';

const API_BASE = 'http://localhost:3001';

const changeDateFormat = (date) => {
	const dateObj = new Date(date);
	const month = dateObj.getMonth() + 1;
	const day = String(dateObj.getDate()).padStart(2, '0');
	const year = dateObj.getFullYear();
	const output = day + '/' + month + '/' + year;
	return output;
};

const getDayFormat = (date) => {
	const dateObj = new Date(date);
	const day = dateObj.getDay();
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	return days[day];
};


const Appointments = () => {
	const accID = localStorage.getItem('accID');
	const [appointments, setAppointments] = useState([]);
	const getAllAppointmentsHandler = useCallback(async () => {
		try {
			const response = await fetch(`${API_BASE}/appointment/${accID}`);
			if (!response.ok) {
				console.log('Error in fetch request');
			}
			const data = await response.json();
			setAppointments(data);
		} catch (err) {
			console.log(err);
		}
	}, [accID]);

	useEffect(() => {
		getAllAppointmentsHandler();
	}, [getAllAppointmentsHandler]);

	return (
		<div className="bg-gray-800 h-full w-11/12 mt-5 mb-6 rounded-xl flex flex-col">
			<h1 className="h-[10vh] px-5 flex items-center text-4xl border-b-2 border-gray-700 w-full">
				Your Appointments
			</h1>
			<div
				className="max-h-[75vh] w-full px-5 py-4 overflow-y-scroll no-scrollbar flex flex-col items-center"
				style={{ scrollbarWidth: 'none' }}
			>
				{/* patient name
					his email
					clinic's location
					timing => date, day and time */}
				{appointments.length > 0 &&
					appointments.map((appointment) => (
						<div className="bg-gray-700 w-11/12 rounded-xl flex my-4">
							<div className="h-full w-5/12 px-5 py-5 flex flex-col justify-center">
								<h1 className="text-4xl py-2 w-full text-center">
									{appointment.username}
								</h1>
								<h3 className="pl-2 text-xs text-gray-300 w-full text-center">
									{appointment.email}
								</h3>
							</div>
							<div className="h-full flex-grow px-5 flex flex-col justify-center">
								<h2>{appointment.clinic}</h2>
								<h2>{changeDateFormat(appointment.date)}</h2>
								<h3>
									{getDayFormat(appointment.date)}, {appointment.timing}
								</h3>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default Appointments;
