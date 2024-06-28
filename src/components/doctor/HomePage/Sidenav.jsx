import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const API_BASE = 'http://localhost:3001';

const Sidenav = ({ changeSection }) => {
	const navigate = useNavigate();
	const [section, setSection] = useState(0);
	const userID = localStorage.getItem('userID');
	const loginStatus = localStorage.getItem('isLoggedIn');

	useEffect(() => {
		changeSection(section);
	}, [section, changeSection]);

	const deleteAcc = async () => {
		try {
			const response = await fetch(`${API_BASE}/doctor/${userID}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				localStorage.removeItem('userID');
				localStorage.removeItem('accID');
				localStorage.removeItem('isLoggedIn');
				navigate('/');
			} else {
				console.log('Error in response');
			}
		} catch {
			console.log('Some error deleting account');
		}
	};

	return (
		<>
			<aside
				id="default-sidebar"
				className="z-40 px-6 py-6 h-full transition-transform -translate-x-full sm:translate-x-0"
				aria-label="Sidebar"
			>
				<div className="h-full px-8 py-4 bg-gray-800 rounded-xl">
					<ul className="space-y-2 font-medium">
						<li onClick={() => setSection(0)} className="cursor-pointer">
							<span
								className={`flex items-center p-2 rounded-lg text-white group ${
									section === 0 ? 'bg-gray-950' : 'hover:bg-gray-900'
								}`}
							>
								<svg
									className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-300"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 22 21"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-300"
										enableBackground="new 0 0 32 32"
										viewBox="0 0 32 32"
										id="profile"
									>
										<circle
											cx="16"
											cy="7.46"
											r="6.96"
											transform="rotate(-9.217 16 7.46)"
										></circle>
										<path d="M0.78998,24.04999C0.78998,28.15997,4.13,31.5,8.23999,31.5h15.52002c4.10999,0,7.45001-3.34003,7.45001-7.45001s-3.34003-7.45001-7.45001-7.45001H8.23999C4.13,16.59998,0.78998,19.94,0.78998,24.04999z"></path>
									</svg>
								</svg>
								<span className="ml-3">Profile</span>
							</span>
						</li>
						<li onClick={() => setSection(1)} className="cursor-pointer">
							<span
								className={`flex items-center p-2 rounded-lg text-white group ${
									section === 1 ? 'bg-gray-950' : 'hover:bg-gray-900'
								}`}
							>
								<svg
									className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-300"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 18 18"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										data-name="Layer 1"
										viewBox="0 0 512 512"
										id="review"
									>
										<path
											fill="#ffe236"
											d="M458.31 242.318a7.27 7.27 0 0 0-2.09 6.42l10.63 61.97a7.248 7.248 0 0 1-10.52 7.64l-55.65-29.25a6.777 6.777 0 0 0-6.5 0l-40.86 21.47-14.8 7.78a7.25 7.25 0 0 1-10.52-7.64l10.63-61.97a7.236 7.236 0 0 0-2.08-6.42l-45.03-43.88a7.252 7.252 0 0 1 4.02-12.37l16.64-2.42 19.83-2.88-.02-.03 25.53-3.71a7.282 7.282 0 0 0 5.46-3.97l27.82-56.38a7.452 7.452 0 0 1 13.25 0l27.83 56.38a7.265 7.265 0 0 0 5.46 3.97l25.52 3.71-.01.03 36.46 5.3a7.25 7.25 0 0 1 4.02 12.37Z"
										></path>
										<path
											fill="#ffd00b"
											d="M503.33 198.438a7.25 7.25 0 0 0-4.02-12.37l-36.46-5.3.01-.03-25.52-3.71a7.265 7.265 0 0 1-5.46-3.97l-27.83-56.38a7.452 7.452 0 0 0-13.25 0l-2.166 4.39a7.47 7.47 0 0 1 .416.71l27.83 56.38a7.265 7.265 0 0 0 5.46 3.97l25.52 3.71-.01.03 36.46 5.3a7.25 7.25 0 0 1 4.02 12.37l-45.02 43.88a7.27 7.27 0 0 0-2.09 6.42l10.63 61.97c.012.067.01.13.02.196l4.46 2.344a7.248 7.248 0 0 0 10.52-7.64l-10.63-61.97a7.27 7.27 0 0 1 2.09-6.42Z"
										></path>
										<path
											fill="#ffe236"
											d="M175.45 242.318a7.236 7.236 0 0 0-2.08 6.42l10.63 61.97a7.25 7.25 0 0 1-10.52 7.64l-16.96-8.91-38.7-20.34a6.777 6.777 0 0 0-6.5 0l-55.65 29.25a7.248 7.248 0 0 1-10.52-7.64l10.63-61.97a7.27 7.27 0 0 0-2.09-6.42l-45.02-43.88a7.25 7.25 0 0 1 4.02-12.37l36.46-5.3-.01-.03 25.52-3.71a7.265 7.265 0 0 0 5.46-3.97l27.83-56.38a7.452 7.452 0 0 1 13.25 0l27.82 56.38a7.282 7.282 0 0 0 5.46 3.97l25.53 3.71-.02.03 17.1 2.49 19.37 2.81a7.252 7.252 0 0 1 4.02 12.37Z"
										></path>
										<path
											fill="#ffd00b"
											d="m416.2 229.038-62.1 60.52a10.018 10.018 0 0 0-2.87 8.86l2.09 12.15-14.8 7.78a7.25 7.25 0 0 1-10.52-7.64l10.63-61.97a7.236 7.236 0 0 0-2.08-6.42l-45.03-43.88a7.252 7.252 0 0 1 4.02-12.37l16.64-2.42 5.13 10.39a10.014 10.014 0 0 0 7.53 5.47l85.82 12.47a10.003 10.003 0 0 1 5.54 17.06zm-240.75 13.28a7.236 7.236 0 0 0-2.08 6.42l10.63 61.97a7.25 7.25 0 0 1-10.52 7.64l-16.96-8.91 2.19-12.75a10.01 10.01 0 0 0-2.87-8.85l-62.1-60.53a10.005 10.005 0 0 1 5.54-17.06l85.82-12.46a9.993 9.993 0 0 0 7.52-5.48l4.47-9.05 19.37 2.81a7.252 7.252 0 0 1 4.02 12.37z"
										></path>
										<path
											fill="#ffe236"
											d="m263.936 120.048 38.377 77.76a10 10 0 0 0 7.53 5.47l85.813 12.47a10 10 0 0 1 5.542 17.057l-62.095 60.527a10 10 0 0 0-2.876 8.852l14.658 85.466a10 10 0 0 1-14.51 10.542l-76.753-40.352a10 10 0 0 0-9.306 0l-76.754 40.352a10 10 0 0 1-14.51-10.542l14.66-85.466a10 10 0 0 0-2.877-8.852l-62.095-60.527a10 10 0 0 1 5.543-17.057l85.813-12.47a10 10 0 0 0 7.529-5.47l38.377-77.76a10 10 0 0 1 17.934 0Z"
										></path>
									</svg>
								</svg>
								<span className="flex-1 ml-3 whitespace-nowrap">Reviews</span>
								<span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
									Pro
								</span>
							</span>
						</li>
						{loginStatus === '1' && (
							<Fragment>
								<li onClick={() => setSection(2)} className="cursor-pointer">
									<span
										className={`flex items-center p-2 rounded-lg text-white group ${
											section === 2 ? 'bg-gray-950' : 'hover:bg-gray-900'
										}`}
									>
										<svg
											className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-300"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 100 100"
												id="schedule"
											>
												<path d="M21 14h-4v-3c0-1.1.9-2 2-2s2 .9 2 2v3zm10-3c0-1.1-.9-2-2-2s-2 .9-2 2v3h4v-3zm10 0c0-1.1-.9-2-2-2s-2 .9-2 2v3h4v-3zm10 0c0-1.1-.9-2-2-2s-2 .9-2 2v3h4v-3zm10 0c0-1.1-.9-2-2-2s-2 .9-2 2v3h4v-3zm10 0c0-1.1-.9-2-2-2s-2 .9-2 2v3h4v-3zm6 9c0-1.1-.9-2-2-2h-4v3c0 1.1-.9 2-2 2s-2-.9-2-2v-3h-6v3c0 1.1-.9 2-2 2s-2-.9-2-2v-3h-6v3c0 1.1-.9 2-2 2s-2-.9-2-2v-3h-6v3c0 1.1-.9 2-2 2s-2-.9-2-2v-3h-6v3c0 1.1-.9 2-2 2s-2-.9-2-2v-3h-6v3c0 1.1-.9 2-2 2s-2-.9-2-2v-3h-4c-1.1 0-2 .9-2 2v9h66v-9zM57 77c0 .68.04 1.34.12 2H13c-1.1 0-2-.9-2-2V33h66v26.12c-.66-.08-1.32-.12-2-.12-9.92 0-18 8.08-18 18zm0-26c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V41c0-1.1-.9-2-2-2H59c-1.1 0-2 .9-2 2v10zM31 61c0-1.1-.9-2-2-2H19c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V61zm0-20c0-1.1-.9-2-2-2H19c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V41zm20 20c0-1.1-.9-2-2-2H39c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V61zm0-20c0-1.1-.9-2-2-2H39c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V41zM21 69h6v-6h-6v6zm20 0h6v-6h-6v6zM21 49h6v-6h-6v6zm20 0h6v-6h-6v6zm26-6h-6v6h6v-6zm22 34c0 7.72-6.28 14-14 14s-14-6.28-14-14 6.28-14 14-14 14 6.28 14 14zm-6 0c0-1.1-.9-2-2-2h-4v-4c0-1.1-.9-2-2-2s-2 .9-2 2v6c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2z"></path>
											</svg>
										</svg>
										<span className="flex-1 ml-3 whitespace-nowrap">
											Appointments
										</span>
										<span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
											3
										</span>
									</span>
								</li>
								<li onClick={() => setSection(3)} className="cursor-pointer">
									<span
										className={`flex items-center p-2 rounded-lg text-white group ${
											section === 3 ? 'bg-gray-950' : 'hover:bg-gray-900'
										}`}
									>
										<svg
											className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-300"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 22 21"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												enableBackground="new 0 0 32 32"
												viewBox="0 0 32 32"
												id="edit"
											>
												<path d="M26.71002,0.94c-0.59003-0.59003-1.53003-0.59003-2.12,0L13.20001,12.32996c-0.17999,0.17004-0.29999,0.39001-0.38,0.63l-1.85999,6.21002c-0.16003,0.53003-0.01001,1.09998,0.38,1.48999c0.27997,0.29004,0.66998,0.44,1.06,0.44c0.13995,0,0.28998-0.02002,0.42999-0.06l6.20996-1.85999c0.24005-0.08002,0.46002-0.20001,0.63-0.38L31.06,7.40997C31.34003,7.13,31.5,6.75,31.5,6.34998c0-0.39996-0.15997-0.77997-0.44-1.06L26.71002,0.94z"></path>
												<path d="M30,14.5c-0.82861,0-1.5,0.67188-1.5,1.5v10c0,1.37891-1.12158,2.5-2.5,2.5H6c-1.37842,0-2.5-1.12109-2.5-2.5V6c0-1.37891,1.12158-2.5,2.5-2.5h10c0.82861,0,1.5-0.67188,1.5-1.5S16.82861,0.5,16,0.5H6C2.96729,0.5,0.5,2.96777,0.5,6v20c0,3.03223,2.46729,5.5,5.5,5.5h20c3.03271,0,5.5-2.46777,5.5-5.5V16C31.5,15.17188,30.82861,14.5,30,14.5z"></path>
											</svg>
										</svg>
										<span className="ml-3">Edit Profile</span>
									</span>
								</li>
								<li onClick={deleteAcc} className="cursor-pointer">
									<span className="flex items-center p-2 rounded-lg text-white hover:bg-gray-950 group">
										<svg
											className="w-5 text-gray-400"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 18 20"
										>
											<path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
										</svg>

										<span className="ml-3">Delete Account</span>
									</span>
								</li>
							</Fragment>
						)}
						{loginStatus === '2' && (
							<li onClick={() => setSection(4)} className="cursor-pointer">
								<span
									className={`flex items-center p-2 rounded-lg text-white group ${
										section === 4
											? 'bg-red-700'
											: 'hover:bg-red-800 bg-red-900'
									}`}
								>
									<FontAwesomeIcon
										icon="fa-solid fa-calendar-check"
										size="lg"
									/>
									<span className="ml-3">Book Appointment</span>
								</span>
							</li>
						)}
					</ul>
				</div>
			</aside>
		</>
	);
};

export default Sidenav;
