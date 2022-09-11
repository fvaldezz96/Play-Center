import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByEmail, postUser } from '../redux/actions';
import LoginButton from '../components/Login';
import LogoutButton from '../components/Logout';
import Loader from '../components/Loader';

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  const userDb = useSelector(state => state.user);

  useEffect(() => {
    if (userDb?.length > 0) {
    } else {
      if (user) {
        dispatch(postUser(user));
        dispatch(getUserByEmail(user.email));
      }
    }
  }, [dispatch, user, userDb]);

  if (isAuthenticated) {
    while (window.localStorage.userLogged === '' || window.localStorage.userLogged === undefined || userDb[0]?.length < 1 || !userDb[0]?.nickname) {
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
      userDb[0]?.bannedFlag === true || userDb[0]?.deleteFlag === true

        ? <div className="bg-[url('https://cdnb.artstation.com/p/assets/images/images/012/193/905/original/maria-hager-titlescreen-retro-glitch.gif?1533552570')] bg-cover bg-center bg-no-repeat fixed h-screen w-screen">
          <div className="container text-center align-middle">
            <h1 className="my-20 text-white text-8xl font-totifont opacity-70">Play Center</h1>
            <img className="absolute inset-0 w-32 h-32" src="https://i.imgur.com/9ESFHWn.png" alt="" />
            <div className="mt-10">
              <h3 className="text-5xl text-center text-red-600 font-totifont opacity-80">
                This account has been banned or deleted.
              </h3>
              <p className="text-3xl text-center text-red-600 font-totifont opacity-80">
                Please, logout and try again with other account.
              </p>
              <div className="flex flex-row-reverse justify-center my-20 align-middle">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
        : <div className="bg-[url('https://cdnb.artstation.com/p/assets/images/images/012/193/905/original/maria-hager-titlescreen-retro-glitch.gif?1533552570')] bg-cover bg-center bg-no-repeat fixed h-screen w-screen">
          <div className="container text-center align-middle">
            <h1 className="my-20 text-white text-8xl font-totifont opacity-70">Play Center</h1>
            <img className="absolute inset-0 w-32 h-32" src="https://i.imgur.com/9ESFHWn.png" alt="" />
            <div className="mt-10">
              <h3 className="text-5xl text-center text-white font-totifont opacity-70">
                Welcome, {userDb?.length > 0 ? userDb[0]?.nickname : ''}.
              </h3>
              <div className="flex flex-row-reverse justify-center my-20 align-middle">
                <LogoutButton />
                <Link state={userDb[0]} to="/home">
                  <button class="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span class="relative px-6 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Enter
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
    )

  }
  else {
    window.localStorage.setItem('userLogged', '');
    return (
      <div className="bg-[url('https://cdnb.artstation.com/p/assets/images/images/012/193/905/original/maria-hager-titlescreen-retro-glitch.gif?1533552570')] bg-cover bg-center bg-no-repeat fixed h-screen w-screen">
        <div className="container text-center align-middle">
          <h1 className="my-20 text-white text-8xl font-totifont opacity-70">Play Center</h1>
          <img className="absolute inset-0 w-32 h-32" src="https://i.imgur.com/9ESFHWn.png" alt="" />
          <div className="mt-10">
            <LoginButton />
          </div>
        </div>
      </div>
    )
  }
}
