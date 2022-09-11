import React, { useEffect, useState } from 'react';
import { getRewards, cleanState } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import RewardCard from '../components/RewardCard';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import Paginate from '../components/Paginate';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

export default function Reward() {
	const dispatch = useDispatch();
	let rewards = useSelector(state => state.rewards);
	const navigate = useNavigate();
	const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);
	const [currentPage, setCurrentPage] = useState(1);
	const [rewardsPerPage] = useState(4);
	const indexOfLastreward = currentPage * rewardsPerPage;
	const indexOffirstreward = indexOfLastreward - rewardsPerPage;
	const currentReward = rewards.slice(indexOffirstreward, indexOfLastreward);
	const paginate = pageNumber => {
		setCurrentPage(pageNumber);
	};


	useEffect(() => {
		if (!dataUser || dataUser === '' || dataUser?.deleteFlag === true || dataUser.bannedFlag === true) {
			navigate('/');
		}
	}, [dataUser, navigate]);

	rewards = rewards?.filter(e => !e.deleted === true && !e.available === false);

	useEffect(() => {
		dispatch(getRewards());
		return () => {
			dispatch(cleanState());
		};
	}, [dispatch]);

	useEffect(() => {
		if (!dataUser || dataUser === '') {
			navigate('/');
		}
	}, [dataUser, navigate]);

	if (currentPage > Math.ceil(rewards?.length / rewardsPerPage) && currentPage !== 1) {
		setCurrentPage(1);
	}

	while (rewards?.length < 1) {
		return (
			<div className="container text-center">
				<h1 className="text-6xl font-totifont opacity-70 text-white my-20">Play Center</h1>
				<div className="mt-10">
					<Loader />
				</div>
			</div>
		);
	}

	return (
		<div>
			<NavBar />
			<h1 className="mt-10 mb-5 mx-5 text-6xl opacity-85 font-totifont text-center text-white">REWARDS</h1>
			<div className="container flex flex-wrap justify-center">
				{[...currentReward]?.map(re =>
					re.deleteFlag === false && re.available === true ? (
						<RewardCard
							title={re.title}
							image={re.image}
							price={re.price}
							recompenseType={re.recompenseType}
						/>
					) : (
						''
					)
				)}
			</div>
			<div className="mb-5">
				<Paginate array={rewards} thingPerPage={rewardsPerPage} paginate={paginate} />
			</div>
			<Footer />
		</div>
	);
}
