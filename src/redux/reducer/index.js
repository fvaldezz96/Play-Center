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
  GET_GENRES,
  GET_NEWS_BY_ID,
  GET_NEWS_BY_TITLE,
  GET_REWARDS,
  GET_REWARDS_BY_ID,
  GET_USER_BY_EMAIL,
  GET_USERS,
  GET_USERS_BY_ID,
  LOADING_USER,
  ORDER_BY_COMMENTS,
  ORDER_NEWS_BY_TITLE,
  POST_FORUM,
  POST_FORUM_ANSWERS,
  POST_USER,
  REPORT_POST_FORUM,
  SEARCH_NEWS_BY_TITLE,
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
} from "../actions/types";

const initialState = {
	users: [],
	user: {},
	userLoading: true,
	allNews: [],
	news: {},
	rewards: [],
	games: [],
	rewardsById: [],
	forumById: [],
	gamesDetails: [],
	genres: [],
	posts: [],
  friends: [],
  friendsBackUp: [],
  nonFriends: [],
  chats:[],
  missions:[],
  input:"",
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        isLoadingUsers: false,
      };
    case GET_USERS_BY_ID:
      return {
        ...state,
        user: action.payload,
        userLoading: false,
      };
    case GET_USER_BY_EMAIL:
      return {
        ...state,
        user: action.payload,
      };
    case GET_ALL_NEWS:
      return {
        ...state,
        allNews: action.payload,
        isLoadingAllNews: false,
      };
    case GET_NEWS_BY_ID:
      return {
        ...state,
        news: action.payload,
        isLoadingNews: false,
      };
    case POST_USER:
      return {
        ...state,
      };
    case GET_NEWS_BY_TITLE:
      return {
        ...state,
        allNews: action.payload,
        isLoadingNews: false,
      };
    case SEARCH_NEWS_BY_TITLE:
      return {
        ...state,
        allNews: action.payload,
      };
    case ORDER_NEWS_BY_TITLE:
      let news = [...state.allNews];
      news = news.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return action.payload === "Asc" ? -1 : 1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return action.payload === "Desc" ? -1 : 1;
        } else {
          return 0;
        }
      });
      return {
        ...state,
        allNews: action.payload === "All" ? state.newNews : news,
      };
    case POST_FORUM:
      return {
        ...state,
        posts:action.payload,
        postsBackUp: action.payload,
      };
    case CLAIM_REWARDS:
      return {
        ...state,
        user: action.payload,
      };
    case GET_REWARDS:
      return {
        ...state,
        rewards: action.payload,
      };
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
      };
    case GET_REWARDS_BY_ID:
      return {
        ...state,
        rewardsById: action.payload,
      };
    case CONTAINER_POSTS:
      return {
        ...state,
        posts: action.payload,
        postsBackUp: action.payload,
      };
    case EDIT_POST:
      return {
        ...state,
        forumById:action.payload
      };
    case POST_FORUM_ANSWERS:
      return {
        ...state,
        forumById: action.payload,
      };
    case GET_FORUM:
      return {
        ...state,
        forumById: action.payload,
      };
    case CLEAN_NEWS_STATE:
      return {
        ...state,
        news: [],
      };
    case CLEAN_REWAR_STATE:
      return {
        ...state,
        rewards: [],
      };
    case CLEAN_ALLNEWS_STATE:
      return {
        ...state,
        allNews: [],
      };
    case CLEAN_GAMES_STATE:
      return {
        ...state,
        games: [],
      };
    case CLEAN_FORUM:
      return {
        ...state,
        forumById: [],
      };
    case ORDER_BY_COMMENTS:
      let post = [...state.posts];
      post =
        action.payload === "most"
          ? post.sort(function (b, a) {
              return a.answers.length - b.answers.length;
            })
          : post.sort(function (b, a) {
              return b.answers.length - a.answers.length;
            });
      return {
        ...state,
        posts: action.payload === "most" ? post : post,
      };
    case GET_GAMES_BY_ID:
      return {
        ...state,
        gamesDetails: action.payload,
      };
    case CLEAN_GAMES_BY_ID_STATE:
      return {
        ...state,
        gamesDetails: [],
      };
    case LOADING_USER:
      return {
        ...state,
        userLoading: false,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case REPORT_POST_FORUM:
      return {
        ...state,
        forumById: action.payload,
      };
      case GET_FRIENDS:
        return {
          ...state,
          friends: action.payload,
          friendsBackUp: action.payload,

        };
      case GET_ALL_CHATS:
        return {
          ...state,
          chats: action.payload,
        };
      case POST_CHAT:
        return{
          ...state,
          chats: action.payload
        }
      case PUT_MESSAGE:
        return{
          ...state,
        }
      case GET_NON_FRIENDS:
        return{
          ...state,
          nonFriends:action.payload
        }
      case ADD_FRIENDS:
        return{
          ...state,
          user:action.payload,
          chat:action.payload2,
          friends:action.payload3,
          friendsBackUp:action.payload3,
          nonFriends: action.payload4,
          users:action.payload5,
        }
      case SET_ADMIN: 
        return {
          ...state,
          user: action.payload
        }
      case UNSET_ADMIN:
        return {
          ...state,
          user: action.payload
        }
      case CLEAN_FORUM_EDIT:
        return{
          ...state,
          forumById:[]
        }
      case CLEAN_ALL_POST:
        return{
          ...state,
          posts:[],
          postsBackUp: []
        }
      case CLAIM_MISSION:
        return{
          ...state,
          user:action.payload,
          missions:action.payload2.sort(function (a, b) {
           			if (a.name < b.name) return -1;
            			else if (a.name > b.name) return 1;
            		else return 0;
             		}),
        }
      case CLEAN_ALL:
        return{
          ...state,
            users: [],
            user: {},
            allNews: [],
            news: {},
            rewards: [],
            games: [],
            rewardsById: [],
            forumById: [],
            gamesDetails: [],
            genres: [],
            posts: [],
            friends: [],
            nonFriends: [],
            chats:[],
        }
      case POST_MISSON:
        return{
          ...state,
        }
      case POST_REWARD:
        return{
          ...state,
        }
        case GET_ALL_MISSIONS:
          return{
            ...state,
            missions:action.payload.sort(function (a, b) {
              if (a.name < b.name) return -1;
              else if (a.name > b.name) return 1;
              else return 0;
            }),
          }
          case SEARCH_FRIENDS:
            let friendsFiltered = action.payload==="" || !action.payload ? state.friendsBackUp : state.friendsBackUp.filter(e=>e.nickname.toLowerCase().includes(action.payload.toLowerCase()))
            return{
              ...state,
              friends : friendsFiltered
            }
          case FILTER_BY_GENRES:
            let postsFiltered = action.payload==="all" ? state.postsBackUp : state.postsBackUp.filter(e=>e.genre===action.payload)
            return{
              ...state,
              posts : postsFiltered
            }
          case SEARCH_IN_FORUM:
            let searchPosts = action.payload==="" ? state.postsBackUp : state.postsBackUp.filter(e=>e.title.toLowerCase().includes(action.payload.toLowerCase()))
            return{
              ...state,
              posts : searchPosts,
              input: action.payload
            }
      default:
        return { ...state };
    }
  }
