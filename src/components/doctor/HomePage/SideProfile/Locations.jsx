import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import DocDetailContext from '../../../../utils/DocDetailContext';

const daysArray = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Locations = () => {
	const { doctor } = useContext(DocDetailContext);
	return (
		<div
			className="bg-gray-800 w-full h-[58vh] mt-10 p-4 rounded-xl flex flex-col overflow-y-scroll no-scrollbar divide-y-2"
			style={{ scrollbarWidth: 'none' }}
		>
			{doctor.clinics &&
				doctor.clinics.map((clinic, i) => (
					<div key={i} className="w-full flex items-center py-2">
						<span className="w-1/4 items-center">
							<FontAwesomeIcon
								icon="fa-solid fa-location-crosshairs"
								size="3x"
								className="hover:text-orange-500 cursor-pointer"
							/>
						</span>
						<span className="w-3/4 h-full flex flex-col">
							<div className="text-xl pb-2">{clinic.place}</div>
							{clinic.timings.map((timing, idx) => (
								<div key={idx} className="flex items-center py-1">
									<span className="w-1/2 text-md h-full flex items-center">
										{daysArray.map((day, index) => (
											<span className="w-1/7 text-center" key={index}>
												{timing.days.includes(index) ? (
													<span className="text-yellow-300">{day}</span>
												) : (
													<span className="text-gray-400">{day}</span>
												)}
											</span>
										))}
									</span>
									<span className="w-1/2 text-md h-full flex">
										{timing.time.open} - {timing.time.close}
									</span>
								</div>
							))}
						</span>
					</div>
				))}
		</div>
	);
};

export default Locations;
