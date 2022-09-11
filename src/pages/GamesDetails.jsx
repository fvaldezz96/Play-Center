import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cleanGamesByIdState, getGamesById } from '../redux/actions';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

export default function GamesDetails() {
	const id = useParams();
	const dispatch = useDispatch();
	const details = useSelector(state => state.gamesDetails);
	const { name, image, description } = details;

	const navigate = useNavigate()

	const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);
	useEffect(() => {
		if (!dataUser || dataUser === '' || dataUser?.deleteFlag === true || dataUser.bannedFlag === true) {
			navigate('/');
		}
	}, [dataUser, navigate]);

	useEffect(() => {
		dispatch(getGamesById(id.id));
		return () => {
			dispatch(cleanGamesByIdState());
		};
	}, [dispatch, id]);

	function handleOnClick(e) {
		e.preventDefault();
		window.history.back();
	}

	while (id.id != details.id) {
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
			<div className="">
				<section className="bg-white dark:bg-gray-900">
					<div className="container px-6 py-10 mx-auto">
						<div>
							<div className="grid grid-cols-1 place-items-end mx-6">
								<a>
									<button
										onClick={e => handleOnClick(e)}
										className="relative inline-flex items-center justify-center p-0.5 ml-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg  group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
									>
										<span className="relative px-3 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-400 rounded-md group-hover:bg-opacity-0">
											<img
												className="h-8 w-8"
												src="https://cdn-icons-png.flaticon.com/512/5166/5166467.png"
												alt="Return"
											/>
										</span>
									</button>
								</a>
							</div>
							<div className="mb-20 mt-7 lg:-mx-6 lg:flex lg:items-center">
								<img
									className="object-cover object-center lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[36rem]"
									src={image}
									alt=""
								/>

								<div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
									<h1 className="text-2xl text-base font-semibold text-gray-800 dark:text-white xl:text-4xl lg:w-96">
										{name}
									</h1>

									<p className="indent-8 max-w-lg mt-6 text-justify space-x-1 space-y-1 text-gray-500 dark:text-gray-400 ">
										{description?.replace(/<[^>]*>?/gm, '')}
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<Footer />
		</div>
	);
}
