import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StarRating from './StarRating';
import { useNavigate } from 'react-router-dom';

const ClinicTooltip = ({ markerInfo }) => {
	const navigate = useNavigate();
	const checkDoctorProfileHandler = (e) => {
		e.preventDefault();
		localStorage.setItem('userID', markerInfo.info.doctorID);
		localStorage.setItem('accID', markerInfo.info._id);
		navigate(`/doctor/${markerInfo.info.doctorID}`);
	}
	
	return (
		<div class="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 inline-block w-64 text-sm transition-opacity duration-300 border rounded-lg shadow-sm text-gray-400 bg-gray-800 border-gray-600">
			<div class="p-3">
				<div class="flex items-center justify-between mb-2">
					<span className="w-14 h-14 rounded-full overflow-hidden flex items-center">
						<img
							class="w-full"
							src={markerInfo.info.images.pfpInfo.url}
							alt="Jese Leos"
						/>
					</span>
					<div>
						<button
							type="button"
							class="text-white focus:ring-4 font-medium rounded-lg text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
							onClick={checkDoctorProfileHandler}
						>
							Visit
						</button>
					</div>
				</div>
				<p class="text-base font-semibold leading-none text-white">
					<span>{markerInfo.info.name}</span>
				</p>
				<p class="mb-3 text-sm font-normal flex items-center">
					<FontAwesomeIcon icon="fa-solid fa-location-dot" size="sm" />
					<span className="ml-1">{markerInfo.place}</span>
				</p>
				<p class="mb-4 text-xs flex flex-col">
					<div className="flex items-center">
						<FontAwesomeIcon icon="fa-solid fa-phone" />
						<span className="ml-1">{markerInfo.info.social.contact}</span>
					</div>
					<div className="flex items-center">
						<FontAwesomeIcon icon="fa-solid fa-envelope" />
						<span className="ml-1">{markerInfo.info.social.contactMail}</span>
					</div>
				</p>
				<StarRating />
			</div>
		</div>
	);
};

export default ClinicTooltip;
