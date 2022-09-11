import Footer from '../components/Footer';
import Slider from '../components/Slider';
import NewsContainer from '../components/NewsContainer';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useEffect } from 'react';
import BannerSubscription from '../components/BannerSubscription';

export default function Home() {
	let navigate = useNavigate();
	const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);

	useEffect(() => {
		if (!dataUser || dataUser === '' || dataUser?.deleteFlag === true || dataUser.bannedFlag === true) {
			navigate('/');
		}
	}, [dataUser, navigate]);

	return (
		<div>
			<NavBar />
			{!dataUser?.plan ? <BannerSubscription /> : <></>}
			<Slider />
			<NewsContainer />
			<Footer />
		</div>
	);
}
