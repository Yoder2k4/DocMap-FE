import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MarkerIcon = ({ size = '2x', color = 'red' }) => {
	return (
		<FontAwesomeIcon
			icon="fa-solid fa-location-dot"
			size={size}
			color={color}
		/>
	);
};

export default MarkerIcon;
