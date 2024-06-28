import React, { useState } from 'react';

const API_BASE = 'http://localhost:3001';

const CommentSection = ({ reviewPosted }) => {
	const [starHover, setStarHover] = useState(0);
	const [starClick, setStarClick] = useState(0);
	const [message, setMessage] = useState('');
	const [comment, setComment] = useState('');
	const patientObj = JSON.parse(localStorage.getItem('patientObj'));
	const accID = localStorage.getItem('accID');

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`${API_BASE}/review/${patientObj.patientID}/${accID}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						rating: starClick,
						subject: message,
						reviewBody: comment,
						username: patientObj.username,
						email: patientObj.email,
					}),
				},
			);

			if (!response.ok) {
				console.log('Something in the backend went wrong!!');
				return;
			}
			const data = await response.json();
			reviewPosted(data._id);
			console.log(data);
			setStarClick(0);
			setStarHover(0);
			setMessage('');
			setComment('');
		} catch {
			console.log('Some error occured in fetch request!!');
		}
	};

	return (
		<form
			className="flex-grow px-3 w-full bg-gray-900 rounded-b-xl"
			onSubmit={submitHandler}
		>
			<div className="text-xl py-2">Leave a Review</div>
			<div>
				<label htmlFor="chat" className="sr-only">
					Your message
				</label>
				<div className="flex items-center px-3 py-2 rounded-t-lg bg-gray-700">
					<div className="flex items-center space-x-1">
						<svg
							className={`w-4 h-4 ${
								starHover >= 1 || starClick >= 1
									? 'text-yellow-300'
									: 'text-gray-300'
							}`}
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
							onMouseEnter={() => setStarHover(1)}
							onMouseLeave={() => {
								if (starClick === 0) setStarHover(0);
							}}
							onClick={() => setStarClick(1)}
						>
							<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
						</svg>
						<svg
							className={`w-4 h-4 ${
								starHover >= 2 || starClick >= 2
									? 'text-yellow-300'
									: 'text-gray-300'
							} `}
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
							onMouseEnter={() => setStarHover(2)}
							onMouseLeave={() => {
								if (starClick === 0) setStarHover(0);
							}}
							onClick={() => setStarClick(2)}
						>
							<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
						</svg>
						<svg
							className={`w-4 h-4 ${
								starHover >= 3 || starClick >= 3
									? 'text-yellow-300'
									: 'text-gray-300'
							}`}
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
							onMouseEnter={() => setStarHover(3)}
							onMouseLeave={() => {
								if (starClick === 0) setStarHover(0);
							}}
							onClick={() => setStarClick(3)}
						>
							<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
						</svg>
						<svg
							className={`w-4 h-4 ${
								starHover >= 4 || starClick >= 4
									? 'text-yellow-300'
									: 'text-gray-300'
							}`}
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
							onMouseEnter={() => setStarHover(4)}
							onMouseLeave={() => {
								if (starClick === 0) setStarHover(0);
							}}
							onClick={() => setStarClick(4)}
						>
							<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
						</svg>
						<svg
							className={`w-4 h-4 ${
								starHover >= 5 || starClick >= 5
									? 'text-yellow-300'
									: 'text-gray-300'
							}`}
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
							onMouseEnter={() => setStarHover(5)}
							onMouseLeave={() => {
								if (starClick === 0) setStarHover(0);
							}}
							onClick={() => setStarClick(5)}
						>
							<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
						</svg>
					</div>
					<textarea
						id="chat"
						rows="1"
						className="block mx-4 p-2.5 w-full text-sm rounded-lg border bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
						placeholder="Your message..."
						onChange={(e) => setMessage(e.target.value)}
						value={message}
					></textarea>
				</div>
			</div>

			<div className="w-full mb-4 border rounded-b-lg bg-gray-700 border-gray-600">
				<div className="px-4 py-2 bg-gray-800">
					<label htmlFor="comment" className="sr-only">
						Your comment
					</label>
					<textarea
						id="comment"
						rows="3"
						className="w-full px-0 text-sm border-0 bg-gray-800 focus:ring-0 text-white placeholder-gray-400"
						placeholder="Write a comment..."
						onChange={(e) => setComment(e.target.value)}
						value={comment}
					></textarea>
				</div>
				<div className="flex items-center justify-between px-3 py-2 border-t border-gray-900">
					<button
						type="submit"
						className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-900 hover:bg-blue-800"
					>
						Post comment
					</button>
				</div>
			</div>
		</form>
	);
};

export default CommentSection;
