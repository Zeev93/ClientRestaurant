import React, { useEffect, useState } from 'react';

import MaterialTable from 'material-table'
import {tableIcons} from '../../ui/DataTableIcons'
import {PatchedPagination} from '../../ui/patchTable'

import { getProductsAction } from "../../../actions/productActions";
import { addItemCartAction, deleteItemCartAction, cancelCartAction } from '../../../actions/orderActions'
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const StepOne = ({StepCount}) => {

    const products = useSelector( state => state.products.products )
    const cartItems = useSelector( state => state.orders.cart)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getProductsAction())    
    }, [])

    const [alertCart, setAlertCart] = useState({
        status: false,
        id:0
    })


    const header = [
        {title: 'IMAGE', field: 'image', sorting: false, filtering: false, cellStyle: { 'textAlign':'center', width: '15%'}, render: rowData => <img className="rounded-md w-12 flex m-auto" src={rowData.image} />},
        {title: 'NAME', field: 'name', cellStyle: { 'textAlign':'center', width: '15%'}},
        {title: 'SALE PRICE ($)', field: 'price', cellStyle: { 'textAlign':'center', width: '10%'}, render: rowData => <p>$ {rowData.price}</p>},
        {title: 'STOCK', field: 'stock', cellStyle: { 'textAlign':'center', width: '10%'}, render: rowData => rowData.stock > rowData.minimal_stock ? <p className="text-green-500"> {rowData.stock} </p> : <p className="text-red-500">{rowData.stock}</p> },
        {title: 'MINIMAL STOCK', field: 'minimal_stock', cellStyle: { 'textAlign':'center', width: '10%'}},
        {title: 'CATEGORY', field: 'category_name', cellStyle: { 'textAlign':'center', width: '10%'}},
        {title: 'PROVIDER', field: 'provider_name', cellStyle: { 'textAlign':'center', width: '10%'}},
        {title: 'AMOUNT', cellStyle: { 'textAlign':'center', width: '10%'}, render: rowData => ( <input type="tel" data-stock={rowData.stock} data-cost={rowData.cost} data-name={rowData.name} id={ `inpt-${rowData.id}` } className={`rounded m-auto w-16 py-2 border shadow block px-3 inputAmount ${ alertCart.status && alertCart.id === rowData.id  ? 'border-red-500' : ''} `}/> ), filtering: false, sorting: false, },
        {title: 'AMOUNT', cellStyle: { 'textAlign':'center', width: '10%'}, render: rowData => ( <button onClick={ (e) => {handleAdd(e, rowData.id)}} type="button" className="font-bold bg-gray-700 rounded p-3 text-white uppercase hover:bg-gray-300 hover:text-gray-700"> + </button> ), filtering: false, sorting: false, },
    ]


    const handleAdd = (e, param) => {
        e.preventDefault()
        
        const input = document.getElementById(`inpt-${param}`)
        const amount = input.value
        const id = param
        const name = input.dataset.name
        const cost = input.dataset.cost
        const stock = input.dataset.stock
        const total = cost * amount
    

        if(amount && amount > 0 && stock >= amount){

            const item = {
                id,
                name,
                amount,
                cost,
                stock,
                total
            }
            setAlertCart({
                status: false,
                id: 0 
            })
            dispatch(addItemCartAction(item))
            input.value = ''

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Item added to shopping list',
                showConfirmButton: false,
                timer: 1000
            })

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
                        navigate(-1)
                    }
                })
            }
            else{
                navigate(-1)  
            }
        
    }

   
    return ( 
        <>
                <MaterialTable
                icons={tableIcons}
                components={{
                    Pagination: PatchedPagination,
                }}
                columns={header}
                data={products}
                title={'Select your products'}
                options={{
                    actionsColumnIndex: -1,
                    exportButton: true,
                    pageSize: 5,
                    pageSizeOptions:[ 5, 10, 50, 100],
                    headerStyle: {
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        textAlign: 'center'
                    },
                }}
                // actions={actions}
                />

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
                    {cartItems.length > 0?
                        <button type="button" onClick={ () => { StepCount(2) }}  className="font-bold bg-gray-700 rounded p-3 text-white uppercase hover:bg-gray-300 hover:text-gray-700"> Continue Payment </button>
                        :
                        <div></div>
                    }
                    <button type="button" onClick={ (e) => {cancelOrder(e) } } className="font-bold bg-gray-300 rounded p-3 text-gray-700 uppercase hover:bg-gray-700 hover:text-white text-center">Cancel</button>
                </div>
        
        </>
        );
    }
 
export default StepOne;