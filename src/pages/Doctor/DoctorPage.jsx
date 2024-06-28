import React, { useState } from 'react';
import { useCallback } from 'react';
import Sidenav from '../../components/doctor/HomePage/Sidenav';
import Content from '../../components/doctor/HomePage/Content';
import { DocDetailProvider } from '../../utils/DocDetailContext';

const DoctorPage = () => {
	const [section, setSection] = useState(0);

	const sectionChangeHandler = useCallback((section) => {
		setSection(section);
	}, []);

	return (
		<DocDetailProvider>
			<div className="h-full w-full flex">
				<Sidenav changeSection={sectionChangeHandler} />
				<div className="h-full flex-grow">
					<Content section={section} />
				</div>
			</div>
		</DocDetailProvider>
	);
};

export default DoctorPage;
