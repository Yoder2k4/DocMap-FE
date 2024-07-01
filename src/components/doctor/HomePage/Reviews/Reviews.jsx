import React, { useCallback, useContext, useState } from 'react';
import ReviewSection from './ReviewsSection';
import CommentSection from './CommentSection';
import AuthContext from '../../../../utils/auth-context';

const Reviews = () => {
	const [renderer, setRenderer] = useState(0);
	const renderAgain = useCallback((length) => {
		setRenderer(length);
	}, []);
	const {isLoggedIn} = useContext(AuthContext);

	return (
		<div className="bg-gray-800 h-full w-11/12 mt-5 mb-6 rounded-xl flex flex-col">
			<ReviewSection renderer={renderer} />
			{isLoggedIn === 1 && <CommentSection reviewPosted={renderAgain} />}
		</div>
	);
};

export default Reviews;
