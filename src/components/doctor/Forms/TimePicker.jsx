import React, { Fragment, useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';

const TimePicker = ({ openInitial = "12:00", closeInitial = "12:00", onOpenSelect, onCloseSelect }) => {
	const [openTime, setOpenTime] = useState(dayjs(`2022-04-17T${openInitial}`));
	const [closeTime, setCloseTime] = useState(dayjs(`2022-04-17T${closeInitial}`));

	const OpenTimeStatesinParent = useCallback(
		(time) => {
			onOpenSelect(time);
		},
		[onOpenSelect],
	);

	useEffect(() => {
		OpenTimeStatesinParent(
			openTime.$d.toLocaleTimeString('en-US', {
				hour12: false,
				hour: 'numeric',
				minute: 'numeric',
			}),
		);
	}, [OpenTimeStatesinParent, openTime]);

	const CloseTimeStatesinParent = useCallback(
		(time) => {
			onCloseSelect(time);
		},
		[onCloseSelect],
	);

	useEffect(() => {
		CloseTimeStatesinParent(
			closeTime.$d.toLocaleTimeString('en-US', {
				hour12: false,
				hour: 'numeric',
				minute: 'numeric',
			}),
		);
	}, [CloseTimeStatesinParent, closeTime]);

	return (
		<Fragment>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<TimeField
					label="Opens at"
					value={openTime}
					onChange={(newValue) => setOpenTime(newValue)}
					InputLabelProps={{
						style: { color: 'white' }, // Change placeholder color to white
					}}
					sx={{
						width: '100px',
						marginRight: '10px',
						backgroundColor: '#374151',
						mb: '10px',
						borderRadius: '10px',
						'& .MuiInputBase-input': {
							color: 'white', // Change text color
						},
						'& .MuiOutlinedInput-notchedOutline': {
							borderColor: '#4b5563', // Change border color
							borderRadius: '10px', // Change border radius
						},
						'&:hover .MuiOutlinedInput-notchedOutline': {
							borderColor: '#9ca3af', // Change border color on hover
						},
					}}
				/>
				<TimeField
					label="Closes at"
					value={closeTime}
					onChange={(newValue) => setCloseTime(newValue)}
					InputLabelProps={{
						style: { color: 'white' }, // Change placeholder color to white
					}}
					sx={{
						width: '100px',
						marginRight: '10px',
						backgroundColor: '#374151',
						mb: '10px',
						borderRadius: '10px',
						'& .MuiInputBase-input': {
							color: 'white', // Change text color
						},
						'& .MuiOutlinedInput-notchedOutline': {
							borderColor: '#4b5563', // Change border color
							borderRadius: '10px', // Change border radius
						},
						'&:hover .MuiOutlinedInput-notchedOutline': {
							borderColor: '#9ca3af', // Change border color on hover
						},
					}}
				/>
			</LocalizationProvider>
		</Fragment>
	);
};

export default TimePicker;
