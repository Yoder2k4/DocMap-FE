import React, { useCallback, useContext, useEffect, useState } from 'react';
import API_BASE from '../../../../utils/api_url';
import DocDetailContext from '../../../../utils/DocDetailContext';
import axios from 'axios';

const Ratings = () => {
	const [ratings, setRatings] = useState([0, 0, 0, 0, 0]);
	const [totalRatings, setTotalRatings] = useState(0);
	const { doctor } = useContext(DocDetailContext);
	const getRatings = useCallback(async () => {
		try {
			const response = await axios.get(
				API_BASE + '/review/' + doctor.doctorID,
				{ withCredentials: true },
			);
			const data = response.data;
			setTotalRatings(data.length);
			const tempRating = [0, 0, 0, 0, 0];
			data.forEach((review) => {
				tempRating[review.rating - 1]++;
			});
			setRatings(tempRating);
		} catch (err) {
			console.log(err);
		}
	}, [doctor]);

	useEffect(() => {
		getRatings();
	}, [getRatings]);
	return (
		<div className="bg-gray-800 h-40 w-11/12 rounded-xl flex">
			<div className="w-1/4 flex flex-col justify-center p-5">
				<span className="font-bold text-7xl flex justify-center items-center">
					{(
						(ratings[0] + 2*ratings[1] + 3*ratings[2] + 4*ratings[3] + 5*ratings[4]) /
						totalRatings
					).toPrecision(2)}
				</span>
				<span className="font-bold flex justify-center items-center">
					{totalRatings} Ratings
				</span>
			</div>
			<div className="flex-grow flex flex-col justify-center items-center">
				<div className="flex items-center my-1 w-full">
					<span className="w-[7%] text-sm flex items-center justify-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
						5 star
					</span>
					<div className="w-3/4 h-4 mx-4 bg-gray-200 rounded dark:bg-gray-700">
						<div
							className="h-4 bg-yellow-300 rounded"
							style={{
								width: `${Math.ceil((ratings[4] / totalRatings) * 100)}%`,
							}}
						></div>
					</div>
					<span className="text-sm font-medium text-gray-500 dark:text-gray-400">
						{Math.ceil((ratings[4] / totalRatings) * 100)}%
					</span>
				</div>
				<div className="flex items-center my-1 w-full">
					<span className="w-[7%] text-sm flex items-center justify-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
						4 star
					</span>
					<div className="w-3/4 h-4 mx-4 bg-gray-200 rounded dark:bg-gray-700">
						<div
							className="h-4 bg-yellow-300 rounded"
							style={{
								width: `${Math.ceil((ratings[3] / totalRatings) * 100)}%`,
							}}
						></div>
					</div>
					<span className="text-sm font-medium text-gray-500 dark:text-gray-400">
						{Math.ceil((ratings[3] / totalRatings) * 100)}%
					</span>
				</div>
				<div className="flex items-center my-1 w-full">
					<span className="w-[7%] text-sm flex items-center justify-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
						3 star
					</span>
					<div className="w-3/4 h-4 mx-4 bg-gray-200 rounded dark:bg-gray-700">
						<div
							className="h-4 bg-yellow-300 rounded"
							style={{
								width: `${Math.ceil((ratings[2] / totalRatings) * 100)}%`,
							}}
						></div>
					</div>
					<span className="text-sm font-medium text-gray-500 dark:text-gray-400">
						{Math.ceil((ratings[2] / totalRatings) * 100)}%
					</span>
				</div>
				<div className="flex items-center my-1 w-full">
					<span className="w-[7%] text-sm flex items-center justify-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
						1 star
					</span>
					<div className="w-3/4 h-4 mx-4 bg-gray-200 rounded dark:bg-gray-700">
						<div
							className="h-4 bg-yellow-300 rounded"
							style={{
								width: `${Math.ceil((ratings[1] / totalRatings) * 100)}%`,
							}}
						></div>
					</div>
					<span className="text-sm font-medium text-gray-500 dark:text-gray-400">
						{Math.ceil((ratings[1] / totalRatings) * 100)}%
					</span>
				</div>
				<div className="flex items-center my-1 w-full">
					<span className="w-[7%] text-sm flex items-center justify-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
						1 star
					</span>
					<div className="w-3/4 h-4 mx-4 bg-gray-200 rounded dark:bg-gray-700">
						<div
							className="h-4 bg-yellow-300 rounded"
							style={{
								width: `${Math.ceil((ratings[0] / totalRatings) * 100)}%`,
							}}
						></div>
					</div>
					<span className="text-sm font-medium text-gray-500 dark:text-gray-400">
						{Math.floor((ratings[0] / totalRatings) * 100)}%
					</span>
				</div>
			</div>
		</div>
	);
};

export default Ratings;
