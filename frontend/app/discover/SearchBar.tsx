import React from 'react';

export default function SearchBar({ value }: { value: string }) {
	return (
		<div>
			<input type='text' value={value} />
		</div>
	);
}
