import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {price_with_tax, TAXES}  from '../../../config/globals'


const StepTwo = ({StepCount, order , setOrder, cartItems}) => {


    const errors = useSelector( state => state.orders.errors )
    const alert = useSelector( state => state.alert.alert )
    

    // Initialize
    const [checked, setChecked] = useState(false)

    const handleBilling = (e, checked) => {
        let value = !checked
        setChecked( value )
        const billing_inpt = document.querySelectorAll('.billing')

        if (value) {

            setOrder({
                ...order,
                billing_name : shipping_name,
                billing_address : shipping_address,
                billing_address2 : shipping_address2,
                billing_city : shipping_city,
                billing_state : shipping_state,
                billing_zip : shipping_zip,
            })
        
        billing_inpt.forEach(item => {
            item.readOnly = true
        })
       
            
        }else{
            setOrder({
                ...order,
                billing_name : "",
                billing_address : "",
                billing_address2 : "",
                billing_city : "",
                billing_state : "",
                billing_zip : "",
            })

        billing_inpt.forEach(item => {
            item.readOnly = false
        })
        }
    }
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



    const handleChange = e => {
        setOrder({
            ...order,
            [e.target.name] : e.target.value
        })
    }

    useEffect( () => {
        setOrder({
            ...order,
            total_cost: cartItems.map(item => item.total).reduce((prev, curr) => prev + curr, 0)
        })
    }, [])

    

    

    return ( 
        <>
            <div className="grid grid-cols-3 gap-5 pt-5">
                <div>
                    <label htmlFor="shipping_name" className="text-gray-700 font-bold uppercase"> Client Name: </label>
                    <input type="text" name="shipping_name" id="shipping_name" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={shipping_name}/>
                </div>
                <div>
                    <label htmlFor="shipping_state" className="text-gray-700 font-bold uppercase"> Shipping State </label>
                    <input type="text" name="shipping_state" id="shipping_state" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={shipping_state}/>
                </div>
                <div>
                    <label htmlFor="shipping_city" className="text-gray-700 font-bold uppercase"> Shipping City </label>
                    <input type="text" name="shipping_city" id="shipping_city" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={shipping_city}/>
                </div>
                
                <div className="col-span-2">
                    <label htmlFor="shipping_address" className="text-gray-700 font-bold uppercase"> Shipping Address: </label>
                    <input type="text" name="shipping_address" id="shipping_address" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={shipping_address}/>
                </div>
                <div>
                    <label htmlFor="shipping_zip" className="text-gray-700 font-bold uppercase"> Shipping Zip Code </label>
                    <input type="text" name="shipping_zip" id="shipping_zip" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={shipping_zip}/>
                </div>
                <div className="col-span-2">
                    <label htmlFor="shipping_address2" className="text-gray-700 font-bold uppercase"> Shipping Address 2: </label>
                    <input type="text" name="shipping_address2" id="shipping_address2" className="rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={shipping_address2}/>
                </div>                    
                <div>
                    <label htmlFor="payment_method_id" className="text-gray-700 font-bold uppercase"> Payment Method: </label>
                    <select name="payment_method_id" id="payment_method_id" className="text-gray-700 rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={payment_method_id}>
                        <option value="" disabled>- Select a payment method -</option>
                        <option value="1">Cash</option>
                        <option value="2">Transfer</option>
                        
                    </select>
                </div>
            </div>
            <hr  className="my-10"/>
            <div className="grid grid-cols-3 gap-5 py-5">
                <div className="col-span-3">
                    <input type="checkbox" id="billing_info" checked={checked} className="rounded py-2 border shadow px-3" onChange={ (e) => handleBilling(e, checked) }/>
                    <label htmlFor="billing_info" className="text-gray-700 font-bold uppercase px-3">Use same Shipping Information</label>
                </div>
                <div>
                    <label htmlFor="billing_name" className="text-gray-700 font-bold uppercase"> Billing Name: </label>
                    <input type="text" name="billing_name" id="billing_name" className="billing rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={billing_name}/>
                </div>
                <div>
                    <label htmlFor="billing_state" className="text-gray-700 font-bold uppercase"> Billing State </label>
                    <input type="text" name="billing_state" id="billing_state" className="billing rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={billing_state}/>
                </div>
                <div>
                    <label htmlFor="billing_city" className="text-gray-700 font-bold uppercase"> Billing City </label>
                    <input type="text" name="billing_city" id="billing_city" className="billing rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={billing_city}/>
                </div>
                <div className="col-span-2">
                    <label htmlFor="billing_address" className="text-gray-700 font-bold uppercase"> Billing Address: </label>
                    <input type="text" name="billing_address" id="billing_address" className="billing rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={billing_address}/>
                </div>
                <div>
                    <label htmlFor="billing_zip" className="text-gray-700 font-bold uppercase"> Billing Zip Code </label>
                    <input type="text" name="billing_zip" id="billing_zip" className="billing rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={billing_zip}/>
                </div>
                <div className="col-span-2">
                    <label htmlFor="billing_address2" className="text-gray-700 font-bold uppercase"> Billing Address 2: </label>
                    <input type="text" name="billing_address2" id="billing_address2" className="billing rounded block py-2 border shadow w-full px-3" onChange={handleChange} value={billing_address2}/>
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

            <h3 className='text-gray-700 text-xl uppercase text-center py-2 font-bold'>Order Summary</h3>
            <table className='table-auto table w-2/4 text-center m-auto'>
                <thead>
                    <tr className='border-2'>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    { cartItems.map( (item, index) => (
                        <tr key={index} className='border'>
                            <td>{item.name}</td>
                            <td>{item.amount}</td>
                            <td>$ {item.cost}</td>
                        </tr>
                    ))}
                    <tr className='border'>
                        <td colSpan={2}> Subtotal Price: </td>
                        <td> $ {total_cost } </td>
                    </tr>
                    <tr className='border'>
                        <td colSpan={2}> Total Price (% {TAXES}): </td>
                        <td> $ {price_with_tax(total_cost)} </td>
                    </tr>
                </tbody>
            </table>

            <div className="py-10 grid grid-cols-2 gap-2">
                <button type="submit" className="font-bold bg-gray-700 rounded p-3 text-white uppercase hover:bg-gray-300 hover:text-gray-700"> Pay </button>
                <button type="button" onClick={ () => { StepCount (1) } } className="font-bold bg-gray-300 rounded p-3 text-gray-700 uppercase hover:bg-gray-700 hover:text-white text-center">Back</button>
            </div>
        </>
     );
}
 
export default StepTwo;