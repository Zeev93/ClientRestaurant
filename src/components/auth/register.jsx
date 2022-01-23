import React from 'react';
import {Link} from 'react-router-dom'

const Register = () => {
    return ( 
        <>

        <div className='min-h-screen w-full flex bg-gray-200'>
            <div className='w-3/12 m-auto shadow-lg rounded p-10 bg-white'>
                <h1 className='text-gray-700 text-2xl uppercase text-center py-2 font-bold'>Register</h1>
                <form action="">
                    <div className='py-2'>
                        <label htmlFor="name" className='text-gray-700 font-bold uppercase'>name</label>
                        <input type="text" id="name" name='name' className='rounded block py-2 border shadow w-full px-3' />
                    </div>
                    <div className='py-2'>
                        <label htmlFor="email" className='text-gray-700 font-bold uppercase'>E-mail</label>
                        <input type="email" id="email" name='email' className='rounded block py-2 border shadow w-full px-3' />
                    </div>
                    <div className='py-2'>
                        <label htmlFor="password" className='text-gray-700 font-bold uppercase'>password</label>
                        <input type="password" id="password" name='password' className='rounded block py-2 border shadow w-full px-3' />
                    </div>
                    <div className='py-2'>
                        <label htmlFor="confirm-password" className='text-gray-700 font-bold uppercase'>confirm password</label>
                        <input type="confirm-password" id="confirm-password" name='confirm-password' className='rounded block py-2 border shadow w-full px-3' />
                    </div>
                    <div className="py-5 grid grid-cols-2 gap-5">
                        <button type='submit' className=' font-bold bg-gray-700 rounded p-3 text-white uppercase hover:bg-gray-300 hover:text-gray-700'>
                            Sign In
                        </button>
                        <Link to={'/login'} className='text-gray-700 m-auto uppercase hover:underline hover:text-gray-500'>Already Registered?</Link>
                    </div>
                </form>
            </div>
        </div>
            

        </>
     );
}
 
export default Register;