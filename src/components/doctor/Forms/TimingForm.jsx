import React, { useState, useCallback, useEffect } from 'react';
import ToggleDays from './WeekdayPicker';
import TimePicker from './TimePicker';

const TimingForm = ({ initialValue, timingIndex, clinicIndex, onChange }) => {
	const [timing, setTiming] = useState(initialValue);

	const daySelectHandler = useCallback((daysArray) => {
		setTiming((prevTiming) => {
			const updatedTiming = prevTiming;
			updatedTiming['days'] = daysArray;
			return updatedTiming;
		});
	}, []);
	const openTimeSelectHandler = useCallback((openTime) => {
		setTiming((prevTiming) => {
			const updatedTiming = prevTiming;
			const openTimeStr = JSON.stringify(openTime).slice(1, -1);
			updatedTiming['time']['open'] = openTimeStr;
			return updatedTiming;
		});
	}, []);
	const closeTimeSelectHandler = useCallback((closeTime) => {
		setTiming((prevTiming) => {
			const updatedTiming = prevTiming;
			const closeTimeStr = JSON.stringify(closeTime).slice(1, -1);
			updatedTiming['time']['close'] = closeTimeStr;
			return updatedTiming;
		});
	}, []);

	useEffect(() => {
		onChange(timing, timingIndex, clinicIndex);
	}, [onChange, timing, timingIndex, clinicIndex]);

	return (
		<div
			key={timingIndex}
			className="w-full flex justify-around items-center my-1"
		>
			<ToggleDays onSelect={daySelectHandler} daysArray={timing.days} />
			<TimePicker
				openInitial={timing.time.open}
				closeInitial={timing.time.close}
				onOpenSelect={openTimeSelectHandler}
				onCloseSelect={closeTimeSelectHandler}
			/>
		</div>
	);
};

export default TimingForm;
