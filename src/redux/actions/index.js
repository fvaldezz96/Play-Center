import axios from 'axios';
import {
	CLAIM_REWARDS,
	CLEAN_ALLNEWS_STATE,
	CLEAN_FORUM,
	CLEAN_GAMES_BY_ID_STATE,
	CLEAN_GAMES_STATE,
	CLEAN_NEWS_STATE,
	CLEAN_REWAR_STATE,
	CONTAINER_POSTS,
	EDIT_POST,
	GET_ALL_NEWS,
	GET_FORUM,
	GET_GAMES,
	GET_GAMES_BY_ID,
	GET_NEWS_BY_ID,
	GET_NEWS_BY_TITLE,
	GET_REWARDS,
	GET_REWARDS_BY_ID,
	GET_USER_BY_EMAIL,
	GET_USERS,
	GET_USERS_BY_ID,
	ORDER_BY_COMMENTS,
	ORDER_NEWS_BY_TITLE,
	POST_FORUM,
	POST_FORUM_ANSWERS,
	POST_USER,
	SEARCH_NEWS_BY_TITLE,
	LOADING_USER,
	GET_GENRES,
	REPORT_POST_FORUM,
	GET_FRIENDS,
	GET_ALL_CHATS,
	POST_CHAT,
	PUT_MESSAGE,
	GET_NON_FRIENDS,
	ADD_FRIENDS,
	CLEAN_FORUM_EDIT,
	CLEAN_ALL_POST,
	CLEAN_ALL,
  SET_ADMIN,
  UNSET_ADMIN,
  CLAIM_MISSION,
  POST_MISSON,
  POST_REWARD,
  GET_ALL_MISSIONS,
  SEARCH_FRIENDS,
  FILTER_BY_GENRES,
  SEARCH_IN_FORUM,
} from './types';

const USERS_URL = 'https://pf-henry-gamesportal.herokuapp.com/users';
const NEWS_URL = 'https://pf-henry-gamesportal.herokuapp.com/news';
const FORUM_URL = 'https://pf-henry-gamesportal.herokuapp.com/forum';
const REWARDS_URL = 'https://pf-henry-gamesportal.herokuapp.com/reward';
const GAMES_URL = 'https://pf-henry-gamesportal.herokuapp.com/games';
const ANSWER_URL = 'https://pf-henry-gamesportal.herokuapp.com/answers';
const GENRES_URL = 'https://pf-henry-gamesportal.herokuapp.com/genre';
const CHAT_URL = "https://pf-henry-gamesportal.herokuapp.com/chat";
const ADD_MISSION_URL = "https://pf-henry-gamesportal.herokuapp.com/addMission";
const MISSION_URL = "https://pf-henry-gamesportal.herokuapp.com/missions";


export function postUser(data) {
	return async function (dispatch) {
		try {
			await axios.post(USERS_URL, data);
			return dispatch({ type: POST_USER });
		} catch (error) {
			console.log(error);
		}
	};
}

export function getUsers() {
	return async function (dispatch) {
		try {
			let json = await axios.get(USERS_URL);
			return dispatch({ type: GET_USERS, payload: json.data });
		} catch (error) {
			console.log(error);
		}
	};
}

export function getUserById(id) {
	return async function (dispatch) {
		try {
			let json = await axios.get(`${USERS_URL}/${id}`);
			return dispatch({ type: GET_USERS_BY_ID, payload: json.data }, { type: LOADING_USER });
		} catch (error) {
			console.log(error);
		}
	};
}

export function getUserByEmail(email) {
	return async function (dispatch) {
		try {
			let json = await axios.get(`${USERS_URL}?email=${email}`);
			window.localStorage.setItem('userLogged', JSON.stringify(json.data[0]));
			return dispatch({ type: GET_USER_BY_EMAIL, payload: json.data });
		} catch (error) {
			console.log(error);
		}
	};
}

export function getAllNews() {
	return async function (dispatch) {
		try {
			let json = await axios.get(NEWS_URL);
			return dispatch({ type: GET_ALL_NEWS, payload: json.data });
		} catch (error) {
			console.log(error);
		}
	};
}

