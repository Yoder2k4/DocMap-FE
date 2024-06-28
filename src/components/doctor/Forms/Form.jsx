import React, { Fragment, useEffect, useState } from 'react';

const DoctorForm = ({ onChange }) => {
	const [info, setInfo] = useState({
		name: '',
		experience: '',
		specialisation: '',
		fees: '',
	});

	const infoChangeHandler = (e) => {
		const { name, value } = e.target;
		setInfo((prevInfo) => ({
			...prevInfo,
			[name]: value,
		}));
	};

	useEffect(() => {
		onChange(info);
	}, [onChange, info]);

	return (
		<Fragment>
			<input
				type="text"
				id="name"
				name="name"
				onChange={infoChangeHandler}
				value={info.name}
				className="text-black"
			/>
			<label htmlFor="name">Name</label>
			<br />
			<input
				type="number"
				name="experience"
				id="experience"
				onChange={infoChangeHandler}
				value={info.experience}
				className="text-black"
			/>
			<label htmlFor="experience">Years of Experience</label>
			<br />
			<input
				type="text"
				id="specialisation"
				name="specialisation"
				onChange={infoChangeHandler}
				value={info.specialisation}
				className="text-black"
			/>
			<label htmlFor="specialisation">Specialisation</label>
			<br />
			<input
				type="number"
				name="fees"
				id="fees"
				onChange={infoChangeHandler}
				value={info.fees}
				className="text-black"
			/>
			<label htmlFor="fees">Fees</label>
		</Fragment>
	);
};

export default DoctorForm;
