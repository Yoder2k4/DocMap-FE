import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Badge = ({ degree, institution }) => {
	return (
		<span className="p-[0.8px] rounded-lg bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
			<span className="border bg-gray-700 w-44 h-16 rounded-lg flex">
				<span className="flex h-full w-1/4 justify-center items-center">
					<FontAwesomeIcon icon="fa-solid fa-building-columns" />
				</span>
				<span className="flex flex-col w-3/4 h-full pr-2">
					<span className="h-1/2 flex items-center">{degree}</span>
					<span className="h-1/2 flex items-center text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">{institution}</span>
				</span>
			</span>
		</span>
	);
};

export default Badge;
