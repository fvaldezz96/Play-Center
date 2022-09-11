import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchInForum } from '../redux/actions';

export default function ForumFilterByGenre({ allPosts }) {
	const dispatch = useDispatch();

	function handleOnChange(e) {
		e.preventDefault();
		dispatch(searchInForum(e.target.value));
	}

	let input = useSelector(state => state.input)

	console.log(allPosts)
	return (
		<div>
			<input
				onChange={e => handleOnChange(e)}
				type="text"
				placeholder="Search in posts"
				class="py-2 px-2 border-2 border-gray-300 rounded-2xl w-full"
				list="data"
			/>
			{
				input.length > 1 ?
					<datalist id="data">
						{allPosts?.map(e => <option key={e.id} value={e.title}></option>)}
					</datalist> : ''
			}
		</div>

	);
}
