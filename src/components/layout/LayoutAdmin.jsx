import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUserInfo, logOutAction } from '../../actions/authActions';


const LayoutAdmin = (props) => {
    const { children } = props

    const dispatch = useDispatch()
    const check = useSelector(state => state.auth)
    const {auth,  loading, token} = check
    const navigate = useNavigate()

    useEffect( () => {
        dispatch(getUserInfo())
        // eslint-disable-next-line
    }, [])
     
    if (!auth && !loading){
        navigate("/login")
    }
    const logOut = () => {
        dispatch(logOutAction())
    }

    return ( 
        <>
        <div className='flex'>
            <aside className='min-h-screen w-64 shadow flex-col justify-between hidden sm:flex bg-gray-700'>
                <ul className='my-12'>
                    <Link to={'/admin'}><li className='text-white font-bold py-2 text-center uppercase shadow'>Dashboard</li></Link>
                    <Link to={'/admin/category'}><li className='text-white font-bold py-2 text-center uppercase shadow'>Categories</li></Link>
                    <Link to={'/admin/product'}><li className='text-white font-bold py-2 text-center uppercase shadow'>Products</li></Link>
                    <Link to={'/admin/provider'}><li className='text-white font-bold py-2 text-center uppercase shadow'>Providers</li></Link>

                    <Link to={'/admin/purchase'}><li className='text-white font-bold py-2 text-center uppercase shadow'>Purchases</li></Link>
                    <Link to={'/admin/order'}><li className='text-white font-bold py-2 text-center uppercase shadow'>Orders</li></Link>
                </ul>
            </aside>
            <div className="w-11/12 bg-gray-200">
                <nav className='bg-white py-3 px-2 flex shadow w-full '>
                    <Link to={'/'} className='text-gray-700 font-bold uppercase'> AbrahamAG-CRM </Link>

                    <span className='ml-auto text-gray-700 font-bold uppercase'> Abraham </span>
                    <button className='mx-5 text-gray-700 font-bold uppercase' onClick={ logOut }> Log out </button>
                </nav>
                <div className="content">
                    <div className="m-10 bg-white shadow border rounded-lg p-5">  
                       {children}
                    </div>
                </div>
            </div>
        </div>
        </> 
    );
}
 
export default LayoutAdmin;