export function getNewsById(id) {
	return async function (dispatch) {
		try {
			let json = await axios.get(`${NEWS_URL}/${id}`);
			return dispatch({ type: GET_NEWS_BY_ID, payload: json.data });
		} catch (error) {
			console.log(error);
		}
	};
}

export function getNewsByTitle(title) {
	return async function (dispatch) {
		try {
			let json = await axios.get(`${NEWS_URL}?title=${title}`);
			return dispatch({
				type: GET_NEWS_BY_TITLE,
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function searchBarsearch(payload) {
	return async function (dispatch) {
		try {
			const json = await axios.get(`${NEWS_URL}?title=${payload}`);
			return dispatch({
				type: SEARCH_NEWS_BY_TITLE,
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function orderNewsByTitle(payload) {
	return {
		type: ORDER_NEWS_BY_TITLE,
		payload,
	};
}

export function postForum(payload) {
	return async function (dispatch) {
	  try {
		await axios.post(FORUM_URL, payload);
		let json = await axios.get(FORUM_URL)
		return dispatch({ type: POST_FORUM , payload: json.data});
	  } catch (error) {
		console.log(error);
	  }
	};
  }

export function claimRewards(data, id, price) {
	return async function (dispatch) {
		try {
			let newDataUser = await axios.get(`https://pf-henry-gamesportal.herokuapp.com/users/${id}`);
			if (newDataUser.data.coins >= price) {
				await axios.put(`${USERS_URL}/${id}`, data);
        await axios.post(`https://pf-henry-gamesportal.herokuapp.com/email/reward`, {
          email: data.email
        });
				newDataUser = await axios.get(`https://pf-henry-gamesportal.herokuapp.com/users/${id}`);
				window.localStorage.setItem('userLogged', JSON.stringify(newDataUser.data));
			} else {
				window.localStorage.setItem('userLogged', JSON.stringify(newDataUser.data));
				return alert('insuficient founds');
			}
			window.localStorage.setItem('userLogged', JSON.stringify(newDataUser.data));
			return dispatch({ type: CLAIM_REWARDS, payload: newDataUser });
		} catch (error) {
			console.log(error);
		}
	};
}

export function getRewards() {
	return async function (dispatch) {
		try {
			const json = await axios.get(REWARDS_URL);
			return dispatch({ type: GET_REWARDS, payload: json.data });
		} catch (error) {
			console.log(error);
		}
	};
}

export function getRewardsById(id) {
	return async function (dispatch) {
		try {
			let json = await axios.get(`${REWARDS_URL}/${id}`);
			return dispatch({ type: GET_REWARDS_BY_ID, payload: json.data });
		} catch (error) {
			console.log(error);
		}
	};
}

export function getGames() {
	return async function (dispatch) {
		try {
			let json = await axios.get(GAMES_URL);
			return dispatch({ type: GET_GAMES, payload: json.data });
		} catch (error) {
			console.log(error);
		}
	};
}

export function getAllPosts() {
	return async function (dispatch) {
		try {
			let comment = await axios.get(FORUM_URL);
			return dispatch({
				type: CONTAINER_POSTS,
				payload: comment.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function editPost(id, data) {
	return async function (dispatch) {
	  try {
		await axios.put(`${FORUM_URL}/${id}`, data);
		let json = await axios.get(`${FORUM_URL}/${id}`);
		return dispatch({
		  type: EDIT_POST, payload:json.data
		});
	  } catch (error) {}
	};
  }
  

export function postForumAnswers(payload) {
	return async function (dispatch) {
		try {
			await axios.post(ANSWER_URL, payload);
			let json = await axios.get(`${FORUM_URL}/${payload.idForum}`);
			return dispatch({ type: POST_FORUM_ANSWERS, payload: json.data });
		} catch (error) {
			console.log(error);
		}
	};
}

export function getForum(id) {
	return async function (dispatch) {
		try {
			let json = await axios.get(`${FORUM_URL}/${id}`);
			return dispatch({ type: GET_FORUM, payload: json.data });
		} catch (error) {
			console.log(error);
		}
	};
}

export function cleanNewsState() {
	return {
		type: CLEAN_NEWS_STATE,
	};
}

export function cleanRewardState() {
	return {
		type: CLEAN_REWAR_STATE,
	};
}

export function cleanAllNewsState() {
	return {
		type: CLEAN_ALLNEWS_STATE,
	};
}

export function cleanGamesState() {
	return {
		type: CLEAN_GAMES_STATE,
	};
}

export function cleanForum() {
	return {
		type: CLEAN_FORUM,
	};
}

export function orderByComments(value) {
	try {
		return { type: ORDER_BY_COMMENTS, payload: value };
	} catch (error) {
		console.log(error);
	}
}

export function getGamesById(id) {
	return async function (dispatch) {
		try {
			let json = await axios.get(`${GAMES_URL}/${id}`);
			return dispatch({ type: GET_GAMES_BY_ID, payload: json.data });
		} catch (error) {
			console.log(error);
		}
	};
}

export function cleanGamesByIdState() {
	return {
		type: CLEAN_GAMES_BY_ID_STATE,
	};
}

export function getGenres() {
	return async function (dispatch) {
		try {
			let json = await axios.get(GENRES_URL);
			return dispatch({ type: GET_GENRES, payload: json.data });
		} catch (error) {
			console.log(error);
		}
	};
}

export function reportPostForum(id, data) {
	return async function (dispatch) {
		try {
			await axios.put(`${FORUM_URL}/${id}`, data);
			let json = await axios.get(`${FORUM_URL}/${id}`);
			return dispatch({ type: REPORT_POST_FORUM, payload: json.data });
		} catch (error) {
			console.log(error);
		}
	};
}


export function getAllFriends(friends) {
	return async function (dispatch) {
	  try {
		let json = await axios.get(USERS_URL);
		json=json.data.filter(e=>friends.some(f=>e.id===f))
		return dispatch({ type: GET_FRIENDS, payload: json });
	  } catch (error) {
		console.log(error);
	  }
	};
  }
  
  export function getAllNonFriends(nonFriendsId) {
	return async function (dispatch) {
	  try {
		let json = await axios.get(USERS_URL);
		json=json.data.filter(e=>nonFriendsId.some(nf=>e.id===nf))
		return dispatch({ type: GET_NON_FRIENDS, payload: json });
	  } catch (error) {
		console.log(error);
	  }
	};
  }
  
  export function getAllChats(userId){
	return async function (dispatch) {
	  try {
		let json = await axios.get(`${USERS_URL}/${userId}?chatShow=true`);
		return dispatch({ type: GET_ALL_CHATS, payload: json.data });
	  } catch (error) {
		console.log(error);
	  }
	};
  }
  
  export function createChatWhitFriend(user1Id,user2Id){
	return async function (dispatch) {
	  try {
		await axios.post(`${CHAT_URL}`,{user1Id,user2Id});
		let json = await axios.get(`${USERS_URL}/${user1Id}?chatShow=true`);
		return dispatch({ type: POST_CHAT, payload:json.data});
	  } catch (error) {
		console.log(error);
	  }
	};
  }
  
  export function saveMessageInDb(userId, messages, roomId){
	return async function (dispatch) {
	  try {
		await axios.put(`${CHAT_URL}/${roomId}`,{userId,messages});
		// let json = await axios.get(`${USERS_URL}/${userId}?chatShow=true`);
		return dispatch({ type: PUT_MESSAGE});
	  } catch (error) {
		console.log(error);
	  }
	};
  }
  export function addFriendForChat(userId, newFriendId , deleteFriend, nonFriendsIds){
	return async function (dispatch) {
		let roomId=[userId,newFriendId].sort().join("_")
		try {
			await axios.put(`${USERS_URL}/${userId}?deleteFriend=${deleteFriend}`,{friends:newFriendId});
			
		let json = await axios.get(`${USERS_URL}/${userId}`);
		let chats = await axios.get(`${USERS_URL}/${userId}?chatShow=true`);
		let flag = chats.data.chats.filter(e=>e.id==roomId)

		if(deleteFriend=="yes" && flag.length>0 && flag.deleteFlag != true){
			await axios.put(`${CHAT_URL}/${roomId}`,{deleteFlag:true});
		}else if (deleteFriend=="no" && flag.length>0 && flag.deleteFlag != false){
			await axios.put(`${CHAT_URL}/${roomId}`,{deleteFlag:false});
		}
		
		let friensids= json.data.friends
		let nonFriends
		let allUsers = await axios.get(USERS_URL);
		let friends = await axios.get(`${USERS_URL}`);
		friends=friends.data.filter(e=>friensids.some(f=>e.id===f))
		
		if(nonFriendsIds){
			nonFriends = await axios.get(USERS_URL);
			nonFriends=nonFriends.data.filter(e=>nonFriendsIds.some(nf=>e.id===nf))
		}
		window.localStorage.setItem("userLogged", JSON.stringify(json.data));
		return dispatch({ type: ADD_FRIENDS, payload:json.data, payload2:chats.data, payload3:friends, payload4: nonFriends, payload5:allUsers.data});
	  } catch (error) {
		console.log(error);
	  }
	};
  }
  
  export function setAdmin(id) {
    return async function (dispatch) {
      try {
        await axios.put(`${USERS_URL}/${id}`, {
          isAdmin: true
        });
        const json = await axios.get(`${USERS_URL}/${id}`);
        return dispatch({ type: SET_ADMIN, payload: json.data });
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function unsetAdmin(id) {
    return async function (dispatch) {
      try {
        await axios.put(`${USERS_URL}/${id}`, {
          isAdmin: false
        });
        const json = await axios.get(`${USERS_URL}/${id}`);
        return dispatch({ type: UNSET_ADMIN, payload: json.data });
      } catch (error) {
        console.log(error);
      }
    };
  }
  
  export function cleanForumEdit(){
	return {type:CLEAN_FORUM_EDIT}
  }
  
  export function clearAllPost(){
	return {type:CLEAN_ALL_POST}
  }

  export function cleanState(){
	return {type:CLEAN_ALL}
  }

  export function claimMission(missionId , coinsRewards , userId ){
	return async function (dispatch) {
		try {
		  await axios.put(`${ADD_MISSION_URL}/${userId}`,{missionId:missionId});
		await axios.put(`${USERS_URL}/${userId}`,{coins:coinsRewards})
		  let json= await axios.get(`${USERS_URL}/${userId}`)
		  window.localStorage.setItem("userLogged", JSON.stringify(json.data));
		  let json2= await axios.get(`${MISSION_URL}`);
		  return dispatch({ type: CLAIM_MISSION , payload:json.data,payload2:json2.data});
		} catch (error) {
		  console.log(error);
		}
	  };
  }
  
  export function createMission({name,description,coinsRewards,icon,route}){
	return async function (dispatch) {
		try {
		  await axios.post(`${MISSION_URL}`,{name,description,coinsRewards,icon,route});
		  
		  return dispatch({ type: POST_MISSON });
		} catch (error) {
		  console.log(error);
		}
	  };
  }
  
  
  export function createReward({title,price,image,recompenseType}){
	return async function (dispatch) {
		try {
		  await axios.post(`${REWARDS_URL}`,{title,price,image,recompenseType});
		  
		  return dispatch({ type: POST_REWARD });
		} catch (error) {
		  console.log(error);
		}
	  };
  }

  export function getAllMissions(){
	return async function (dispatch) {
		try {
		let json= await axios.get(`${MISSION_URL}`);
		  
		  return dispatch({ type: GET_ALL_MISSIONS, payload : json.data });
		} catch (error) {
		  console.log(error);
		}
	  };
  }



  export function searchFriends(payload){
		  return ({ type:SEARCH_FRIENDS, payload :payload });
  }
  
  export function orderByGenres(payload){
		  return ({ type:FILTER_BY_GENRES, payload :payload });
  }

  export function searchInForum(payload){
		  return ({ type:SEARCH_IN_FORUM, payload:payload });
  }