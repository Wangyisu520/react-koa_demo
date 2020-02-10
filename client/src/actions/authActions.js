import { GET_ERRORS,SET_CURRENT_USER } from './typs'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'

//注册
export const registerUser = (UserDate, history) => dispatch => {
    axios.post("api/users/register", UserDate)
        .then(res => {
            // console.log(res.data)
            history.push("/login")
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//登陆
export const loginUser = userData => dispatch => {
    axios.post("api/users/login", userData)
        .then(res => {
            const { token } = res.data;
            // console.log(token)
            localStorage.setItem("jwtToken", token);
            setAuthToken(token)

            //解析token
            const decode = jwt_decode(token);
            // console.log(decode)
            dispatch(setCurrentUser(decode))
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

//退出
export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = decode => {
    // let newDecode ={}
    // if (decode.exp) {
    //     newDecode = decode
    // } else {
    //     newDecode = {
    //         ...decode,
    //         exp:0
    //     }
    // }
    return {
        type: SET_CURRENT_USER,
        payload: decode
    }
}