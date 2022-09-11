import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { editPost, getForum, getGenres, postForum, cleanForumEdit, getUserById } from '../redux/actions';
// import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export default function FormForum() {
	const navigate = useNavigate();
	let dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserById(dataUser.id))
	}, [getUserById, dispatch]);

	let user = useSelector(state => state.user)

	useEffect(() => {
		if (!dataUser || dataUser === '' || dataUser?.deleteFlag === true || dataUser.bannedFlag === true || user?.bannedFlag === true || user?.deleteFlag === true) {
			navigate('/');
		}
	}, [dataUser, navigate, user]);


	let id = useParams();

	const allGenres = useSelector(state => state.genres);

	useEffect(() => {
		if (id) {
			dispatch(getForum(id));
		}
		return () => {
			dispatch(cleanForumEdit());
		};
	}, [dispatch]);

	let postById = useSelector(state => state.forumById);

	const [input, setInput] = useState({
		userId: dataUser.id,
		nickname: dataUser.nickname,
		text: !id?.id ? '' : postById.text,
		title: !id?.id ? '' : postById.title,
		genre: !id?.id ? '' : postById.genre,
	});

	function handleOnChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	}

	function handleOnSubmit(e) {
		e.preventDefault();
		dispatch(getUserById(dataUser.id))
		dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);
		if (dataUser || !dataUser === '' || dataUser?.deleteFlag === false || dataUser.bannedFlag === false || user?.bannedFlag === false || user?.deleteFlag === false) {
			if (!id.id) {
				dispatch(postForum(input));

			} else {
				dispatch(editPost(id.id, input));

				setInput({
					userId: dataUser.id,
					nickname: dataUser.nickname,
					text: '',
					title: '',
					genre: '',
				});
				navigate(`/postDetails/${id.id}`);
			}
		}
		dispatch(getUserById(dataUser.id))
		dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);
		setNewPost(false);
	}

	function handleCancel(e) {
		e.preventDefault();
		setInput({
			userId: dataUser.id,
			nickname: dataUser.nickname,
			text: '',
			title: '',
			genre: '',
		});
		if (!id.id) {
			setNewPost(false);
		} else {
			navigate(`/postDetails/${id.id}`);
		}
	}

	useEffect(() => {
		dispatch(getGenres());
	}, [dispatch]);

	const [newPost, setNewPost] = useState(false);

	function handleOnChangeGenre(e) {
		setInput({
			...input,
			genre: e.target.value,
		});
	}

	return (
		<div>
			{newPost === false && !id.id ? (
				<div className="my-5 mx-3 items-center">
					<button
						type="button"
						onClick={e => setNewPost(true)}
						className="relative inline-flex items-center justify-center p-0.5 ml-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
					>
						<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
							New Post
						</span>
					</button>
				</div>
			) : (
				<div className="p-8">
					<form onSubmit={e => handleOnSubmit(e)}>
						<div className=" flex w-1/2 ">
							<div className="mr-6 ml-30">
								<label
									htmlFor="message"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
								>
									Forum Title
								</label>
								<input
									className="max-w-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									type="text"
									placeholder="Title"
									name="title"
									value={input.title}
									onChange={e => handleOnChange(e)}
								/>
							</div>

							<div className="w-fit ml-48">
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
									Choose a genre:
								</label>
								<select
									onChange={e => handleOnChangeGenre(e)}
									className="block p-2.5 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								>
									<option hidden>Choose a genre</option>
									{allGenres.map((genre, i) => {
										return (
											<option key={i} value={i.name}>
												{genre.name}
											</option>
										);
									})}
								</select>
							</div>
						</div>

						<div className="my-12">
							<label
								htmlFor="message"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
							>
								Your message
							</label>
							<textarea
								name="text"
								value={input.text}
								onChange={e => handleOnChange(e)}
								cols="50"
								rows="5"
								className="max-w-xl block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Leave a comment..."
							></textarea>
						</div>
						<div className="ml-40">
							<button
								type="submit"
								disabled={!input.text || !input.title || !input.genre}
								className="relative inline-flex items-center justify-center p-0.5 ml-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
							>
								<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
									Submit
								</span>
							</button>
							<button
								onClick={e => handleCancel(e)}
								className="relative inline-flex items-center justify-center p-0.5 ml-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
							>
								<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
									{!id.id ? 'Cancel new post' : 'Cancel edit post'}
								</span>
							</button>
						</div>
					</form>
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
			)}
		</div>
	);
}
