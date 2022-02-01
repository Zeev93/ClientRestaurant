import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux'
import { showAlertAction, hideAlertAction } from '../../actions/alertActions'
import { editProductAction, updateProductAction } from "../../actions/productActions";
import { useEffect } from "react";

const EditProduct = () => {

    const params = useParams()

    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector ( state => state.products.errors )
    const editProduct = useSelector( state => state.products.edit)

    const dispatch = useDispatch();
    const navigate = useNavigate();


    
    const [product, setProduct] = useState({
        name: '',
        image:'',
        minimal_stock: '',
        status: '',
        cost: '',
        price: '',
        description: ''
    })

    useEffect( () => {
        if(!editProduct){
            dispatch(editProductAction(params.id))
        }
        setProduct(editProduct)
    }, [editProduct])

    const {name, image, minimal_stock, status, cost, price, description} = product

    const handleChange = e => {
        setProduct({
            ...product,
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

        dispatch(hideAlertAction())
        dispatch(updateProductAction(product))
        
        setTimeout(() => {
            navigate('/admin/product')
        }, 1000);

    }


    return ( 
        <>

            <form action="" className="w-full px-5" onSubmit={handleSubmit}>
                <h1 className="text-gray-700 text-2xl uppercase text-center py-2 font-bold">Edit product</h1>
                <div className="grid grid-cols-2 gap-5">
                    <div className="py-5 row-span-3">
                        <div className="shadow rounded w-full my-1 flex">
                            <img className="m-auto" src="https://picsum.photos/seed/picsum/200/200" alt="" />
                        </div>
                        <label htmlFor="image" className="text-gray-700 font-bold uppercase"> Product Image: </label>
                        <input type="file" name="image" id="image" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} />
                    </div>
                    <div className="pt-5 col-span-1">
                        <label htmlFor="name" className="text-gray-700 font-bold uppercase"> Product Name: </label>
                        <input type="text" name="name" id="name" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={name || ''}/>
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="name" className="text-gray-700 font-bold uppercase"> Status: </label>
                        <select name="status" id="status" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={status}>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="minimal_stock" className="text-gray-700 font-bold uppercase"> Minimal Stock: </label>
                        <input type="text" name="minimal_stock" id="minimal_stock" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={minimal_stock || ''}/>
                    </div>
                    <div className="py-5">
                        <label htmlFor="cost" className="text-gray-700 font-bold uppercase"> Cost Price ($) : </label>
                        <input type="text" name="cost" id="cost" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={cost || ''}/>
                    </div>
                    <div className="py-5">
                        <label htmlFor="price" className="text-gray-700 font-bold uppercase"> Sale Price ($) : </label>
                        <input type="text" name="price" id="price" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={price || ''}/>
                    </div>
                    <div className="py-5 col-span-2">
                        <label htmlFor="name" className="text-gray-700 font-bold uppercase"> Description: </label>
                        <textarea name="description" id="description" rows="7" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={description || ''}>
                            
                        </textarea>
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
                    <Link to={'/admin/product'} className="font-bold bg-gray-300 rounded p-3 text-gray-700 uppercase hover:bg-gray-700 hover:text-white text-center">Cancel</Link>
                </div>
            </form>
                    
        </>
     );
}
 
export default EditProduct;