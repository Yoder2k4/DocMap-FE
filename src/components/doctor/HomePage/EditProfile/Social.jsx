import React, { Fragment } from 'react';

const Social = ({socialInfo, onChange}) => {
	return (
		<Fragment>
			<div className="mb-5">
				<label
					htmlFor="contact"
					className="block mb-2 text-sm font-medium text-white"
				>
					Contact Number
				</label>
				<input
					type="number"
					name="contact"
					id="contact"
					className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
					placeholder="Enter your contact no."
					onChange={onChange}
					value={socialInfo.contact}
					required
				/>
			</div>
			<div className="mb-5">
				<label
					htmlFor="contactMail"
					className="block mb-2 text-sm font-medium text-white"
				>
					Contact Mail
				</label>
				<input
					type="text"
					id="contactMail"
					name="contactMail"
					className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
					placeholder="Enter your contact email"
					onChange={onChange}
					value={socialInfo.contactMail}
					required
				/>
			</div>
			<div className="mb-5">
				<label
					htmlFor="facebook"
					className="block mb-2 text-sm font-medium text-white"
				>
					Facebook URL
				</label>
				<input
					type="text"
					id="facebook"
					name="facebook"
					className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
					placeholder="Enter your Facebook URL"
					onChange={onChange}
					value={socialInfo.facebook}
					required
				/>
			</div>
			<div className="mb-5">
				<label
					htmlFor="linkedin"
					className="block mb-2 text-sm font-medium text-white"
				>
					LinkedIn URL
				</label>
				<input
					type="text"
					id="linkedin"
					name="linkedin"
					className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
					placeholder="Enter your LinkedIn URL"
					onChange={onChange}
					value={socialInfo.linkedin}
					required
				/>
			</div>
			<div className="mb-5">
				<label
					htmlFor="twitter"
					className="block mb-2 text-sm font-medium text-white"
				>
					Twitter URL
				</label>
				<input
					type="text"
					id="twitter"
					name="twitter"
					className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
					placeholder="Enter your Twitter URL"
					onChange={onChange}
					value={socialInfo.twitter}
					required
				/>
			</div>
		</Fragment>
	);
};

export default Social;
