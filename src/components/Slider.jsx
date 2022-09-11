import React, { useState } from 'react';

const gamesSlider = [
	{
		id: 3498,
		name: 'Grand Theft Auto V',
		img: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
	},
	{
		id: 3328,
		name: 'Rise of the Tomb Raider',
		img: 'https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg',
	},
	{
		id: 4291,
		name: 'Payday 2',
		img: 'https://media.rawg.io/media/games/73e/73eecb8909e0c39fb246f457b5d6cbbe.jpg',
	},
	{
		id: 5679,
		name: 'The Elder Scrolls V: Skyrim',
		img: 'https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg',
	},
	{
		id: 5680,
		name: 'Destiny 2',
		img: 'https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg',
	},
	{
		id: 60,
		name: 'ads 01',
		img: 'https://cdn.memorykings.pe/files/2022/03/26/325854-MK026454-GRANDE.jpg',
	},
	{
		id: 61,
		name: 'ads 02',
		img: 'https://images-eu.ssl-images-amazon.com/images/G/30/CE/Electronica/PC2018/murclara/amazon-banner-gaming-days_1.png',
	},
	{
		id: 62,
		name: 'ads 03',
		img: 'https://mesajil.com/wp-content/uploads/elementor/thumbs/Banner-Desktop-Sorteo-Cougar-SillaCase-1-pfxuu8hr2ksftp8338ji2fjmenpws04vzfus93xsvk.jpg',
	},
	{
		id: 63,
		name: 'ads 04',
		img: 'https://www.cm-soluciones.com.ar/static/media/banner-4.c5f21dec.jpeg',
	},
	{
		id: 64,
		name: 'ads 05',
		img: 'https://www.lg.com/ar/images/plp-b2c/b2c-2/banner-webD.jpg',
	},
];

export default function Slider() {
	const [game, setGame] = useState(Math.floor(Math.random() * 5));
	const [ad, setAd] = useState(Math.floor(Math.random() * 10));
	const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);

	if (dataUser.plan === true) {
		return (
			<div className="container mt-5">
				<div className="relative h-56 overflow-hidden rounded-lg md:h-96">
					<div className="ease-in-out" key={gamesSlider[game].id}>
						<img
							src={gamesSlider[game].img}
							className="absolute block object-cover w-full"
							alt={gamesSlider[game].name}
						/>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="container mt-5">
				<div className="relative h-56 overflow-hidden rounded-lg md:h-96">
					<div className="ease-in-out" key={gamesSlider[ad].id}>
						<img
							src={gamesSlider[ad].img}
							className="absolute block object-cover w-full"
							alt={gamesSlider[ad].name}
						/>
					</div>
				</div>
			</div>
		);
	}
}
