import axios from 'axios';

import{
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    REGISTER_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    UPDATE_USER_SUCCESS,
    DELETE_USER_REQUEST,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,
} from '../constants/userConstants';


const BackendPrefix = "http://localhost:4000/api/v1"
//Login
export const login = (email, password) => async (dispatch) => {
    try{

        dispatch({type: LOGIN_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }

        const {data} = await axios.post(`${BackendPrefix}/login`, {email, password} ,  config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user,

        })


    } catch (error){
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

//register user
export const register = (userData) => async(dispatch) => {
    try{
        dispatch({type: REGISTER_USER_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }
        const {data} = await axios.post(`${BackendPrefix}/register`,userData, config);

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })


    }catch(error){
        
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })

    }

}

//load user
export const loadUser = () => async(dispatch) => {
    try{
        dispatch({type: LOAD_USER_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }


        const {data} = await axios.get(`${BackendPrefix}/me`, config);
        

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })


    }catch(error){
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })

    }

}



//logout user
export const logout = () => async(dispatch) => {
    try{

        const config = {withCredentials: true}

        await axios.get(`${BackendPrefix}/logout`, config);

        localStorage.clear()
        dispatch({
            type: LOGOUT_SUCCESS,
        })


    }catch(error){
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })

    }

}


export const changePassword = (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    try{
        dispatch({type: CHANGE_PASSWORD_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }

        const {data} = await axios.put(`${BackendPrefix}/password/change`, {currentPassword, newPassword, confirmNewPassword}, config);


        const token = data.token;
        localStorage.setItem('token', token)
        
        dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
            payload: data.message
        })
    } catch (error){
        dispatch({
            type: CHANGE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}


// Get all users
export const allUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/users')

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update user - ADMIN
export const updateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config)

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get user details - ADMIN
export const getUserDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST })


        const { data } = await axios.get(`/api/v1/admin/user/${id}`)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete user - ADMIN
export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


//clear errors
export const clearErrors = () => async (dispatch) => {

    dispatch({
            type: CLEAR_ERRORS
        })
}