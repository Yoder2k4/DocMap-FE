import { createContext, useCallback, useState, useEffect } from 'react';
import API_BASE from './api_url';

const DocDetailContext = createContext({});

export const DocDetailProvider = ({ children }) => {
	const [doctor, setDoctor] = useState({});
	const updateDoctor = (newValue) => {
		setDoctor(newValue);
	};
	const getDoctorDetails = useCallback(async () => {
		const accID = localStorage.getItem('accID');
		try {
			const response = await fetch(API_BASE + `/doctor/${accID}`);
			if (response.ok) {
				const data = await response.json();
				setDoctor(data);
			} else {
				console.log('Error fetching data');
			}
		} catch {
			console.log('Some error');
		}
	}, []);
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
