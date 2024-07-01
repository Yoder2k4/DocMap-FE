import { createContext, useCallback, useState, useEffect } from 'react';
import API_BASE from './api_url';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const DocDetailContext = createContext({});

export const DocDetailProvider = ({ children }) => {
	const [doctor, setDoctor] = useState({});
	const updateDoctor = (newValue) => {
		setDoctor(newValue);
	};
	const {state} = useLocation();
	const getDoctorDetails = useCallback(async () => {
		try {
			if(state) {
				const response = await axios.get(API_BASE + `/patient/doctor/${state.doctorID}`, {withCredentials: true});
				setDoctor(response.data);
			}
			else {
				console.log("doctor detail fetch");
				const response = await axios.get(API_BASE + '/doctor/doctorData', {withCredentials: true});
				setDoctor(response.data);
			}
			
		} catch(err) {
			console.log('Some error' + err.message);
		}
	}, [state]);
	useEffect(() => {
		getDoctorDetails();
	}, [getDoctorDetails]);

	return (
		<DocDetailContext.Provider value={{ doctor, updateDoctor }}>
			{children}
		</DocDetailContext.Provider>
	);
};

export default DocDetailContext;
