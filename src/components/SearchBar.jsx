import React, { useEffect, useState } from 'react';
import { getAllNews, searchBarsearch } from '../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';

export default function Search() {
	const dispatch = useDispatch();
	const [, setTitle] = useState('');
	const allNews = useSelector(state => state.allNews);

	useEffect(() => {
		dispatch(getAllNews());
	}, [dispatch]);

	function handleOnChange(e) {
		e.preventDefault();
		setTitle(e.target.value);
		dispatch(searchBarsearch(e.target.value));
	}

	return (
		<div className="flex items-center justify-center text-sm font-medium">
			<div className="px-2 py-5 flex items-center justify-between">
				<input
					type="text"
					className="max-w-md -mx-2 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
					placeholder="Search for a news"
					onChange={handleOnChange}
					list="data"
					id="inputSearch"
				/>
				<datalist id="data">
					{typeof allNews === 'object' ? allNews?.map(e => <option key={e.id} value={e.title}></option>) : ''}
				</datalist>
			</div>
		</div>
	);
}
