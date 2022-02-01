import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom'

const LayoutLog = (props) => {
   
    const { children } = props

    const dispatch = useDispatch()
    const check = useSelector(state => state.auth)
    const {auth} = check

    const navigate = useNavigate()
    useEffect( () => {
        dispatch( getUserInfo())
        // eslint-disable-next-line
    }, [])

    if(auth) {
        navigate("/admin")
    }    

    return (  
        <div className='min-h-screen w-full flex bg-gray-200'>
            <div className='w-3/12 m-auto shadow-lg rounded p-10 bg-white'>
                {children}
            </div>
        </div>
    );
}


 
export default LayoutLog;