import clientAxios from '../config/axios'
import {LOGIN_SUCCESS, LOGIN_ERROR, GET_USER, LOG_OUT,} from '../types'
import tokenAuth from '../config/tokenAuth'
import Swal from 'sweetalert2'

export function loginAction(login){
    return (dispatch) => {
        clientAxios.post('/login', login)
        .then ( response => {
            dispatch( loginSuccess(response.data) ) 
            dispatch(getUserInfo())
                Swal.fire(
                    'Login correct',
                    'Redirecting... ',
                    'success'
                  )
        })
        .catch( error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.msg
              })
            dispatch(loginError())
        })
    }
}

const loginSuccess = payload => ({
    type: LOGIN_SUCCESS,
    payload
})

const loginError = () => ({
    type: LOGIN_ERROR
})

export function getUserInfo() {
    return async (dispatch) => {
        const token = localStorage.getItem('Bearer')
        if( token ){
            tokenAuth(token)
        }
        await clientAxios.get('user')
        .then( response => {
            dispatch({
                type:GET_USER,
                payload: response.data
            })
        }).catch ( error => {
            dispatch({
                type: LOGIN_ERROR
            })
        })
    }
}

export function logOutAction(){
    return (dispatch) => dispatch({
        type: LOG_OUT
    })
}