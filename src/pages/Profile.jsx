import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FavoriteGames from '../components/FavoriteGames';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, setAdmin, unsetAdmin } from '../redux/actions';
import Loader from '../components/Loader.jsx';
import FriendsForProfile from '../components/FriendsForProfile';


export default function Profile() {
	const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!dataUser || dataUser === '' || dataUser?.deleteFlag === true || dataUser.bannedFlag === true) {
			navigate('/');
		}
	}, [dataUser, navigate]);

	const { id } = useParams();
	const user = useSelector(state => state.user);

	useEffect(() => {
		dispatch(getUserById(id));
	}, [dispatch, id]);

	const userPlan = () => {
		if (user.plan) {
			return 'Premium';
		} else {
			return 'Free';
		}
	};


	while (user.id !== id) {
		return (
			<div className="container text-center">
				<h1 className="my-20 text-white text-8xl font-totifont opacity-70">Play Center</h1>
				<div className="mt-10">
					<Loader />
				</div>
			</div>
		);
	}

	return (
		<div>
			<NavBar />
			<div className="container mb-10 ">
				<h1 className="mx-5 mt-10 text-center text-white text-7xl opacity-85 font-totifont">Profile</h1>
				<div className="container max-w-5xl mt-10 overflow-hidden bg-gray-800 border border-gray-700 shadow sm:rounded-lg">
					<div className="flex flex-row items-center justify-between">
						{dataUser?.isSuperAdmin ? !user?.isAdmin ?
							(
								<button
									className="relative inline-flex items-center justify-center p-0.5 ml-5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
									onClick={() => {
										dispatch(setAdmin(user?.id));
									}}
								>
									<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
										Set Admin
									</span>
								</button>
							) :
							(
								<button
									className="relative inline-flex items-center justify-center p-0.5 ml-5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
									onClick={() => {
										dispatch(unsetAdmin(user?.id));
									}}
								>
									<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
										Unset Admin
									</span>
								</button>
							)
							: <div></div>}
						<div className="flex flex-row items-center justify-end px-4 py-5 sm:px-6">
							<div className="flex flex-col items-end">
								<h3 className="max-w-2xl mx-5 text-4xl font-semibold text-white">
									{user?.nickname ? user?.nickname : 'User not found'}
								</h3>
								{dataUser?.id === user?.id ? (
									<Link
										to={`/profile/${dataUser?.id}/edit`}
										state={dataUser}
										className="max-w-2xl mx-5 mt-3 text-sm text-slate-200 hover:text-gray-500"
									>
										Edit info
									</Link>
								) : (
									''
								)}
							</div>
							<div className="w-24 h-24 overflow-hidden border-2 border-gray-400 rounded-full">
								<img src={user?.img} className="object-cover w-full h-full" alt={user?.nickname} />
							</div>
						</div>
					</div>
					<div className="border-t border-gray-200">
						<dl>
							<div className="px-4 py-5 bg-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="font-semibold text-gray-900 text-4x1">Description</dt>
								<dd className="mt-1 ml-20 text-gray-900 text-3X1 sm:mt-0 sm:col-span-2">
									{user?.description}
								</dd>
							</div>
							<div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="font-semibold text-gray-900 text-4x1">Email</dt>
								<dd className="mt-1 ml-20 text-gray-900 text-3X1 sm:mt-0 sm:col-span-2">
									{user?.email}
								</dd>
							</div>
							<div className="px-4 py-5 bg-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="font-semibold text-gray-900 text-4x1">Plan</dt>
								<dd className="mt-1 ml-20 text-gray-900 text-3X1 sm:mt-0 sm:col-span-2">
									{userPlan()}
								</dd>
							</div>
							<div className="flex flex-row items-center px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="font-semibold text-gray-900 text-4x1">Favorite Games</dt>
								<dd className="mt-1 ml-20 text-gray-900 text-3X1 sm:mt-0 sm:col-span-2 ">
									<FavoriteGames user={user} />
								</dd>
							</div>
							<div className="px-4 py-5 bg-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="font-semibold text-gray-900 text-4x1">Server</dt>
								<dd className="mt-1 ml-20 text-gray-900 text-3X1 sm:mt-0 sm:col-span-2">
									{user?.servers && user?.servers?.length > 0
										? user?.servers
										: 'No servers found'}
								</dd>
							</div>
							<div className="flex flex-row items-center px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="font-semibold text-gray-900 text-4x1">Friends</dt>
								<dd className="mt-1 ml-20 text-gray-900 text-3X1 sm:mt-0 sm:col-span-2 ">
									<FriendsForProfile friendsIds={dataUser?.friends} id={id} user={user} />
								</dd>
							</div>
							<div className="px-4 py-5 bg-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="font-semibold text-gray-900 text-4x1">Missions Completed</dt>
								<dd className="mt-1 ml-20 text-gray-900 text-3X1 sm:mt-0 sm:col-span-2">
									{user?.missions ? user?.missions?.length : ''}
								</dd>
							</div>
							{dataUser?.id === user?.id ? (
								<div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="font-semibold text-gray-900 text-4x1">Coins</dt>
									<dd className="mt-1 ml-20 text-gray-900 text-3x1 sm:mt-0 sm:col-span-2">
										💎 {user?.coins}
									</dd>
								</div>
							) : (
								''
							)}
						</dl>
					</div>
				</div>
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);

}
