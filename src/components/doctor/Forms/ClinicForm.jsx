import React, { Fragment, useCallback } from 'react';
import AddressAutocomplete from './AutocompleteAddress';
import TimingForm from './TimingForm';

const ClinicForm = ({
	clinics,
	inputChangeHandler,
	addBtnHandler,
	delClinicBtnHandler,
	addTimingHandler,
}) => {
	const changeTimingHandler = useCallback(
		(updatedTiming, timingIndex, clinicIndex) =>
			inputChangeHandler('timings', updatedTiming, clinicIndex, timingIndex),
		[inputChangeHandler],
	);

	return (
		<Fragment>
			{clinics.map((clinic, clinicIndex) => (
				<div
					className="flex flex-col justify-center items-center py-2"
					key={clinicIndex}
				>
					<div className="mb-5 flex w-full justify-evenly">
						<div className="w-1/4">
							<label
								htmlFor="place"
								className="block mb-2 text-sm font-medium text-white"
							>
								Place
							</label>
							<input
								className="border text-md rounded-lg block w-full px-2.5 py-3.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
								type="text"
								name="place"
								placeholder="Place Name"
								onChange={(e) =>
									inputChangeHandler(
										e.target.name,
										e.target.value,
										clinicIndex,
										-1,
									)
								}
								value={clinic.place}
								required
							/>
						</div>
						<div className="self-end">
							<AddressAutocomplete
								inputHandle={(newValue) =>
									inputChangeHandler(
										'location',
										JSON.stringify(newValue),
										clinicIndex,
										-1,
									)
								}
							/>
						</div>
						<svg
							className="cursor-pointer self-center mt-5"
							onClick={() => delClinicBtnHandler(clinicIndex)}
							fill="currentColor"
							aria-hidden="true"
							width="18px"
							height="22px"
							viewBox="0 0 14 18"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
						>
							<g
								id="Icons"
								stroke="none"
								strokeWidth="1"
								fill="none"
								fillRule="evenodd"
							>
								<g id="Rounded" transform="translate(-275.000000, -245.000000)">
									<g id="Action" transform="translate(100.000000, 100.000000)">
										<g
											id="-Round-/-Action-/-delete"
											transform="translate(170.000000, 142.000000)"
										>
											<g>
												<polygon
													id="Path"
													points="0 0 24 0 24 24 0 24"
												></polygon>
												<path
													d="M6,19 C6,20.1 6.9,21 8,21 L16,21 C17.1,21 18,20.1 18,19 L18,9 C18,7.9 17.1,7 16,7 L8,7 C6.9,7 6,7.9 6,9 L6,19 Z M18,4 L15.5,4 L14.79,3.29 C14.61,3.11 14.35,3 14.09,3 L9.91,3 C9.65,3 9.39,3.11 9.21,3.29 L8.5,4 L6,4 C5.45,4 5,4.45 5,5 C5,5.55 5.45,6 6,6 L18,6 C18.55,6 19,5.55 19,5 C19,4.45 18.55,4 18,4 Z"
													id="🔹Icon-Color"
													fill="white"
												></path>
											</g>
										</g>
									</g>
								</g>
							</g>
						</svg>
					</div>
					<div className="w-full">
						<label htmlFor="timings">Timings</label>
						<div className="flex flex-col justify-center items-center">
							{clinic['timings'].map((timing, timingIndex) => (
								<TimingForm
									key={timingIndex}
									initialValue={timing}
									timingIndex={timingIndex}
									clinicIndex={clinicIndex}
									onChange={changeTimingHandler}
								/>
							))}
							<button
								onClick={(e) => {
									e.preventDefault();
									addTimingHandler(clinicIndex);
								}}
								className="text-white  focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-900 hover:bg-gray-700 focus:ring-gray-700 border-gray-700"
							>
								Add Timing
							</button>
						</div>
					</div>
				</div>
			))}
			<button
				onClick={addBtnHandler}
				className="text-white w-1/2 self-center focus:outline-none focus:ring-4 font-medium rounded-lg text-sm py-2.5 me-2 mb-2 bg-gray-900 hover:bg-gray-700 focus:ring-gray-700 border-gray-700"
			>
				Add Location
			</button>
		</Fragment>
	);
};

export default ClinicForm;
