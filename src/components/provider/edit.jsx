import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux'
import { showAlertAction, hideAlertAction } from '../../actions/alertActions'
import { editProviderAction, updateProviderAction } from "../../actions/providerActions";
import { useEffect } from "react";

const EditProvider = () => {

    const params = useParams()

    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector ( state => state.providers.errors )
    const editProvider = useSelector( state => state.providers.edit)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [provider, setProvider] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    })

    useEffect( () => {
        if(!editProvider){
            dispatch(editProviderAction(params.id))
        }
        setProvider(editProvider)
    }, [editProvider])

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

        dispatch(hideAlertAction())
        dispatch(updateProviderAction(provider))
        
        setTimeout(() => {
            navigate('/admin/provider')
        }, 1000);

    }


    return ( 

        <form action="" className="w-full px-10" onSubmit={handleSubmit}>
            <h1 className="text-gray-700 text-2xl uppercase text-center py-2 font-bold">Edit provider</h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="py-5">
                    <label htmlFor="name" className="text-gray-700 font-bold uppercase"> Provider Name: </label>
                    <input type="text" name="name" id="name" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={name || ''}/>
                </div>
                <div className="py-5">
                    <label htmlFor="email" className="text-gray-700 font-bold uppercase"> Provider Email: </label>
                    <input type="text" name="email" id="email" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={email || ''}/>
                </div>
                <div className="py-5">
                    <label htmlFor="phone" className="text-gray-700 font-bold uppercase"> Provider Phone: </label>
                    <input type="text" name="phone" id="phone" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={phone || ''}/>
                </div>
                <div className="py-5">
                    <label htmlFor="address" className="text-gray-700 font-bold uppercase"> Provider Address: </label>
                    <textarea name="address" id="address" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={address || ''} > </textarea>
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
                <button type="submit" className="font-bold bg-gray-700 rounded p-3 text-white uppercase hover:bg-gray-300 hover:text-gray-700"> Modify </button>
                <Link to={'/admin/provider'} className="font-bold bg-gray-300 rounded p-3 text-gray-700 uppercase hover:bg-gray-700 hover:text-white text-center">Cancel</Link>
            </div>
        </form>

     );
}
 
export default EditProvider;