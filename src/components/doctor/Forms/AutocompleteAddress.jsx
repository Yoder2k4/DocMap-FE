import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const API_KEY = 'fb1725b059fd44308deefe5ba3854e50';

const AddressAutocomplete = ({ inputHandle }) => {
	const [inputValue, setInputValue] = useState('');
	const [suggestions, setSuggestions] = useState([]);

	const handleInputChange = async (value) => {
		setInputValue(value);
		if (value) {
			try {
				const response = await axios.get(
					`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=${API_KEY}`,
				);
				setSuggestions(() => response.data.features);
			} catch (error) {
				console.error('Error fetching autocomplete suggestions:', error);
			}
		} else {
			setSuggestions([]);
		}
	};

	const optionSelectedHandler = (newValue) => {
		inputHandle(newValue);
	};

	return (
		<span>
			<Autocomplete
				options={suggestions}
				getOptionLabel={(option) => option.properties.formatted}
				inputValue={inputValue}
				onInputChange={(event, newValue) => handleInputChange(newValue)}
				onChange={(newValue, data) => optionSelectedHandler(data)}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Enter an address"
						sx={{
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
				)}
				sx={{
					width: '20rem',
					display: 'inline-flex',
					backgroundColor: '#374151',
					borderColor: '#4b5563', // Change border color
					borderRadius: '10px', // Change border radius
				}}
			/>
		</span>
	);
};

export default AddressAutocomplete;
