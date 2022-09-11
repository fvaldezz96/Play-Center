import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function GamesCard({ game }) {
	const [dataUser, setDataUser] = useState(JSON.parse(window.localStorage.userLogged));

	useEffect(() => {
		setDataUser(JSON.parse(window.localStorage.userLogged));
	}, [setDataUser]);

	const addFavorite = async () => {
		await axios.put(`https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`, {
			delete: false,
			favorite: game.id,
		});
		const newDataUser = await axios.get(`https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`);
		window.localStorage.setItem('userLogged', JSON.stringify(newDataUser.data));
		setDataUser(JSON.parse(window.localStorage.userLogged));
		toast.success(`${game.name} add to favorites!`);
	};

	const removeFavorite = async () => {
		await axios.put(`https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`, {
			delete: true,
			favorite: game.id,
		});
		const newDataUser = await axios.get(`https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`);
		window.localStorage.setItem('userLogged', JSON.stringify(newDataUser.data));
		setDataUser(JSON.parse(window.localStorage.userLogged));
		toast.error(`${game.name} removed from favorites!`);
	};

	return (
		<div className="flex flex-col justify-between w-64 h-64 m-2 mt-10 mb-5 overflow-hidden text-center align-middle bg-gray-800 border border-gray-700 rounded-md shadow-lg">
			<Link to={`/games/${game.id}`}>
				<img className="object-cover w-full h-32 rounded-t-lg" src={game.img} alt={game.name} />
				<br />
				<h2 className="text-lg font-semibold text-white space-y-2.5">{game.name}</h2>
			</Link>
			{dataUser.favoriteGames.includes(game.id) ? (
				<button
					className="px-6 py-2 mt-3 mx-auto mb-3 text-sm text-white bg-red-600 rounded-lg hover:bg-red-800"
					onClick={removeFavorite}
				>
					Remove Favorite
				</button>
			) : (
				<button
					className="px-6 py-2 mt-3 mx-auto mb-3 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-800"
					onClick={addFavorite}
				>
					Add Favorite
				</button>
			)}
			<Toaster
				position="button-right"
				reverseOrder={false}
				gutter={8}
				containerClassName=""
				containerStyle={{}}
				toastOptions={{
					className: '',
					duration: 5000,
					style: {
						background: '#363636',
						color: '#fff',
					},
					success: {
						duration: 3000,
						theme: {
							primary: 'green',
							secondary: 'black',
						},
					},
				}}
			/>
		</div>
	);
}
