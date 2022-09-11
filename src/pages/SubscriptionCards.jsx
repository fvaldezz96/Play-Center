import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function SubscriptionCards() {
	const navigate = useNavigate();
	const amount = 5;
	const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);

	useEffect(() => {
		if (!dataUser || dataUser === '' || dataUser?.deleteFlag === true || dataUser.bannedFlag === true) {
			navigate('/');
		}
	}, [dataUser, navigate]);

	return (
		<div>
			<NavBar />
			<div className="container">
				<h1 className="my-10 mx-5 text-7xl opacity-85 font-totifont text-center text-white">Subscription</h1>
				<div className="container px-6 py-8 mx-auto">
					<div className="flex flex-col items-center justify-center space-y-8 lg:-mx-4 lg:flex-row lg:items-stretch lg:space-y-0">
						<div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-800 dark:border-gray-700">
							<div className="flex-shrink-0">
								<h2 className="inline-flex items-center justify-center px-2 font-semibold tracking-tight text-blue-400 uppercase rounded-lg bg-gray-50 dark:bg-gray-700">
									Casual
								</h2>
							</div>
							<div className="flex-shrink-0">
								<span className="pt-2 text-4xl font-bold text-gray-800 uppercase dark:text-gray-100">
									Free
								</span>
							</div>
							<ul className="flex-1 space-y-4">
								<li className="text-gray-500 dark:text-gray-400">Create a profile</li>
								<li className="text-gray-500 dark:text-gray-400">Match users</li>
								<li className="text-gray-500 dark:text-gray-400">Missions</li>
								<li className="text-gray-500 dark:text-gray-400">Access to all news</li>
								<li className="text-gray-500 dark:text-gray-400">
									Create posts and participate in the forum
								</li>
							</ul>
						</div>

						<div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-800 dark:border-gray-700">
							<div className="flex-shrink-0">
								<h2 className="inline-flex items-center justify-center px-2 font-semibold tracking-tight text-blue-400 uppercase rounded-lg bg-gray-50 dark:bg-gray-700">
									Premium
								</h2>
							</div>
							<div className="flex-shrink-0">
								<span className="pt-2 text-4xl font-bold text-gray-800 uppercase dark:text-gray-100">
									${amount}
								</span>
								<span className="text-gray-500 dark:text-gray-400">/month</span>
							</div>
							<ul className="flex-1 space-y-4">
								<li className="text-gray-500 dark:text-gray-400">No publicity</li>
								<li className="text-gray-500 dark:text-gray-400">x3 coins rewards</li>
								<li className="text-gray-500 dark:text-gray-400">
									And all the included on casual plan
								</li>
							</ul>
							<Link
								to="/payment"
								className="inline-flex items-center justify-center px-4 py-2 font-semibold text-white uppercase transition-colors bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none"
								state={amount}
							>
								Start
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-20">
				<Footer />
			</div>
		</div>
	);
}
