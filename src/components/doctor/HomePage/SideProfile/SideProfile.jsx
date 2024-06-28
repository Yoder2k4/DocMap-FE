import React from 'react';
import Connect from './Connect';
import Locations from './Locations';

const SideProfile = () => {
	return (
		<div className="w-5/6 h-full ">
			<Connect />
			<Locations />
		</div>
	);
};

export default SideProfile;
