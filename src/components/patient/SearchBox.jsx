import React, { useEffect, useState } from 'react';
import { Dropdown } from 'flowbite-react';

const SearchBox = ({ onChange }) => {
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('name');

	useEffect(() => {
		onChange(search, filter);
	}, [onChange, filter, search]);
	return (
		<div className="flex">
			<Dropdown
				label={filter[0].toUpperCase() + filter.substring(1)}
				dismissOnClick={false}
				style={{
					borderTopLeftRadius: '8px',
					borderBottomLeftRadius: '8px',
					borderTopRightRadius: '0px',
					borderBottomRightRadius: '0px',
					width: '220px',
				}}
			>
				<Dropdown.Item onClick={() => setFilter('name')}>Name</Dropdown.Item>
				<Dropdown.Item onClick={() => setFilter('specialisation')}>
					Specialisation
				</Dropdown.Item>
			</Dropdown>
			<div className="relative w-full">
				<input
					type="search"
					id="search-dropdown"
					className="block p-2.5 w-full z-20 text-sm rounded-e-lg border-s-2 border focus:ring-blue-500 bg-gray-700 border-s-gray-700 border-gray-600 placeholder-gray-400 text-white focus:border-blue-500"
					placeholder="Search Doctor..."
					onChange={(e) => setSearch(e.target.value)}
					value={search}
				/>
			</div>
		</div>
	);
};

export default SearchBox;
