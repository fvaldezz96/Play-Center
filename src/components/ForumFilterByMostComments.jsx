import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByComments } from '../redux/actions';

export default function ForumFilterByMostComments() {
	const dispatch = useDispatch();

	function handleOnChange(e) {
		e.preventDefault();
		dispatch(orderByComments(e.target.value));
	}

	return (
		<select
			onChange={e => handleOnChange(e)}
			className="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		>
			<option hidden>Order by amount of comments</option>
			<option value="most">Order by most comments</option>
			<option value="less">Order by less comments</option>
		</select>
	);
}
