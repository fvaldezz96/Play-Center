import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMission, createReward } from '../../redux/actions';
import Swal from 'sweetalert2';




export default function FormNewMission() {

    const dispatch = useDispatch()

    const [inputMission, setInputMission] = useState({
        name: "",
        description: "",
        coinsRewards: "",
        icon: "",
        route: ""
    })


    const [inputReward, setInputReward] = useState({
        title: "",
        price: "",
        image: "",
        recompenseType: "",

    });

    let routes = ["games", "payment", "chat", "quests", "play", "forum", "rewards", "about", "contact", "profile", "home"]
    let [typeOfForm, setTypeOfForm] = useState("")

    function handleOnChange(e) {
        typeOfForm == "mission"
            ? setInputMission({
                ...inputMission,
                [e.target.name]: e.target.value
            })

            : setInputReward({
                ...inputReward,
                [e.target.name]: e.target.value
            })

    }

    function handleOncheck(f) {
        f.target.checked
            ? setInputMission({
                ...inputMission,
                route: f.target.value
            })
            : setInputMission({ ...inputMission })
    }

    function handleSubmit(e) {
        e.preventDefault(e)

        if (typeOfForm === "mission") {
            Swal.fire({
                imageUrl: `${inputMission.icon}`,
                imageWidth: 200,
                title: `Do you want to create a new mission whit this parameters?
                name: ${inputMission.name}
                description: ${inputMission.description},
                coinsRewards: ${inputMission.coinsRewards},
                route: ${inputMission.route}
                icon: (on top),
                `,

                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: `No`,
            }).then(result => {
                if (result.isConfirmed === true) {

                    dispatch(createMission(inputMission))

                    setInputMission({
                        name: "",
                        description: "",
                        coinsRewards: "",
                        icon: "",
                        route: ""
                    })
                    setTypeOfForm("")
                }
            });

        } else if (typeOfForm === "reward") {
            Swal.fire({
                title: `Do you want to create a new reward whit this parameters?
                title: ${inputReward.title},
                price: ${inputReward.price},
                recompenseType: ${inputReward.recompenseType},
                image:(on top) 
          `,
                imageUrl: `${inputReward.image}`,
                imageWidth: 200,
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: `No`,
            }).then(result => {
                if (result.isConfirmed === true) {
                    dispatch(createReward(inputReward))
                    setInputReward({
                        title: "",
                        price: "",
                        image: "",
                        recompenseType: "",
                    })
                    setTypeOfForm("")
                }
            })

        }
    }

    function handleCancel(e) {
        e.preventDefault()

        setInputMission({
            name: "",
            description: "",
            coinsRewards: "",
            icon: "",
            route: ""
        })


        setInputReward({
            title: "",
            price: "",
            image: "",
            recompenseType: "",
        })

        setTypeOfForm("")
    }



    return (
        <div>
            {typeOfForm === "mission" ?
                <form onSubmit={e => handleSubmit(e)} className='flex flex-col container m-auto bg-slate-100 max-w-md p-10 rounded-md'>
                    <h3 className='mb-3 text-xl'>New Mission</h3>
                    <input
                        className="max-w-sm my-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        placeholder="Name of the mission"
                        name="name"
                        value={inputMission.name}
                        onChange={e => handleOnChange(e)}
                    />
                    <input
                        className="max-w-sm my-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        placeholder="Description of the mission"
                        name="description"
                        value={inputMission.description}
                        onChange={e => handleOnChange(e)}
                    />
                    <input
                        className="max-w-sm my-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="number"
                        min="1"
                        placeholder="Ammount of coins"
                        name="coinsRewards"
                        value={inputMission.coinsRewards}
                        onChange={e => handleOnChange(e)}
                    />
                    <input
                        className="max-w-sm my-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        placeholder="Icon URL"
                        name="icon"
                        value={inputMission.icon}
                        onChange={e => handleOnChange(e)}
                    />
                    <p>Route: </p>
                    {routes.map(e => {
                        return (
                            <div key={e}>
                                <input
                                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    type="radio"
                                    placeholder="Route"
                                    name="route"
                                    value={e}
                                    onChange={f => handleOncheck(f)}
                                />
                                <div>{e}</div>
                            </div>)
                    }
                    )}
                    <div className='text-right'>
                        <button
                            type='submit'
                            className="button relative mt-1.5 inline-flex items-center justify-center p-0.5 ml-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Create new mission
                            </span>
                        </button>
                    </div>
                </form >
                : typeOfForm === "reward" ?
                    <form onSubmit={e => handleSubmit(e)} className='flex flex-col container m-auto bg-slate-100 max-w-md p-10 rounded-md'>
                        <h3 className='mb-3 text-xl'>New Reward</h3>
                        <input
                            className="max-w-sm my-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="Title of the reward"
                            name="title"
                            value={inputReward.title}
                            onChange={e => handleOnChange(e)}
                        />
                        <input
                            className="max-w-sm my-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="Type of recompense"
                            name="recompenseType"
                            value={inputReward.recompenseType}
                            onChange={e => handleOnChange(e)}
                        />
                        <input
                            className="max-w-sm my-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            min="1"
                            placeholder="Price of the reward"
                            name="price"
                            value={inputReward.price}
                            onChange={e => handleOnChange(e)}
                        />
                        <input
                            className="max-w-sm my-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="image Url"
                            name="image"
                            value={inputReward.image}
                            onChange={e => handleOnChange(e)}
                        />
                        <div className='text-right'>
                            <button
                                type='submit'
                                id="button"
                                className="button mt-1.5 relative inline-flex items-center justify-center p-0.5 ml-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                            >
                                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Create new reward
                                </span>
                            </button>
                        </div>
                    </form >
                    : ""}
            {typeOfForm === ""
                ?
                <div className='container flex flex-row justify-center'>
                    <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" onClick={e => setTypeOfForm("mission")}>
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Create new mission
                        </span>
                    </button>
                    <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" onClick={e => setTypeOfForm("reward")}>
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Create new reward
                        </span>
                    </button>
                </div>
                :
                <div className='container flex flex-row justify-center mt-3'>
                    <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" onClick={e => handleCancel(e)}>
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Cancel
                        </span>
                    </button>
                </div>
            }
        </div>
    )


}