import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux'
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { showAlertAction, hideAlertAction } from '../../actions/alertActions'
import { createNewPurchaseAction, addItemCartAction, deleteItemCartAction, cancelCartAction } from '../../actions/purchaseActions'

import {getProvidersAction, getProviderProductsAction } from '../../actions/providerActions'
import Swal from "sweetalert2";


const CreatePurchase = () => {

    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector( state => state.purchases.errors )
    const providers = useSelector(state => state.providers.providers)
    const products = useSelector(state => state.providers.products)

    const cartItems = useSelector( state => state.purchases.cart)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Initialize
    const [purchase, setPurchase] = useState({
        description: '',
        payment: '',
        provider: ''
    })

    const [alertCart, setAlertCart] = useState({
        status: false,
        id:0
    })

    useEffect(() => {
        dispatch(getProvidersAction())
        // eslint-disable-next-line
    }, [])

    // Destructuring
    const { description, payment, provider } = purchase; 


    const handleAdd = (e, param) => {
        e.preventDefault()
        
        const input = document.getElementById(`inpt-${param}`)
        let amount = input.value
        if(amount && amount > 0){
            let id = param
            let name = input.dataset.name
            let cost = input.dataset.cost
            let stock = input.dataset.stock
            const item = {
                id,
                name,
                amount,
                cost,
                stock
            }
            setAlertCart({
                status: false,
                id: 0 
            })
            dispatch(addItemCartAction(item))
            input.value = ''
        }else{
            setAlertCart({
                status: true,
                id: param
            })
        }
    }

    const handleDelete = (e, id) => {
        e.preventDefault()
        dispatch(deleteItemCartAction(id))
    }

    const handleChangeProvider = (id) => {
        setPurchase({
            ...purchase,
            provider: id
        })
        dispatch(getProviderProductsAction(id))
    }

    const handleChange = e => {
        setPurchase({
            ...purchase,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(description.trim() === ''){
            const alert = {
                msg: "All fields are required.",
                classes: "text-center font-bold uppercase text-red-700"
            }
            dispatch(showAlertAction(alert))
            return
        }
        hideAlertAction()    
        dispatch(createNewPurchaseAction(purchase, cartItems))
    
        setPurchase({
            description: "",
            payment: "",
            provider: ""
        })

        dispatch(cancelCartAction())

        setTimeout(() => {
            navigate('/purchase')
        }, 1000);
        
        
    }


    const cancelOrder = (e) => {
        e.preventDefault()

        if(cartItems.length > 0){
            Swal.fire({
                title: 'You want to leave?',
                text: "Your cart will be set empty!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, leave!'
              }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(cancelCartAction())
                    navigate('/purchase')
                }
              })
        }
        else{
            navigate('/purchase')  
        }
       
    }


    return ( 
        <>
        <div className='flex'>
            <Sidebar/>
            <div className="w-11/12 bg-gray-200">
                <Header/>
                <div className="content">
                    <div className="my-10 m-auto bg-white shadow border rounded-lg p-5 flex w-2/3">
                        <form action="" className="w-full mx-10" onSubmit={handleSubmit}>
                            <h1 className="text-gray-700 text-2xl uppercase text-center py-2 font-bold">Create a new purchase</h1>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="py-5">
                                    <label htmlFor="description" className="text-gray-700 font-bold uppercase"> Purchase Description: </label>
                                    <input type="text" name="description" id="description" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={description}/>
                                </div>
                                <div className="py-5">
                                    <label htmlFor="payment" className="text-gray-700 font-bold uppercase"> Payment Method: </label>
                                    <select name="payment" id="payment" className="text-gray-700 rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={payment}>
                                        <option value="" disabled>- Select a payment method -</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Transfer">Transfer</option>
                                        
                                    </select>
                                </div>
                                <div className="">
                                    <label htmlFor="provider" className="text-gray-700 font-bold uppercase"> Provider </label>
                                    <select name="provider" id="provider" className="text-gray-700 rounded block py-2 border shadow w-full px-3" onChange={( e ) => handleChangeProvider(e.target.value)} value={provider} >
                                        <option >- Select Provider -</option>
                                        { providers ?
                                            providers.map( provider => (
                                                <option key={provider.id} value={provider.id}> {provider.name} </option>
                                            )) 
                                            :
                                            <option value=""> Loading... </option>
                                        }
                                    </select>
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

                            <hr className="my-10" />

                            <table className="w-full table-auto border shadow-sm rounded">
                                <thead className="border-2">
                                    <tr className="text-gray-700 font-bold uppercase">
                                        <th>Name</th>
                                        <th>Stock</th>
                                        <th>Minimal Stock</th>
                                        <th>Unit Cost</th>
                                        <th>Amount</th>
                                        <th>To Cart</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                       products ?
                                        products.map( product => (
                                            <tr key={product.id} className="text-center  py-3">
                                                <td>{product.name}</td>
                                                <td>{product.stock}</td>
                                                <td>{product.minimal_stock}</td>
                                                <td>${product.cost}</td>
                                                <td>
                                                    <input type="text" data-stock={product.stock} data-cost={product.cost} data-name={product.name} id={ `inpt-${product.id}` } className={`rounded m-auto w-16 py-2 border shadow block px-3 inputAmount ${ alertCart.status && alertCart.id === product.id  ? 'border-red-500' : ''} `}/>
                                                </td>
                                                <td>
                                                    <button onClick={ (e) => {handleAdd(e, product.id)}} type="button" className="font-bold bg-gray-700 rounded p-3 text-white uppercase hover:bg-gray-300 hover:text-gray-700"> + </button>
                                                </td>
                                            </tr>
                                        ))
                                        :
                                        null
                                    }
                                </tbody>
                            </table>

                            <hr className="my-10" />

                            <h2 className="text-gray-700 text-xl uppercase text-center py-2 font-bold"> Shopping List </h2>

                            <div className="grid grid-cols-4 gap-3 text-center py-3 uppercase text-gray-700 font-bold">
                                <p>Name</p>
                                <p>Amount</p>
                                <p>Total($)</p>
                                <p> </p>
                            </div>
                                { cartItems && cartItems.length > 0 ? 
                                
                                cartItems.map( (item, i)  => (
                                        <div key={i} className="grid grid-cols-4 gap-3 text-center text-gray-600 py-2">
                                            <p>{item.name}</p>
                                            <p>{item.amount}</p>
                                            <p>{item.cost * item.amount}</p>
                                            <button onClick={ (e) => {handleDelete(e, item.id)} } className="font-bold block w-24 m-auto bg-gray-700 rounded p-3 text-white uppercase hover:bg-gray-300 hover:text-gray-700"> Cancel </button>
                                        </div>

                                    ))
                                    :
                                    <p className="text-center bold uppercase py-5 text-gray-700"> There are any product on shopping list </p>
                                }
                                

                            <div className="py-10 grid grid-cols-2 gap-2">
                                <button type="submit" className="font-bold bg-gray-700 rounded p-3 text-white uppercase hover:bg-gray-300 hover:text-gray-700"> Purchase </button>
                                <button type="button" onClick={ (e) => {cancelOrder(e)} } className="font-bold bg-gray-300 rounded p-3 text-gray-700 uppercase hover:bg-gray-700 hover:text-white text-center">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
 
export default CreatePurchase;