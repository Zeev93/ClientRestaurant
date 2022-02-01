import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux'
import { showAlertAction, hideAlertAction } from '../../actions/alertActions'

import { createNewCategoryAction } from '../../actions/categoryActions'


const CreateCategory = () => {

    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector( state => state.categories.errors )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Initialize
    const [category, setCategory] = useState({
        name: ''
    })    
    // Destructuring
    const { name } = category; 

    const handleChange = e => {
        setCategory({
            ...category,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(name.trim() === ''){
            const alert = {
                msg: "All fields are required.",
                classes: "text-center font-bold uppercase text-red-700"
            }
            dispatch(showAlertAction(alert))
            return
        }


        hideAlertAction()    
        dispatch(createNewCategoryAction(category))
    
        setCategory({
            name: ''
        })

        setTimeout(() => {
            navigate('/admin/category')
        }, 1000);
        
    }



    return ( 
        <form action="" className="m-auto" onSubmit={handleSubmit}>
            <h1 className="text-gray-700 text-2xl uppercase text-center py-2 font-bold">Create a new category</h1>
            <div className="py-5">
                <label htmlFor="name" className="text-gray-700 font-bold uppercase"> Category Name: </label>
                <input type="text" name="name" id="name" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={name}/>
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
                <Link to={'/admin/category'} className="font-bold bg-gray-300 rounded p-3 text-gray-700 uppercase hover:bg-gray-700 hover:text-white text-center">Cancel</Link>
            </div>
        </form>
    );
}
 
export default CreateCategory;