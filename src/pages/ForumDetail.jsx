import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { cleanForum, getForum, reportPostForum } from '../redux/actions';
import AnswerForum from '../components/AnswerForum';
import NavBar from '../components/NavBar';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function ForumDetail() {
	const { id } = useParams();
	const dispatch = useDispatch();
	let details = useSelector(state => state.forumById);
	const navigate = useNavigate();
	const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);

	useEffect(() => {
		if (!dataUser || dataUser === '' || dataUser?.deleteFlag === true || dataUser.bannedFlag === true) {
			navigate('/');
		}
	}, [dataUser, navigate]);

	useEffect(() => {
		dispatch(getForum(id));
		return () => {
			dispatch(cleanForum());
		};
	}, [dispatch, id]);

	let buttonReport = false;

	function handleOnChange(e) {
		Swal.fire({
			imageUrl: `https://c.tenor.com/2XJN2YEYbIAAAAAC/peach-and.gif`,
			imageWidth: 200,
			title: `Do you want to report this post?`,
			showDenyButton: true,
			confirmButtonText: 'Yes',
			denyButtonText: `No`,
		}).then(result => {
			if (result.isConfirmed === true) {
				const report = { report: dataUser.id };
				dispatch(reportPostForum(id, report));
				let buttonReport = true;
				toast.success(`Report successful!`);
			}
		});

	}

	return (
		<div>
			<NavBar />
			<div className="container flex flex-col items-center mt-5 align-middle">
				<div className="p-4 mx-4 my-4 bg-gray-800 border-gray-700 rounded-lg shadow-md h-fit w-fit min-w-1/2">
					<div>
						<div className="flex flex-row-reverse items-center justify-between">
							<div className="flex flex-row-reverse items-center justify-start align-middle">
								<div className="w-24 h-24 overflow-hidden border-2 border-gray-400 rounded-full">
									<img
										src={details?.user?.img}
										className="object-cover w-full h-full"
										alt={dataUser.nickname}
									/>
								</div>
								<h3 className="max-w-2xl mx-2 text-2xl font-semibold text-white">
									{details?.user?.nickname}
								</h3>
							</div>
							<div className="grid grid-cols-1 place-items-end">
								<Link to="/forum">
									<button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
										<span className="relative px-3 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-400 rounded-md group-hover:bg-opacity-0">
											<img
												className="w-8 h-8"
												src="https://cdn-icons-png.flaticon.com/512/5166/5166467.png"
												alt="Return"
											/>
										</span>
									</button>
								</Link>
							</div>
						</div>
						<h5 className="mb-4 text-4xl font-semibold tracking-tight text-center text-white">
							{details.title}
						</h5>
						<div className="h-64 overflow-hidden rounded shadow-lg bg-slate-400 ">
							<p className="p-1">{details?.text}</p>
						</div>
						<div className="flex flex-row items-center justify-between align-middle">
							<div className="mt-5 text-slate-600">
								<p>
									Created: {details?.createdAt?.split('T')[0]} -{' '}
									{details?.createdAt?.split('T')[1].split(':')[0]}:
									{details?.createdAt?.split('T')[1].split(':')[1]}
								</p>
								<p>
									Last update : {details?.updatedAt?.split('T')[0]} -{' '}
									{details?.updatedAt?.split('T')[1].split(':')[0]}:
									{details?.updatedAt?.split('T')[1].split(':')[1]}
								</p>
								<p>Comments: {details?.answers?.length}</p>
							</div>
							{buttonReport === true || details?.report?.includes(dataUser.id) ? (
								''
							) : details.deleteFlag === false && details.userId !== dataUser.id ? (
								<div>
									<button
										onClick={handleOnChange}
										className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
									>
										Report Post
									</button>
								</div>
							) : (
								''
							)}
							{details.deleteFlag === false && details.userId === dataUser.id ? (
								<Link to={`/post/${details.id}`}>
									<button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
										<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
											Edit
										</span>
									</button>
								</Link>
							) : (
								''
							)}
						</div>
					</div>
				</div>
				<div className="container flex flex-col items-center mt-1 align-middle">
					<div className="p-4 mx-4 my-4 bg-gray-800 border-gray-700 rounded-lg shadow-md h-fit w-fit min-w-1/2 flex flex-col items-center mt-5 align-middle">
						<AnswerForum forumId={id} comments={details?.answers} />
						<div className="max-w-sm mx-5 my-3 mb-10 overflow-hidden rounded shadow-lg bg-slate-400">
							{details?.answers?.reverse().map(e => (
								<div key={e.id} className="border">
									<div className="px-4 mx-5 my-6">
										<div className="flex my-2">
											<img className="w-12 h-12 mr-2 rounded-full" src={e.user.img} alt="" />
											<span className="text-base font-bold">{e.user.nickname}</span>
										</div>
										<div className="flex-1">
											<p className="text-base text-gray-700">{e.comment}</p>
											<p>
												Created at: {e?.createdAt?.split('T')[0]} -{' '}
												{e?.createdAt?.split('T')[1].split(':')[0]}:
												{e?.createdAt?.split('T')[1].split(':')[1]}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
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
		</div>
	);
}
