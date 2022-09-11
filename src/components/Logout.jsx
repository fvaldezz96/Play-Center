import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function LogoutButton() {
	const { logout } = useAuth0();

	return (
		<button
			className="relative inline-flex items-center justify-center p-0.5 ml-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
			onClick={() => logout({ returnTo: window.location.origin })}
		>
			<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
				Logout
			</span>
		</button>
	);
}
