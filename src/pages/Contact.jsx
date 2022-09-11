import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Contact() {
	return (
		<div>
			<NavBar />
			<div className="container mb-10">
				<h1 className="mx-5 mt-10 text-center text-white text-7xl opacity-85 font-totifont">Contact</h1>
			</div>
			<div className="container max-w-3xl p-5 mb-10 bg-gray-300 rounded-md">
				<Formik
					initialValues={{
						name: '',
						email: '',
						subject: '',
						message: '',
					}}
					validationSchema={Yup.object({
						name: Yup.string().required('Please enter a name'),
						email: Yup.string().email('Invalid email format').required('Please enter an email'),
						subject: Yup.string().required('Please enter a subject'),
						message: Yup.string().required('Please enter a message'),
					})}
					onSubmit={async (values, formikHelpers) => {
						try {
							await axios.post('https://pf-henry-gamesportal.herokuapp.com/email/contact', values);
							toast.success(`Message sended!`);
							formikHelpers.resetForm();
						} catch (error) {
							toast.error(`Message not sended.`);
							console.log(error);
						}
					}}
				>
					<Form>
						<div className="mb-3">
							<label for="name" className="block text-lg font-medium text-gray-700">
								Name
							</label>
							<Field
								type="text"
								name="name"
								id="name"
								className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm w-80 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							/>
							<ErrorMessage component="div" className="text-xs italic text-red-500" name="name" />
						</div>
						<div className="mb-3">
							<label for="email" className="block text-lg font-medium text-gray-700">
								Email
							</label>
							<Field
								type="text"
								name="email"
								id="email"
								className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm w-80 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							/>
							<ErrorMessage component="div" className="text-xs italic text-red-500" name="email" />
						</div>
						<div className="mb-3">
							<label for="subject" className="block text-lg font-medium text-gray-700">
								Subject
							</label>
							<Field
								type="text"
								name="subject"
								id="subject"
								className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm w-96 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							/>
							<ErrorMessage component="div" className="text-xs italic text-red-500" name="subject" />
						</div>
						<div className="mb-3">
							<label for="message" className="block text-lg font-medium text-gray-700">
								Message
							</label>
							<Field
								type="text"
								as="textarea"
								name="message"
								id="message"
								className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							/>
							<ErrorMessage component="p" className="text-xs italic text-red-500" name="message" />
						</div>
						<div className="mt-3 text-center sm:px-6">
							<button
								type="submit"
								className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
							>
								<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
									Send
								</span>
							</button>
						</div>
					</Form>
				</Formik>
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
			<div className="mt-28">
				<Footer />
			</div>
		</div>
	);
}
