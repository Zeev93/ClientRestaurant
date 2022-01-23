import React, { useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux'
import {Route, Navigate, Outlet } from 'react-router-dom'
import { getUserInfo } from '../../actions/authActions';


const PublicRoute = () => {

    const dispatch = useDispatch()
    const check = useSelector(state => state.auth)
    const {auth,  loading, token} = check
    
    useEffect( () => {
        dispatch( getUserInfo())
        // eslint-disable-next-line
    }, [])

   
    return (
        auth  ?  <Navigate to={"/dashboard"} /> : <Outlet/>
    )
}

export default PublicRoute