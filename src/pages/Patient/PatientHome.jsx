import React, { Fragment, useCallback, useEffect, useState } from 'react';
import SearchBox from '../../components/patient/SearchBox';
import MapContainer from '../../components/patient/MapContainer';
import SuggestionsBox from '../../components/patient/SuggestionsBox';
import ClinicTooltip from '../../components/patient/ClinicTooltip';

const API_BASE = 'http://localhost:3001';

const PatientHome = () => {
	const [viewPort, setViewPort] = useState({
		latitude: 22.5726,
		longitude: 88.3639,
		zoom: 12,
		pitch: 100,
	});
	const [doctorData, setdoctorData] = useState([]);
	const [locInfo, setLocInfo] = useState([]);
	const [suggestions, setSuggestions] = useState([]);
	const [markerIndex, setMarkerIndex] = useState(-1);

	// Get doctors list from server
	const getLocations = useCallback(async () => {
		const response = await fetch(API_BASE + '/patient/user');

		if (!response.ok) {
			console.log(`Something went wrong in ${API_BASE} + '/patient/user'`);
		}

		const data = await response.json();
		setdoctorData(data);
	}, []);
	useEffect(() => {
		getLocations();
	}, [getLocations]);

	// Make array for markers
	useEffect(() => {
		if (doctorData.length > 0)
			doctorData.forEach((doctor) => {
				doctor.clinics.forEach((clinic) => {
					const obj = JSON.parse(clinic.location);
					setLocInfo((prev) => [
						...prev,
						{
							lon: obj.geometry.coordinates[0],
							lat: obj.geometry.coordinates[1],
							place: clinic.place,
							timings: clinic.timings,
							info: doctor,
						},
					]);
				});
			});
	}, [doctorData]);

	// search doctor
	const searchDoctorHandler = useCallback(
		(searchString, filter) => {
			if (searchString.length === 0) {
				setSuggestions([]);
				return;
			}
			const filteredItems = [];
			const reqField = searchString.toLowerCase();
			locInfo.forEach((loc) => {
				const searchField = loc.info[filter].toLowerCase();
				if (searchField.includes(reqField)) {
					const obj = {
						info: loc.info,
						place: loc.place,
						lon: loc.lon,
						lat: loc.lat,
					};
					filteredItems.push(obj);
				}
			});
			setSuggestions(filteredItems);
		},
		[locInfo],
	);

	// Change viewport when hovered in search results
	const changeViewPortHandler = (lat, lon) => {
		setViewPort((prevData) => {
			return {
				...prevData,
				latitude: lat,
				longitude: lon,
			};
		});
	};

	// Change viewport and focus on marker when clicked on marker
	const focusOnMarkerHandler = (index) => {
		setMarkerIndex(index);
		setViewPort((prevData) => {
			return {
				...prevData,
				latitude: locInfo[index].lat,
				longitude: locInfo[index].lon,
			};
		});
	};

	return (
		<Fragment>
			<div className="w-[33vw] max-h-[90.8vh] p-5 absolute z-20 flex flex-col">
				<SearchBox onChange={searchDoctorHandler} />
				{suggestions.length > 0 && (
					<SuggestionsBox
						suggestions={suggestions}
						changeViewPort={changeViewPortHandler}
					/>
				)}
			</div>
			{markerIndex !== -1 && <ClinicTooltip markerInfo={locInfo[markerIndex]} />}
			<div className="w-full h-[90.8vh]">
				<MapContainer
					markerIndex={markerIndex}
					locInfo={locInfo}
					viewPort={viewPort}
					onviewPortChange={(vp) => {
						setViewPort(vp);
						if (markerIndex !== -1) setMarkerIndex(-1);
					}}
					focusOnMarker={focusOnMarkerHandler}
				/>
			</div>
		</Fragment>
	);
};

export default PatientHome;
