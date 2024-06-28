import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SuggestionsBox = ({ suggestions, changeViewPort }) => {
	const navigate = useNavigate();
	const onHoverHandler = (suggestion) => {
		changeViewPort(suggestion.lat, suggestion.lon);
	};

	const checkDoctorProfileHandler = (doctorID, accID) => {
		localStorage.setItem('userID', doctorID);
		localStorage.setItem('accID', accID);
		navigate(`/doctor/${doctorID}`);
	};

	return (
		<div className="bg-gray-700 mt-5 py-3 px-2 rounded-xl flex flex-col overflow-y-scroll no-scrollbar">
			{suggestions.map((suggestion, index) => {
				return (
					<Fragment key={index}>
						<div
							className="flex my-2 py-2 w-full h-30 items-center cursor-pointer bg-gray-800 hover:bg-gray-900 rounded-xl border border-gray-600 hover:border-gray-900 hover:shadow-xl transition duration-150"
							onMouseEnter={() => onHoverHandler(suggestion)}
							onClick={() =>
								checkDoctorProfileHandler(
									suggestion.info.doctorID,
									suggestion.info._id,
								)
							}
						>
							<div className="h-full w-2/5 py-5 px-2 flex justify-center items-center">
								<span className="rounded-full w-20 h-20 flex justify-center items-center overflow-hidden">
									<img
										src={suggestion.info.images.pfpInfo.url}
										alt="pfpImage"
										className="w-full"
									/>
								</span>
							</div>
							<div className="w-3/5 h-full flex flex-col">
								<div className="text-2xl font-bold pt-2 pb-1">
									{suggestion.info.name}
								</div>
								<div className="text-md flex items-center text-gray-200 py-1">
									<FontAwesomeIcon icon="fa-solid fa-location-dot" />
									<span className="ml-2">{suggestion.place}</span>
								</div>
								<div className="text-sm flex items-center text-gray-200">
									<FontAwesomeIcon
										icon="fa-solid fa-graduation-cap"
										size="sm"
									/>
									<span className="ml-1">{suggestion.info.specialisation}</span>
								</div>
								<div className="text-sm flex items-center text-gray-200 ml-1">
									<FontAwesomeIcon icon="fa-solid fa-indian-rupee-sign" />
									<span className="ml-2">{suggestion.info.fees}</span>
								</div>
								<div className="pb-1 pt-2">
									<StarRating />
								</div>
							</div>
						</div>
						<hr className="border-1 border-gray-400 " />
					</Fragment>
				);
			})}
		</div>
	);
};

export default SuggestionsBox;
