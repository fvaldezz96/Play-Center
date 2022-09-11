import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const cardElementOptions = {
	style: {
		base: {
			backgroundColor: 'transparent',
			iconColor: 'grey',
			color: 'white',
			fontWeight: '400',
			fontSize: '18px',
			fontSmoothing: 'antialiased',
			':-webkit-autofill': {
				color: 'black',
			},
			'::placeholder': {
				color: 'grey',
			},
		},
		invalid: {
			iconColor: 'red',
			color: 'red',
		},
	},
};

export default function PaymentStripe() {
	const navigate = useNavigate();
	const location = useLocation();
	const stripe = useStripe();
	const elements = useElements();
	const amount = location.state;
	const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);

	useEffect(() => {
		if (!dataUser || dataUser === '' || dataUser?.deleteFlag === true || dataUser.bannedFlag === true) {
			navigate('/');
		}
	}, [dataUser, navigate]);

	const handleSubmit = async e => {
		e.preventDefault();

		await Swal.fire({
			title: 'Are you sure?',
			showCancelButton: true,
			confirmButtonColor: '#28a745',
			cancelButtonColor: '#dc3545',
			confirmButtonText: 'Yes, do it!',
			imageUrl: 'https://i.pinimg.com/originals/ee/4d/b5/ee4db5b0318bc313e4a3f9fd26e4a9e1.gif',
			imageHeight: '200px',
			imageWidth: '200px',
			background: '#fdf9fc',
		}).then(result => {
			if (result.isConfirmed) {
				paymentSubmit();
			}
		});
	};

	const paymentSubmit = async () => {
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		});

		if (!error) {
			const { id } = paymentMethod;
			try {
				const { data } = await axios.post('https://pf-henry-gamesportal.herokuapp.com/api/checkout', {
					id,
					amount: amount * 100,
					dataUser,
				});

				if (data.code) {
					Swal.fire({
						title: 'Error!',
						text: `${data.code.toString().replace('_', ' ').toUpperCase()} - ${data.decline_code
							.toString()
							.replace('_', ' ')
							.toUpperCase()}`,
						icon: 'error',
						button: 'Ok',
						imageUrl: 'https://i.pinimg.com/originals/f3/78/4d/f3784dc54de78b85eac662dc55ba64aa.gif',
						imageHeight: '200px',
						imageWidth: '200px',
						background: '#fdf9fc',
						confirmButtonColor: '#dc3545',
					});
					toast.error('Try again!');
				} else {
					Swal.fire({
						title: 'Success!',
						text: 'Thanks for joining Play Center!',
						icon: 'success',
						button: 'Ok',
						imageUrl: 'https://i.pinimg.com/originals/42/0e/55/420e553ac05ef62e4b114123e73865a0.gif',
						imageHeight: '200px',
						imageWidth: '200px',
						background: '#fdf9fc',
						confirmButtonColor: '#28a745',
					});
					const newDataUser = await axios.get(
						`https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`
					);
					window.localStorage.setItem('userLogged', JSON.stringify(newDataUser.data));
					toast.success('Thanks for joining play center');
					navigate('/home');
				}
				elements.getElement(CardElement).clear();
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div>
			<NavBar />
			<div className="container">
				<h1 className="mt-10 mb-10 mx-5 text-7xl opacity-85 font-totifont text-center text-white">Payment</h1>
				<div className="container max-w-2xl p-8 mt-10 bg-gray-800 border-2 border-gray-700 rounded-md">
					<form onSubmit={handleSubmit} className="flex flex-col">
						<CardElement options={cardElementOptions} />
						<button
							disabled={!stripe}
							type="submit"
							className="w-24 h-12 p-1 mx-auto mt-10 text-center text-white bg-green-700 hover:bg-green-500 rounded-md"
						>
							Pay
						</button>
					</form>
				</div>
			</div>
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
			<div className="mt-96">
				<Footer />
			</div>
		</div>
	);
}
