import React, { Fragment, useCallback, useState, useContext } from 'react';
import Profile from './Profile';
import Qualifications from './Qualifications';
import Social from './Social';
import ClinicForm from '../../Forms/ClinicForm';
import UploadImage from '../../Forms/UploadImage';
import DocDetailContext from '../../../../utils/DocDetailContext';
const BASE_URL = 'http://localhost:3001';

const EditProfile = () => {
	const accID = localStorage.getItem('accID');
	const { doctor, updateDoctor } = useContext(DocDetailContext);
	const [editMenu, setEditMenu] = useState('profile');
	const [info, setInfo] = useState(doctor);
	const profileChangeHandler = (e) => {
		const { name, value } = e.target;
		setInfo((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};
	const qualChangeHandler = (index, event) => {
		const { name, value } = event.target;
		setInfo((prevData) => {
			const updatedData = { ...prevData };
			updatedData.education[index][name] = value;
			return updatedData;
		});
	};
	const addQualBtnHandler = (e) => {
		e.preventDefault();
		setInfo((prevData) => {
			const updatedData = { ...prevData };
			updatedData.education.push({ degree: '', institute: '' });
			return updatedData;
		});
	};
	const delQualBtnHandler = (index) => {
		setInfo((prevData) => {
			const updatedData = { ...prevData };
			updatedData.education.splice(index, 1);
			return updatedData;
		});
	};
	const changeSocialInfoHandler = (event) => {
		const { name, value } = event.target;
		setInfo((prevData) => {
			const updatedData = { ...prevData };
			updatedData.social[name] = value;
			return updatedData;
		});
	};
	const addClinicButtonHandler = () => {
		setInfo((prevData) => {
			const updatedData = { ...prevData };
			updatedData.clinics.push({
				place: '',
				location: '',
				timings: [
					{
						days: '',
						time: { open: '', close: '' },
					},
				],
			});
			return updatedData;
		});
	};
	const delClinicBtnHandler = (index) => {
		setInfo((prevData) => {
			const updatedData = { ...prevData };
			updatedData.clinics.splice(index, 1);
			return updatedData;
		});
	};
	const clinicInputHandler = useCallback(
		(name, value, clinicIndex, timingIndex) => {
			setInfo((prevData) => {
				const updatedData = { ...prevData };
				if (timingIndex === -1) updatedData.clinics[clinicIndex][name] = value;
				else updatedData.clinics[clinicIndex][name][timingIndex] = value;
				return updatedData;
			});
		},
		[],
	);
	const addTimingHandler = (clinicIndex) => {
		setInfo((prevData) => {
			const updatedData = { ...prevData };
			updatedData.clinics[clinicIndex].timings.push({
				days: '',
				time: { open: '', close: '' },
			});
			return updatedData;
		});
	};
	const changeTimingHandler = useCallback(
		(updatedTiming, timingIndex, clinicIndex) => {
			setInfo((prevData) => {
				const updatedData = { ...prevData };
				updatedData.clinics[clinicIndex].timings[timingIndex] = updatedTiming;
				return updatedData;
			});
		},
		[],
	);
	const imgChangeHandler = useCallback((imgType, imgInfo) => {
		setInfo((prevData) => {
			const updatedData = { ...prevData };
			updatedData.images[imgType] = imgInfo;
			return updatedData;
		});
	}, []);

	const saveChangesBtnHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(BASE_URL + `/doctor/${accID}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(info),
			});
			if (!response.ok) console.log('Error is response');
			else {
				updateDoctor(info);
			}
		} catch {
			console.log('Error in fetch');
		}
	};

	const selStyle =
		'inline-flex items-center cursor-pointer justify-center p-4 border-b-2 rounded-t-lg active text-blue-500 border-blue-500 group';
	const unselStyle =
		'inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-500 hover:text-gray-300 group cursor-pointer';
	const iSel =
		'mr-2 flex-shrink-0 w-5 h-5 transition duration-75 text-blue-500 group-hover:text-blue-500';
	const iUnsel =
		'mr-2 flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-300';

	return (
		<div className="bg-gray-800 h-full w-11/12 mt-5 mb-6 rounded-xl flex flex-col">
			<ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-400 border-b border-gray-700">
				<li className="mr-2">
					<span
						onClick={() => setEditMenu('profile')}
						className={editMenu === 'profile' ? selStyle : unselStyle}
					>
						<svg
							className={editMenu === 'profile' ? iSel : iUnsel}
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
						</svg>
						Profile
					</span>
				</li>
				<li className="mr-2">
					<span
						onClick={() => setEditMenu('images')}
						className={editMenu === 'images' ? selStyle : unselStyle}
					>
						<svg
							className={editMenu === 'images' ? iSel : iUnsel}
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
						</svg>
						Images
					</span>
				</li>
				<li className="mr-2">
					<span
						onClick={() => setEditMenu('qualifications')}
						className={editMenu === 'qualifications' ? selStyle : unselStyle}
					>
						<svg
							className={editMenu === 'qualifications' ? iSel : iUnsel}
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<svg
								id="Layer_1"
								height="20"
								viewBox="0 0 24 24"
								width="20"
								xmlns="http://www.w3.org/2000/svg"
								data-name="Layer 1"
							>
								<path d="m24 8.48v11.52a1 1 0 0 1 -2 0v-8.248l-7.4 3.536a5 5 0 0 1 -2.577.694 5.272 5.272 0 0 1 -2.7-.739l-7.38-3.513a3.691 3.691 0 0 1 -.084-6.455c.027-.016.056-.031.084-.045l7.457-3.558a5.226 5.226 0 0 1 5.282.045l7.375 3.513a3.767 3.767 0 0 1 1.943 3.25zm-11.978 9.5a7.26 7.26 0 0 1 -3.645-.972l-4.377-2.089v2.7a5.007 5.007 0 0 0 3.519 4.778 15.557 15.557 0 0 0 4.481.603 15.557 15.557 0 0 0 4.481-.607 5.007 5.007 0 0 0 3.519-4.778v-2.691l-4.459 2.13a6.983 6.983 0 0 1 -3.519.928z" />
							</svg>
						</svg>
						Qualifications
					</span>
				</li>
				<li className="mr-2">
					<span
						onClick={() => setEditMenu('socials')}
						className={editMenu === 'socials' ? selStyle : unselStyle}
					>
						<svg
							className={editMenu === 'socials' ? iSel : iUnsel}
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 18"
							fill="currentColor"
						>
							<path
								d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"
								fill="currentColor"
							/>
							<path
								d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z"
								fill="currentColor"
							/>
						</svg>
						Social
					</span>
				</li>
				<li className="mr-2">
					<span
						onClick={() => setEditMenu('clinics')}
						className={editMenu === 'clinics' ? selStyle : unselStyle}
					>
						<svg
							className={editMenu === 'clinics' ? iSel : iUnsel}
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 32 32"
							fill="currentColor"
							id="plus"
						>
							<path d="M16 0C7.164 0 0 7.164 0 16s7.164 16 16 16 16-7.164 16-16S24.836 0 16 0zm8 18h-6v6h-4v-6H8v-4h6V8h4v6h6v4z"></path>
						</svg>
						Clinics
					</span>
				</li>
			</ul>
			<div className="px-8 py-5 h-[65vh] flex flex-col overflow-y-scroll no-scrollbar">
				{editMenu === 'profile' && (
					<Profile info={info} onChange={profileChangeHandler} />
				)}
				{editMenu === 'images' && (
					<Fragment>
						<UploadImage
							imgType="pfpInfo"
							imgState={info.images.pfpInfo}
							imageInfoChange={imgChangeHandler}
						/>
						<UploadImage
							imgType="bgInfo"
							imgState={info.images.pfpInfo}
							imageInfoChange={imgChangeHandler}
						/>
					</Fragment>
				)}
				{editMenu === 'qualifications' && (
					<Qualifications
						qualifications={info.education}
						onChange={qualChangeHandler}
						addQualBtnHandler={addQualBtnHandler}
						delQualBtnHandler={delQualBtnHandler}
					/>
				)}
				{editMenu === 'socials' && (
					<Social socialInfo={info.social} onChange={changeSocialInfoHandler} />
				)}
				{editMenu === 'clinics' && (
					<div className="flex flex-col divide-y-2 divide-solid divide-gray-900">
						<ClinicForm
							clinics={info.clinics}
							addBtnHandler={addClinicButtonHandler}
							delClinicBtnHandler={delClinicBtnHandler}
							inputChangeHandler={clinicInputHandler}
							addTimingHandler={addTimingHandler}
							changeTimingHandler={changeTimingHandler}
						/>
					</div>
				)}
			</div>
			<button
				className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800 my-auto w-1/2 self-center"
				onClick={saveChangesBtnHandler}
			>
				<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full">
					Save Changes
				</span>
			</button>
		</div>
	);
};

export default EditProfile;
