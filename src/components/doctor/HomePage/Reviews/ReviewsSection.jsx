import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const API_BASE = 'http://localhost:3001';

const inISTFormat = (time) => {
	const date = new Date(time);
	return date.toLocaleString('en-US', {
		timeZone: 'Asia/Kolkata',
	});
};

const ReviewSection = ({ renderer }) => {
	const [reviews, setReviews] = useState([]);
	const accID = localStorage.getItem('accID');
	const patientObj = JSON.parse(localStorage.getItem('patientObj'));

	const getReviews = useCallback(async () => {
		try {
			const response = await fetch(`${API_BASE}/review/${accID}`);
			if (!response.ok) {
				console.log('Something went wrong!!');
				return;
			}
			const data = await response.json();
			data.sort((a, b) => {
				return new Date(b.time) - new Date(a.time);
			});
			setReviews(data);
		} catch (error) {
			console.error('Fetch Error:', error);
		}
	}, [accID]);

	useEffect(() => {
		getReviews();
	}, [getReviews, renderer]);

	const deleteComment = async (id) => {
		try {
			const response = await fetch(`${API_BASE}/review/delete/${id}`, {
				method: 'DELETE',
			});
			if (!response.ok) {
				console.log('Something went wrong!!');
				return;
			}
			getReviews();
		} catch (error) {
			console.error('Fetch Error:', error);
		}
	};

	return (
		<div
			className={
				(patientObj ? 'h-[45vh] ' : 'h-[84vh] ') +
				'px-3 pt-2 w-full overflow-y-scroll no-scrollbar divide-y-2 divide-solid divide-gray-900'
			}
		>
			{reviews.length >= 0 &&
				reviews.map((review) => (
					<article key={review._id} className="py-2">
						<div className="flex items-center mb-4 space-x-4">
							<img
								className="w-10 h-10 rounded-full object-cover"
								src="https://cdn.britannica.com/47/188747-050-1D34E743/Bill-Gates-2011.jpg"
								alt=""
							/>
							<div className="space-y-1 font-medium text-white">
								<p>
									{review.username}
									<span className="block text-sm text-gray-400">
										{review.email}
									</span>
								</p>
							</div>
							{patientObj && patientObj.patientID === review.author && (
								<div
									className="text-gray-400 hover:text-white cursor-pointer"
									onClick={() => deleteComment(review._id)}
								>
									<FontAwesomeIcon icon="fa-solid fa-trash" />
								</div>
							)}
						</div>
						<div className="flex items-center mb-1">
							<svg
								className={
									'w-4 h-4 mr-1' +
									(review.rating >= 1 ? ' text-yellow-300' : ' text-gray-300')
								}
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
							<svg
								className={
									'w-4 h-4 mr-1' +
									(review.rating >= 2 ? ' text-yellow-300' : ' text-gray-300')
								}
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
							<svg
								className={
									'w-4 h-4 mr-1' +
									(review.rating >= 3 ? ' text-yellow-300' : ' text-gray-300')
								}
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
							<svg
								className={
									'w-4 h-4 mr-1' +
									(review.rating >= 4 ? ' text-yellow-300' : ' text-gray-300')
								}
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
							<svg
								className={
									'w-4 h-4 mr-1' +
									(review.rating >= 5 ? ' text-yellow-300' : ' text-gray-300')
								}
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
							<h3 className="ml-2 text-sm font-semibold text-white">
								{review.subject}
							</h3>
						</div>
						<footer className="mb-5 text-sm text-gray-400">
							<p>
								Reviewed on{' '}
								<time dateTime="2017-03-03 19:00">
									{inISTFormat(review.time)}
								</time>
							</p>
						</footer>
						<p className="mb-2 text-gray-400">{review.reviewBody}</p>
					</article>
				))}
		</div>
	);
};

export default ReviewSection;
