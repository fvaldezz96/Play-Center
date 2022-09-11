import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Paginate from './Paginate';
import ForumFilterByMostComments from '../components/ForumFilterByMostComments';
import ForumFilterByGenre from './ForumFilterByGenre';
import SearchBarForum from './SearchBarForum';

export default function ContainerForum() {
	const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);
	const themes = useSelector(state => state.posts);
	const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage] = useState(12);
	const indexOfLastPost = currentPage * postPerPage;
	const indexOfFirstPost = indexOfLastPost - postPerPage;
	const currentPost = themes?.slice(indexOfFirstPost, indexOfLastPost);
	const paginate = pageNumber => {
		setCurrentPage(pageNumber);
	};
	const navigate = useNavigate();
	if (currentPage > Math.ceil(themes?.length / postPerPage) && currentPage !== 1) {
		setCurrentPage(1);
	}
	function handleOnClick(e, postId) {
		e.preventDefault();
		navigate(`/postDetails/${postId}`);
	}

	return (
		<div>
			<div className="flex flex-row mx-5 my-3">
				<div className="flex flex-row justify-between"><ForumFilterByMostComments /></div>
				<div className="flex flex-row justify-between mx-5"><ForumFilterByGenre /></div>
				<div className="flex flex-row justify-between mx-5"><SearchBarForum allPosts={themes} /></div>
			</div>
			<table className="w-full text-left table-auto text-md">
				<thead className="text-gray-400 uppercase bg-gray-700">
					<tr>
						<th scope="col" className="px-6 py-3">
							Subject
						</th>
						<th scope="col" className="px-6 py-3 text-center">
							Author
						</th>
						<th scope="col" className="px-6 py-3 text-center">
							Comments
						</th>
						<th scope="col" className="px-6 py-3 text-center">
							Date
						</th>
						<th scope="col" className="px-6 py-3 text-center">
							Genre
						</th>
					</tr>
				</thead>

				{currentPost?.length > 0
					? currentPost?.map((post, index) => {
						return (
							<thead key={post.id}>
								{post?.deleteFlag === true ? (
									<tr></tr>
								) : (
									<tr className="bg-gray-800 border-b border-gray-700">
										<th
											scope="row"
											className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											<button onClick={e => handleOnClick(e, post.id)}>
												{post.title.length <= 16
													? post.title
													: post.title.slice(0, 16) + '...'}
											</button>
										</th>
										<td className="px-6 py-3 text-center text-gray-500">
											{post.user !== null ? post.user.nickname : 'Unknown user'}
										</td>
										<td className="px-6 py-3 text-center text-gray-500">
											{post.answers.length > 0 ? post.answers.length : 0}
										</td>
										<td className="px-6 py-3 text-center text-gray-500">
											{post?.createdAt?.split('T')[0]}
										</td>
										<td className="px-6 py-3 text-center text-gray-500">{post?.genre}</td>
									</tr>
								)}
							</thead>
						);
					})
					: ''}
			</table>
			<div className="mt-5">
				<Paginate thingPerPage={postPerPage} array={themes} paginate={paginate} />
			</div>
		</div>
	);
}
