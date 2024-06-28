import React from 'react';

const API_BASE = 'http://localhost:3001';

const BookedComponent = ({ data, changeBookStatus }) => {
	const changeDateFormat = (date) => {
		const dateObj = new Date(date);
		const month = dateObj.getMonth() + 1;
		const day = String(dateObj.getDate()).padStart(2, '0');
		const year = dateObj.getFullYear();
		const output = day + '/' + month + '/' + year;
		return output;
	};

	const cancelAppointmentHandler = async (appID) => {
		try {
			const response = await fetch(`${API_BASE}/appointment/cancel/${appID}`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				console.log('Error in fetch request');
			}

			const data = await response.json();
			console.log(data);
			changeBookStatus();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="bg-gray-800 h-full w-11/12 mt-5 mb-6 rounded-xl flex flex-col">
			<h1 className="text-4xl text-center my-6">Appointment Booked!!</h1>
			<div className="flex flex-col items-center justify-around">
				<div className="flex items-center justify-around w-full my-2">
					<label className="text-lg font-bold w-1/2 text-center">
						Clinic:{' '}
					</label>
					<h1 className="text-lg font-bold w-1/2 text-center">{data.clinic}</h1>
				</div>
				<div className="flex items-center justify-around w-full my-2">
					<label className="text-lg font-bold w-1/2 text-center">
						Timing:{' '}
					</label>
					<h1 className="text-lg font-bold w-1/2 text-center">{data.timing}</h1>
				</div>
				<div className="flex items-center justify-around w-full my-2">
					<label className="text-lg font-bold w-1/2 text-center">Date: </label>
					<h1 className="text-lg font-bold w-1/2 text-center">
						{changeDateFormat(data.date)}
					</h1>
				</div>
			</div>
			<button
				className="focus:outline-none text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 my-10 bg-red-600 hover:bg-red-700 focus:ring-red-900 w-1/2 self-center"
				onClick={() => cancelAppointmentHandler(data._id)}
			>
				Cancel Appointment
			</button>
		</div>
	);
};

export default BookedComponent;
