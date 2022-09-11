import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import LogoutButton from "./Logout";

export default function NewNavBar() {
  const dataUser = !window.localStorage.userLogged
    ? ""
    : JSON.parse(window.localStorage.userLogged);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className="bg-gray-800 shadow ">
        <div className="max-w-7xl mx-auto px-12 py-1 container sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 my-4">
            <div className="flex items-center">
              <div className="w-24 h-24">
                <a href="/home">
                  <img src="https://i.imgur.com/9ESFHWn.png" alt="" />
                </a>
              </div>

              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="/games"
                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Games
                  </a>

                  <a
                    href="/chat"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Chat
                  </a>

                  <a
                    href="/play"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Community
                  </a>

                  <a
                    href="/forum"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Forum
                  </a>

                  <a
                    href="/rewards"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Rewards
                  </a>
                  <a
                    href="/quests"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Quest
                  </a>
                  <a
                    href="/about"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </a>
                  <a
                    href="/contact"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact
                  </a>
                  {dataUser.isAdmin ? (
                    <a
                      href="/admin"
                      className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-200 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                    >
                      Admin
                    </a>
                  ) : (
                    ""
                  )}
                  <div className="flex items-center mt-4 md:mt-0">
                    <div className="flex flex-col items-end mx-3">
                      <h3 className="max-w-2xl text-2xl text-gray-200">
                        {dataUser.nickname}
                      </h3>
                      <span className="text-xs text-gray-200 dark:text-white">
                        💎 {dataUser.coins}
                      </span>
                    </div>
                    <Link to={`/profile/${dataUser.id}`}>
                      <div className="w-16 h-16 overflow-hidden border-2 border-gray-400 rounded-full">
                        <img
                          src={dataUser.img}
                          className="object-cover w-full h-full"
                          alt="avatar"
                        />
                      </div>
                    </Link>
                    <div>
                      <LogoutButton />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a
                  href="/games"
                  className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Games
                </a>

                <a
                  href="/chat"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Chat
                </a>

                <a
                  href="/play"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Community
                </a>

                <a
                  href="/forum"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Forum
                </a>

                <a
                  href="/rewards"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Rewards
                </a>
                <a
                  href="/quests"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Quest
                </a>
                {/*<a*/}
                {/*    href="/about"*/}
                {/*    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"*/}
                {/*>*/}
                {/*  About*/}
                {/*</a>*/}
                {/*<a*/}
                {/*    href="/contact"*/}
                {/*    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"*/}
                {/*>*/}
                {/*  Contact*/}
                {/*</a>*/}
                {/*{ dataUser.isAdmin ? (*/}
                {/*    <a*/}
                {/*        href="/admin"*/}
                {/*        className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-200 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"*/}
                {/*    >*/}
                {/*      Admin*/}
                {/*    </a>*/}
                {/*) : (*/}
                {/*    ""*/}
                {/*)}*/}
              </div>
            </div>
          )}
        </Transition>
      </nav>

      <header className="bg-white shadow"></header>
      <main></main>
    </div>
  );
}
