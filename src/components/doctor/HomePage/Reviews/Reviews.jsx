import React, { useCallback, useState } from 'react';
import ReviewSection from './ReviewsSection';
import CommentSection from './CommentSection';

const Reviews = () => {
	const [renderer, setRenderer] = useState(0);
	const renderAgain = useCallback((length) => {
		setRenderer(length);
	}, []);
	const loginStatus = localStorage.getItem('isLoggedIn');

	return (
		<div className="bg-gray-800 h-full w-11/12 mt-5 mb-6 rounded-xl flex flex-col">
			<ReviewSection renderer={renderer} />
			{loginStatus === '2' && <CommentSection reviewPosted={renderAgain} />}
		</div>
	);
};

export default Reviews;
