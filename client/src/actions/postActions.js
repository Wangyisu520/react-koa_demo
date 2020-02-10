import axios from 'axios'
import { GET_POST, DELETE_POST, GET_POSTS, ADD_POST, GET_ERRORS, POST_LOADDING } from './typs'

//添加评论
export const addPost = (newPost) => dispatch => {
    axios.post("api/posts", newPost)
        .then(res => {
            dispatch({
                type: ADD_POST,
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

//获取评论
export const getPosts = () => dispatch => {
    dispatch(setPostLoading);
    axios.get("api/posts/all")
        .then(res => {
            dispatch({
                type: GET_POSTS,
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

//点赞
export const addLike = (id) => dispatch => {
    axios.post(`api/posts/like?id=${id}`)
        .then(res => {
            // window.location.reload()
            dispatch(getPosts())

        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//取消点赞
export const removeLike = (id) => dispatch => {
    axios.post(`api/posts/unlike?id=${id}`)
        .then(res => {
            // window.location.reload()
            dispatch(getPosts())
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//删除评论
export const deletePost = (id) => dispatch => {
    axios.delete(`api/posts?id=${id}`)
        .then(res => {
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//获取评论
export const getPost = (id) => dispatch => {
    dispatch(setPostLoading);
    axios.get(`/api/posts?id=${id}`)
        .then(res => {
            dispatch({
                type: GET_POST,
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

//添加留言
export const addComment = (id, commentData) => dispatch => {
    axios.post(`/api/posts/comment?id=${id}`, commentData)
        .then(res => {
            dispatch({
                type: GET_POST,
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

//删除留言
export const deleteComment = (postId, commentId) => dispatch => {
    axios.delete(`/api/posts/comment?id=${postId}&comment_id=${commentId}`)
        .then(res => {
            dispatch({
                type: GET_POST,
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

export const setPostLoading = () => {
    return {
        type: POST_LOADDING
    }
}