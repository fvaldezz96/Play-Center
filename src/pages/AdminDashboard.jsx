import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import UsersDashboard from '../components/AdminDashboard/UsersDashboard';
import NewsDashboard from '../components/AdminDashboard/NewsDashboard';
import ForumDashboard from '../components/AdminDashboard/ForumDashboard';
import UsersStats from '../components/AdminDashboard/UsersStats';
import NewsStats from '../components/AdminDashboard/NewsStats';
import ForumStats from '../components/AdminDashboard/ForumStats';
import FormNewMissionOrReward from '../components/AdminDashboard/FormNewMissionOrReward';

export default function AdminDashboard() {
	const navigate = useNavigate();
	const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);
	const [dash, setDash] = useState('GeneralStats');
	let component = null;

	useEffect(() => {
		if (!dataUser || dataUser === '' || dataUser?.deleteFlag === true || dataUser.bannedFlag === true) {
			navigate('/');
		}
	}, [dataUser, navigate]);

	if (dash === 'UsersDashboard') {
		component = <UsersDashboard />;
	} else if (dash === 'NewsDashboard') {
		component = <NewsDashboard />;
	} else if (dash === 'ForumDashboard') {
		component = <ForumDashboard />;
	} else if (dash === 'GeneralStats') {
		component = (
			<div className="container flex flex-row my-10 justify-evenly">
				<UsersStats />
				<NewsStats />
				<ForumStats />
			</div>
		);
	} else if (dash === 'FormMissionsRewards') {
		component = (
			<FormNewMissionOrReward />
		)
	}

	return (
		<div>

			<NavBar />
			<div className="container flex flex-row justify-center my-12">
				<button
					className="relative inline-flex items-center justify-center p-0.5 ml-2 overflow-hidden text-3xl font-normal text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
					onClick={() => setDash('GeneralStats')}
				>
					<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
						General Stats
					</span>
				</button>
				<button
					className="relative inline-flex items-center justify-center p-0.5 ml-2 overflow-hidden text-3xl font-normal text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
					onClick={() => setDash('UsersDashboard')}
				>
					<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
						Users
					</span>
				</button>
				<button
					className="relative inline-flex items-center justify-center p-0.5 ml-2 overflow-hidden text-3xl font-normal text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
					onClick={() => setDash('NewsDashboard')}
				>
					<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
						News
					</span>
				</button>
				<button
					className="relative inline-flex items-center justify-center p-0.5 ml-2 overflow-hidden text-3xl font-normal text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
					onClick={() => setDash('ForumDashboard')}
				>
					<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
						Forum
					</span>
				</button>
				<button
					className="relative inline-flex items-center justify-center p-0.5 ml-2 overflow-hidden text-3xl font-normal text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
					onClick={() => setDash('FormMissionsRewards')}
				>
					<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
						Missions/Rewards
					</span>
				</button>
			</div>
			{component}
			<div className="mt-80">
				<Footer />
			</div>
		</div>
	);
}
