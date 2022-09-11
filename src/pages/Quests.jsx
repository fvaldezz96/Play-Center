import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import QuestCard from '../components/Quests/QuestCard';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { getAllMissions } from '../redux/actions';

const Quests = () => {
	// const dispatch = useDispatch();
	// const quests = useSelector((state) => state.mission);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);

	useEffect(() => {
		if (!dataUser || dataUser === '' || dataUser?.deleteFlag === true || dataUser.bannedFlag === true) {
			navigate('/');
		}
	}, [dataUser, navigate]);



	useEffect(() => {
		dispatch(getAllMissions())

	}, [getAllMissions]);

	let allMissions = useSelector(state => state.missions)

	while (allMissions.length < 1) {
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
			<div className="text-sm bg-indigo-900 text-slate-100 mb-16">
				<div className="container mb-10">
					<h1 className="mx-5 mt-10 text-center text-white text-7xl opacity-85 font-totifont">Quests</h1>
				</div>
				{allMissions?.length === 0 ? (
					<div className="container mb-10">
						<h3 className="mx-5 mt-20 text-3xl text-center text-white opacity-85 font-totifont">
							No quests left
						</h3>
					</div>
				) : (
					<div className="container">
						{allMissions?.map(mission => {

							return <QuestCard mission={mission} missionsCompletedByUser={dataUser.missions} key={mission.id} />;
						})}
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default Quests;
