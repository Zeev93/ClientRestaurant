import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux'
import { showAlertAction, hideAlertAction } from '../../actions/alertActions'

import { createNewProviderAction } from '../../actions/providerActions'


const CreateProvider = () => {

    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector( state => state.categories.errors )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Initialize
    const [provider, setProvider] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    })    
    // Destructuring
    const { name, email, phone, address } = provider; 

    const handleChange = e => {
        setProvider({
            ...provider,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(name.trim() === '' || email.trim() === '' || phone.trim() === '' || address.trim() === ''){
            const alert = {
                msg: "All fields are required.",
                classes: "text-center font-bold uppercase text-red-700"
            }
            dispatch(showAlertAction(alert))
            return
        }


        hideAlertAction()    
        dispatch(createNewProviderAction(provider))
    
        setProvider({
            name: '',
            email: '',
            phone: '',
            address: ''
        })

        setTimeout(() => {
            navigate('/provider')
        }, 1000);
        
    }



    return ( 

        <form action="" className="m-auto" onSubmit={handleSubmit}>
            <h1 className="text-gray-700 text-2xl uppercase text-center py-2 font-bold">Create a new provider</h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="py-5">
                    <label htmlFor="name" className="text-gray-700 font-bold uppercase"> Provider Name: </label>
                    <input type="text" name="name" id="name" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={name}/>
                </div>
                <div className="py-5">
                    <label htmlFor="email" className="text-gray-700 font-bold uppercase"> Provider Email: </label>
                    <input type="text" name="email" id="email" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={email}/>
                </div>
                <div className="py-5">
                    <label htmlFor="phone" className="text-gray-700 font-bold uppercase"> Provider Phone: </label>
                    <input type="text" name="phone" id="phone" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={phone}/>
                </div>
                <div className="py-5">
                    <label htmlFor="address" className="text-gray-700 font-bold uppercase"> Provider Address: </label>
                    <input type="text" name="address" id="address" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={address}/>
                </div>
            </div>
            <div>
                { errors ?  
                    Object.values(errors).map( (item, key) => (
                        <p key={key} className="text-red-500 font-bold uppercase"> {item} </p>
                    ))
                : ''}
                {
                    alert ? <p className="text-red-500 font-bold uppercase text-center"> {alert.msg} </p> : ''
                }
            </div>
            <div className="py-5 grid grid-cols-2 gap-2">
                <button type="submit" className="font-bold bg-gray-700 rounded p-3 text-white uppercase hover:bg-gray-300 hover:text-gray-700"> Create </button>
                <button type="button" onClick={ () => { navigate(-1) } } className="font-bold bg-gray-300 rounded p-3 text-gray-700 uppercase hover:bg-gray-700 hover:text-white text-center">Cancel</button>
            </div>
        </form>
                    
    );
}
 
export default CreateProvider;