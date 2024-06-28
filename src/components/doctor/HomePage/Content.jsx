import React from 'react';
import Profile from './Profile/Profile';
import SideProfile from './SideProfile/SideProfile';
import Reviews from './Reviews/Reviews';
import Appointments from './Appointments/Appointments';
import EditProfile from './EditProfile/EditProfile';
import BookAppointment from './BookAppointment/BookAppointment';

const sections = [
	<Profile />,
	<Reviews />,
	<Appointments />,
	<EditProfile />,
	<BookAppointment />,
];

const Content = ({ section }) => {
	return (
		<div className="flex flex-grow h-full">
			<div className="w-8/12 flex flex-col items-center">
				{sections[section]}
			</div>
			<div className="flex-grow flex justify-center items-center px-3 py-5">
				<SideProfile />
			</div>
		</div>
	);
};

export default Content;
