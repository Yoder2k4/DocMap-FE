import React, { Fragment } from 'react';

const Profile = ({ onChange, info }) => {
	const infoChangeHandler = (e) => {
		onChange(e);
	};

	return (
		<Fragment>
			<div className="mb-5">
				<label
					htmlFor="name"
					className="block mb-2 text-sm font-medium text-white"
				>
					Name
				</label>
				<input
					type="text"
					name="name"
					className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
					placeholder="Enter your name"
					onChange={(e) => infoChangeHandler(e)}
					value={info.name}
					required
				/>
			</div>
			<div className="mb-5">
				<label
					htmlFor="experience"
					className="block mb-2 text-sm font-medium text-white"
				>
					Experience
				</label>
				<input
					type="number"
					name="experience"
					className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
					placeholder="1992"
					onChange={(e) => infoChangeHandler(e)}
					value={info.experience}
					required
				/>
			</div>
			<div className="mb-5">
				<label
					htmlFor="specialisation"
					className="block mb-2 text-sm font-medium text-white"
				>
					Specialisation
				</label>
				<input
					type="text"
					name="specialisation"
					className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
					placeholder="Enter your specialisation"
					onChange={(e) => infoChangeHandler(e)}
					value={info.specialisation}
					required
				/>
			</div>
			<div className="mb-5">
				<label
					htmlFor="fees"
					className="block mb-2 text-sm font-medium text-white"
				>
					Fees
				</label>
				<input
					type="number"
					name="fees"
					className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
					placeholder="4580"
					onChange={(e) => infoChangeHandler(e)}
					value={info.fees}
					required
				/>
			</div>
		</Fragment>
	);
};

export default Profile;
