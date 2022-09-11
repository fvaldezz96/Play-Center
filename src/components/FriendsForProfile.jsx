import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFriendForChat, getAllFriends } from '../redux/actions/index';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';

export default function FriendsForProfile({ friendsIds, id, user }) {
	let friends = useSelector(state => state.friends);
	const [dataUser, setDataUser] = useState(
		!window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged)
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllFriends(dataUser.friends));
	}, [getAllFriends, dispatch]);

	const handleOnClick = (t, id, deleteFriend) => {
		t.preventDefault();
		dispatch(addFriendForChat(dataUser.id, id, deleteFriend));
	};

	const [currentPage, setCurrentPage] = useState(0);
	let favoriteGames = [];

	if (dataUser.id !== id) {
		favoriteGames = user?.friends?.map(g => friends?.filter(e => e.id === g));
	} else {
		favoriteGames = dataUser?.friends?.map(g => friends?.filter(e => e.id === g));
	}

	favoriteGames = favoriteGames?.flat(Infinity);

	const paginatedGames = () => {
		return favoriteGames?.slice(currentPage, currentPage + 1);
	};

	const nextPage = () => {
		if (favoriteGames.length > currentPage + 1) {
			setCurrentPage(currentPage + 1);
		}
	};
	const prevPage = () => {
		if (currentPage > 0) setCurrentPage(currentPage - 1);
	};

	if (favoriteGames?.length > 0) {
		return (
			<div className="container flex flex-row items-center">
				<div className="ml-1">
					<button
						className="text-gray-800 transition duration-500 ease-in-out hover:text-white"
						onClick={prevPage}
					>
						<BsFillArrowLeftCircleFill size="30px" />
					</button>
				</div>
				<div className="container flex flex-row justify-center ">
					{paginatedGames().map(e => {
						return (
							<div
								key={e.nickname}
								className=" flex flex-col justify-between w-64 h-64 m-2 overflow-hidden text-center align-middle bg-gray-800 border border-gray-700 rounded-md shadow-lg"
							>
								<img src={e.img} className="object-cover w-full h-32 rounded-t-lg " alt={e.nickname} />
								<h1 className="text-lg font-semibold text-white space-y-2.5">{e.nickname}</h1>
								{dataUser?.friends?.some(d => d === e?.id) ? (
									<a>
										<button
											className="px-6 py-2 mt-3 mx-auto mb-3 text-sm text-white rounded-lg "
											onClick={t => handleOnClick(t, e.id, 'yes')}
										>
											<img
												className="h-8 w-8"
												src="https://cdn-icons-png.flaticon.com/512/458/458594.png"
												alt="X"
											/>
										</button>
									</a>
								) : (
									''
								)}
							</div>
						);
					})}
				</div>
				<div className="mr-1">
					<button
						className="text-gray-800 transition duration-500 ease-in-out hover:text-white"
						onClick={nextPage}
					>
						<BsFillArrowRightCircleFill size="30px" />
					</button>
				</div>
			</div>
		);
	} else {
		return <div>No friends found!</div>;
	}
}
