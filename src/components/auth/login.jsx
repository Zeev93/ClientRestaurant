import React from 'react';
import { useState } from 'react';
import {useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { loginAction } from '../../actions/authActions';
import { showAlertAction, hideAlertAction } from '../../actions/alertActions'

const Login = () => {

    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    const alert = useSelector( state => state.alert.alert )

    const dispatch = useDispatch()

    const {email, password} = login

    const handleChange = e => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(email.trim() === '' || password.trim() === ''){
            const alert = {
                msg: "All fields are required.",
                classes: "text-center font-bold uppercase text-red-700"
            }
            dispatch(showAlertAction(alert))
            return
        }
        dispatch(hideAlertAction())
        submitLogin(login)
    }

    const submitLogin = login => dispatch(loginAction(login))

    return ( 
        <>
        <h1 className='text-gray-700 text-2xl uppercase text-center py-2 font-bold'>Login</h1>
        <form action="" onSubmit={handleSubmit}>
            {alert ? <p className={alert.classes} role="alert"> {alert.msg} </p> : null}
            <div className='py-2'>
                <label htmlFor="email" className='text-gray-700 font-bold uppercase'>E-mail</label>
                <input type="text" id="email" name='email' className='rounded block py-2 border shadow w-full px-3' onChange={handleChange}/>
            </div>
            <div className='py-2'>
                <label htmlFor="password" className='text-gray-700 font-bold uppercase'>password</label>
                <input type="password" id="password" name='password' className='rounded block py-2 border shadow w-full px-3' onChange={handleChange}/>
            </div>
            <div className="py-5 grid grid-cols-2 gap-2">
                <button type='submit' className=' font-bold bg-gray-700 rounded p-3 text-white uppercase hover:bg-gray-300 hover:text-gray-700'>
                    Log In
                </button>
                <Link to={'/register'} className='text-gray-700 m-auto uppercase hover:underline hover:text-gray-500'>Not Registered?</Link>
            </div>
        </form>
        </>
     );
}
 
export default Login;