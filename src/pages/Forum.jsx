import ContainerForum from '../components/ContainerForum';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllPosts } from '../redux/actions';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import FormForum from './FormForum';

export default function Forum() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);
	const themes = useSelector(state => state.posts);

	useEffect(() => {
		if (!dataUser || dataUser === '' || dataUser?.deleteFlag === true || dataUser.bannedFlag === true) {
			navigate('/');
		}
	}, [dataUser, navigate]);

	useEffect(() => {
		dispatch(getAllPosts());
	}, [dispatch, getAllPosts]);

	while (!themes) {
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
			<div className="container max-w-7xl p-4">
				<h1 className="my-10 mx-5 text-7xl opacity-85 font-totifont text-center text-white">Forum</h1>
				<div className="mb-10 overflow-hidden justify-between rounded shadow-lg bg-slate-400">
					<FormForum />
					<ContainerForum />
				</div>
			</div>
			<Footer />
		</div>
	);
}
