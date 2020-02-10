import { ICON_FLAG, GET_POST, DELETE_POST, GET_POSTS, ADD_POST, POST_LOADDING } from '../actions/typs';

const initialState = {
    posts: [],
    post: {},
    loading: false,
    icon_flag: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case POST_LOADDING:
            return {
                ...state,
                loading: true
            }
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            }
        case ICON_FLAG:
            return {
                ...state,
                icon_flag: true
            }
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        default:
            return state
    }
}