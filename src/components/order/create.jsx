import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux'
import { showAlertAction, hideAlertAction } from '../../actions/alertActions'
import { createNewOrderAction, addItemCartAction, deleteItemCartAction, cancelCartAction } from '../../actions/orderActions'
import StepTwo from "./steps/stepTwo";
import StepOne from "./steps/stepOne";
import { TAXES } from "../../config/globals";


const CreateOrder = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cartItems = useSelector( state => state.orders.cart)
    
    const [step, StepCount] = useState(1)

    const [order, setOrder] = useState({
        shipping_name: '',
        shipping_address: '',
        shipping_address2: '',
        shipping_city: '',
        shipping_state: '',
        shipping_zip: '',
        billing_name: '',
        billing_address: '',
        billing_address2: '',
        billing_city: '',
        billing_state: '',
        billing_zip: '',
        payment_method_id: '',
        total_cost: 0,
        tax: TAXES
        
    })

     // Destructuring
     const { shipping_name,
        shipping_address,
        shipping_address2,
        shipping_city,
        shipping_state,
        shipping_zip,
        billing_name,
        billing_address,
        billing_address2,
        billing_city,
        billing_state,
        billing_zip, payment_method_id, total_cost } = order; 

    const handleSubmit = e => {
        e.preventDefault()
        if(
            shipping_name.trim() === '' ||
            shipping_address.trim() === '' ||
            shipping_address2.trim() === '' ||
            shipping_city.trim() === '' ||
            shipping_state.trim() === '' ||
            shipping_zip.trim() === '' ||
            billing_name.trim() === '' ||
            billing_address.trim() === '' ||
            billing_address2.trim() === '' ||
            billing_city.trim() === '' ||
            billing_state.trim() === '' ||
            billing_zip.trim() === '' ||
            payment_method_id.trim() === '' ||
            total_cost === 0
        ){
            const alert = {
                msg: "All fields are required.",
                classes: "text-center font-bold uppercase text-red-700"
            }
            dispatch(showAlertAction(alert))
            return
        }
        hideAlertAction()    
        dispatch(createNewOrderAction(order, cartItems))
    
        setOrder({
            shipping_name: '',
            shipping_address: '',
            shipping_address2: '',
            shipping_city: '',
            shipping_state: '',
            shipping_zip: '',
            billing_name: '',
            billing_address: '',
            billing_address2: '',
            billing_city: '',
            billing_state: '',
            billing_zip: '',
            payment_method_id: '',
            total_cost: 0,
            tax:TAXES
        })

        dispatch(cancelCartAction())

        setTimeout(() => {
            navigate('/admin/order')
        }, 1000);
        
        
    }

    return ( 
        <>
            <form action="" onSubmit={handleSubmit}>

                <h1 className="text-gray-700 text-2xl uppercase text-center py-2 font-bold">Create a new order</h1>
                {
                    step === 1 ? 
                        <StepOne
                            StepCount = {StepCount}
                        />
                    : null
                }
                { 
                    step === 2 ? 
                        <StepTwo 
                            StepCount = {StepCount}
                            order = {order}
                            setOrder = {setOrder}
                            cartItems={cartItems}
                        /> 
                    : null
                }
            </form>
        </>
    );
}
 
export default CreateOrder;