import React, { useEffect, useState } from 'react';

const DoctorEduForm = ({ onChange }) => {
	const [education, setEducation] = useState([{ degree: '', institution: '' }]);

	const addDegreeBtnHandler = (e) => {
		e.preventDefault();
		setEducation([...education, { degree: '', institution: '' }]);
	};

	const handleInputChange = (index, event) => {
		setEducation((prevData) => {
			const updatedData = [...prevData];
			updatedData[index][event.target.name] = event.target.value;
			return updatedData;
		});
	};

	useEffect(() => {
		onChange(education);
	}, [education, onChange]);

	return (
		<div id="addInfo">
			{education.map((field, index) => (
				<div key={index}>
					<label htmlFor="degree">Degree</label>
					<input
						type="text"
						id={`degree[${index}]`}
						name="degree"
						onChange={(event) => handleInputChange(index, event)}
						value={field.degree}
						className='text-black'
					/>
					<label htmlFor="institution">Institution</label>
					<input
						type="text"
						id={`institution[${index}]`}
						name="institution"
						onChange={(event) => handleInputChange(index, event)}
						value={field.institution}
						className='text-black'
					/>
				</div>
			))}
			<button onClick={addDegreeBtnHandler}>Add Degree</button>
		</div>
	);
};

export default DoctorEduForm;
