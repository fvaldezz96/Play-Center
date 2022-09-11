import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanState, getGames } from '../redux/actions';
import GamesCard from '../components/GamesCard';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';


export default function GamesContainer() {
	const dispatch = useDispatch();
	const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);
	const navigate = useNavigate();

	useEffect(() => {
		if (!dataUser || dataUser === '' || dataUser?.deleteFlag === true || dataUser.bannedFlag === true) {
			navigate('/');
		}
	}, [dataUser, navigate]);


	const allGames = useSelector(state => state.games);
	const [currentPage, setCurrentPage] = useState(0);
	const [search, setSearch] = useState('');

	useEffect(() => {
		dispatch(getGames());
		return () => {
			dispatch(cleanState());
		};
	}, [dispatch]);


	const handleChange = e => {
		setCurrentPage(0);
		setSearch(e.target.value);
	};

	const games = allGames?.filter(game => game.name.toLowerCase().includes(search.toLowerCase()));
	const paginatedGames = () => {
		return games?.slice(currentPage, currentPage + 10);
	};

	const nextPage = () => {
		if (games?.length > currentPage + 10) {
			setCurrentPage(currentPage + 10);
		}
	};

	const prevPage = () => {
		if (currentPage > 0) setCurrentPage(currentPage - 10);
	};

	let gamesToShow = paginatedGames();


	while (allGames.length < 1) {
		return (
			<div className="container text-center">
				<h1 className="text-8xl font-totifont opacity-70 text-white my-20">Play Center</h1>
				<div className="mt-10">
					<Loader />
				</div>
			</div>
		);
	}
	return (
		<div>
			<NavBar />
			<div className="container">
				<h1 className="mt-10 mb-10 mx-5 text-7xl opacity-85 font-totifont text-center text-white">GAMES</h1>
				<div className="container flex flex-col">
					<div className="max-w-md mx-24">
						<form>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<svg
										aria-hidden="true"
										className="w-5 h-5 text-gray-500 dark:text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										></path>
									</svg>
								</div>
								<input
									type="text"
									id="default-search"
									className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Search for a game..."
									required=""
									onChange={handleChange}
									value={search}
								/>
							</div>
						</form>
					</div>
					<div className="container flex flex-row items-center mt-5">
						<div className="ml-3">
							<button
								className="text-gray-800 transition duration-500 ease-in-out hover:text-white"
								onClick={prevPage}
							>
								<BsFillArrowLeftCircleFill size="40px" />
							</button>
						</div>
						<div className="container flex flex-wrap justify-center">
							{allGames &&
								gamesToShow?.map(game => {
									return <GamesCard game={game} key={game.id} />;
								})}
						</div>
						<div className="mr-3">
							<button
								className="text-gray-800 transition duration-500 ease-in-out hover:text-white"
								onClick={nextPage}
							>
								<BsFillArrowRightCircleFill size="40px" />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-12">
				<Footer />
			</div>
		</div>
	);
}
