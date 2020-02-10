import axios from 'axios'
import { GET_PROFILES, GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_RPOFILE, GET_ERRORS, SET_CURRENT_USER } from './typs'


export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading())

    axios.get("api/profile")
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data[0]
            })
        })
        .catch(err => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

export const clearCurrentProfile = () => dispatch => {
    dispatch({
        type: CLEAR_CURRENT_RPOFILE
    })
}

//创建个人信息
export const createProfile = (profileData, history) => dispatch => {
    axios.post("api/profile", profileData)
        .then(res => {
            history.push("/dashboard")
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//删除账户信息
export const deleteAccout = () => dispatch => {
    axios.delete('api/profile')
        .then(res => {
            dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//添加个人经历
export const addExperience = (expData, history) => dispatch => {
    axios.post("api/profile/experience", expData)
        .then(res => history.push("/dashboard"))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//添加教育经历
export const addEducation = (eduData, history) => dispatch => {
    axios.post("api/profile/education", eduData)
        .then(res => history.push("/dashboard"))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//删除个人经历
export const deleteExperience = (id) => dispatch => {
    axios.delete(`api/profile/experience?exp_id=${id}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//删除教育经历
export const deleteEducation = (id) => dispatch => {
    axios.delete(`api/profile/education?edu_id=${id}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//获取全部用户
export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get('api/profile/all')
        .then(res => {
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// 根据handle获取个人信息
export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading())
    axios(`/api/profile/handle?handle=${handle}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: null
            })
        })
}