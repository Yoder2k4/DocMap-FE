import React, {
	Fragment,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Datepicker, Dropdown } from 'flowbite-react';
import DocDetailContext from '../../../../utils/DocDetailContext';
import BookedComponent from './Booked';
import API_BASE from '../../../../utils/api_url';
import axios from 'axios';

const BookAppointment = () => {
	const { doctor } = useContext(DocDetailContext);
	const [booked, setBooked] = useState(false);
	const [bookedData, setBookedData] = useState({});
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedClinic, setSelectedClinic] = useState(-1);
	const [selectedTime, setSelectedTime] = useState('');
	const [timingsAvailable, setTimingsAvailable] = useState([]);

	const checkBookedStatus = useCallback(async () => {
		try {
			const response = await axios.get(API_BASE + '/appointment/search/' + doctor.doctorID, {withCredentials: true});
			const data = response.data;
			if (data.length > 0) {
				setBooked(true);
				setBookedData(data[0]);
			}
		} catch (err) {
			console.log(err);
		}
	}, [doctor]);

	useEffect(() => {
		checkBookedStatus();
	}, [checkBookedStatus]);

	useEffect(() => {
		const day = selectedDate.getDay();
		const timingsArray = [];
		if (selectedClinic === -1) return;
		doctor.clinics[selectedClinic].timings.forEach((timing) => {
			if (timing.days.includes(day)) {
				timingsArray.push(timing.time.open + ' - ' + timing.time.close);
			}
		});
		setTimingsAvailable(timingsArray);
	}, [selectedDate, selectedClinic, doctor]);

	const clinicSelectHandler = (clinic) => {
		setTimingsAvailable([]);
		setSelectedTime('');
		setSelectedClinic(clinic);
	};

	const bookAppointmentHandler = async (e) => {
		e.preventDefault();
		if (selectedClinic === -1 || selectedTime === '') {
			alert('Please select clinic and timing');
			return;
		}

		const sendData = {
			clinic: doctor.clinics[selectedClinic].place,
			timing: selectedTime,
			date: selectedDate,
		};
		try {
			const response = await axios.post(API_BASE + '/appointment/book/' + doctor.doctorID, sendData, {withCredentials: true});
			const data = response.data;
			setBooked(true);
			setBookedData(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Fragment>
			{booked ? (
				<BookedComponent
					data={bookedData}
					changeBookStatus={() => {
						setBooked(false);
						setBookedData({});
					}}
				/>
			) : (
				<div className="bg-gray-800 h-full w-11/12 mt-5 mb-6 rounded-xl flex flex-col">
					<div className="flex py-10">
						<div className="w-1/2 flex flex-col items-center justify-around">
							<div className="flex items-center justify-around w-full">
								<label className="text-lg font-bold">Select Clinic: </label>
								<Dropdown
									label={
										selectedClinic === -1
											? 'Select clinic'
											: doctor.clinics[selectedClinic].place
									}
								>
									{doctor.clinics.map((clinic, index) => (
										<Dropdown.Item
											key={index}
											onClick={() => {
												clinicSelectHandler(index);
											}}
										>
											{clinic.place}
										</Dropdown.Item>
									))}
								</Dropdown>
							</div>
							<div className="flex items-center justify-around w-full">
								<label className="text-lg font-bold">Select timing: </label>
								{timingsAvailable.length === 0 ? (
									<Dropdown label="Select timing" disabled />
								) : (
									<Dropdown
										label={selectedTime === '' ? 'Select timing' : selectedTime}
									>
										{timingsAvailable.map((timing, index) => (
											<Dropdown.Item
												key={index}
												onClick={() => {
													setSelectedTime(timing);
												}}
											>
												{timing}
											</Dropdown.Item>
										))}
									</Dropdown>
								)}
							</div>
						</div>
						<div className="w-1/2 flex justify-center items-center h-96">
							{selectedClinic === -1 ? (
								<h1 className="text-4xl font-bold text-white">
									Select clinic first
								</h1>
							) : (
								<Datepicker
									inline
									onSelectedDateChanged={(date) => {
										setSelectedTime('');
										setSelectedDate(date);
									}}
									minDate={new Date()}
								/>
							)}
						</div>
					</div>
					<button
						className="w-1/2 self-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 mb-2"
						onClick={bookAppointmentHandler}
					>
						Book Appointment
					</button>
				</div>
			)}
		</Fragment>
	);
};

export default BookAppointment;
