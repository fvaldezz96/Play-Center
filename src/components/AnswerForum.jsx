import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postForumAnswers } from '../redux/actions';
import toast, { Toaster } from 'react-hot-toast';

const AnswerForum = ({ forumId, comments }) => {
	const dataUser = JSON.parse(window.localStorage.userLogged);
	const dispatch = useDispatch();
	const [value, setValue] = useState({
		idForum: forumId,
		idUser: dataUser.id,
		comment: '',
	});

	const handleSubmit = e => {
		e.preventDefault();
		if (value.comment === '') {
			alert('Please fill in all fields');
		}
		dispatch(postForumAnswers(value));
		setValue({
			idForum: forumId,
			idUser: dataUser.id,
			comment: '',
			nickname: dataUser.nickname,
		});
		toast.success('Anwser posted correctly!');
	};

	function handleOnChange(e) {
		e.preventDefault();
		setValue({ ...value, comment: e.target.value });
	}

	return (
		<div className="mx-4 justify-center p-0">
			<h3 className="mb-2 ml-14 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
				Answer this post
			</h3>
			<section>
				<form onSubmit={e => handleSubmit(e)}>
					<div className="my-4">
						<label
							htmlFor="message"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
						>
							Your Comment
						</label>
						<textarea
							placeholder="Add your comment"
							cols="50"
							rows="5"
							value={value.comment}
							onChange={e => handleOnChange(e)}
							className="max-w-xl block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						></textarea>
						<button
							type="submit"
							disabled={!value.comment}
							className="my-3 ml-32 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
						>
							<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
								Submit
							</span>
						</button>{' '}
						{/* <button
							type="submit"
							className="my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
							disabled={!value.comment}
						>
							Submit
						</button>{' '} */}
					</div>
				</form>
			</section>
			<Toaster
				position="button-right"
				reverseOrder={false}
				gutter={8}
				containerClassName=""
				containerStyle={{}}
				toastOptions={{
					className: '',
					duration: 5000,
					style: {
						background: '#363636',
						color: '#fff',
					},
					success: {
						duration: 3000,
						theme: {
							primary: 'green',
							secondary: 'black',
						},
					},
				}}
			/>
		</div>
	);
};

export default AnswerForum;
