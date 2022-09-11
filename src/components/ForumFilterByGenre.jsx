import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, orderByGenres } from '../redux/actions';

export default function ForumFilterByGenre() {
	const dispatch = useDispatch();

	function handleOnChange(e) {
		e.preventDefault();
		dispatch(orderByGenres(e.target.value));
	}
	useEffect(() => {
		dispatch(getGenres())
	}, [dispatch, getGenres])

	const allGenres = useSelector(state => state.genres);

	return (
		<select
			onChange={e => handleOnChange(e)}
			className="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		>
			<option hidden>Filter by genre</option>
			<option value="all">All genres</option>
			{allGenres?.map(e => {
				return (
					<option key={e.id} value={e.name}>{e.name}</option>
				)
			})

			}

		</select>
	);
}
