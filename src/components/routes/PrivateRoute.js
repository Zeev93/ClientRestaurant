import React, { useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux'
import {Navigate, Outlet } from 'react-router-dom'
import { getUserInfo } from '../../actions/authActions';


const PrivateRoute = () => {

    const dispatch = useDispatch()
    const check = useSelector(state => state.auth)
    const {auth,  loading} = check

    useEffect( () => {
        dispatch(getUserInfo())
        // eslint-disable-next-line
    }, [])

    return (        
        (!auth && !loading ) ? <Navigate to={"/login"} /> : <Outlet/>
    )
}

export default PrivateRoute