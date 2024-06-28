import React, { useCallback, useEffect, useState } from 'react';

const API_BASE = 'http://localhost:3001';

const UploadImage = ({ imgType, imgState, imageInfoChange }) => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [imgData, setImgData] = useState(imgState);

	useEffect(() => {
		imageInfoChange(imgType, imgData);
	}, [imgData, imageInfoChange, imgType]);

	const handleUpload = useCallback(async () => {
		if (!selectedFile) {
			alert('Please select a file to upload.');
			return;
		}
		setImgData({ url: null, filename: null });
		const formData = new FormData();
		formData.append('pfp', selectedFile); // 

		try {
			const response = await fetch(API_BASE + `/doctor/uploadImg`, {
				method: 'POST',
				body: formData,
			});

			// same code using axios
			// const response = await axios.post(`${API_BASE}/doctor/uploadImg`, formData, {
			// 	headers: {
			// 		'Content-Type': 'multipart/form-data',
			// 	},
			// });

			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setImgData({ url: data.url, filename: data.filename });
			}
		} catch (error) {
			console.error('Error uploading image:', error);
		}
	}, [selectedFile]);

	useEffect(() => {
		if (selectedFile) handleUpload();
	}, [handleUpload, selectedFile]);

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	return (
		<>
			<label
				className="block mb-2 text-sm font-medium text-white"
				htmlFor="file_input"
			>
				Change {imgType === 'pfpInfo' ? 'Profile Picture' : 'Background Image'}
			</label>
			<input
				className="block w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
				type="file"
				name="pfp"
				accept="image/*"
				onChange={handleFileChange}
			/>
			{imgData.url && (
				<p className="text-green-500 flex">
					Uploaded{' '}
					<svg
						className="ml-2 w-5 text-green-400"
						ariaHidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 16 12"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M1 5.917 5.724 10.5 15 1.5"
						/>
					</svg>
				</p>
			)}
		</>
	);
};

export default UploadImage;
