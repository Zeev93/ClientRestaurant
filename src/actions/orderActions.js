import {
    CREATE_ORDER,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,
    VIEW_ORDERS,
    VIEW_ORDERS_SUCCESS,
    VIEW_ORDERS_ERROR,
    DELETE_ORDER,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_ERROR,
    EDIT_ORDER,
    EDIT_ORDER_SUCCESS,
    EDIT_ORDER_ERROR,
    UPDATE_ORDER,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_ERROR,
    VIEW_ORDER,
    VIEW_ORDER_SUCCESS,
    VIEW_ORDER_ERROR,
    ADD_ITEM_CART_ORDER,
    DELETE_ITEM_CART_ORDER,
    CANCEL_ITEMS_CART_ORDER
} from '../types'
import clientAxios from '../config/axios'
import Swal from 'sweetalert2'


// Create 

export function createNewOrderAction(order, cartItems){
    return async dispatch => {
        // Change state
        dispatch(addOrder())

        const data = [order, cartItems]
        // API

        console.log(data);
        await clientAxios.post('/orders', data )
        .then( response => {
            dispatch(addOrderSuccess(response.data.order))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your order has been saved',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .catch( error => {
            dispatch(addOrderError(error.response.data))
        }) 
    }
}

const addOrder = () => ({
    type: CREATE_ORDER,
    payload: true
})

const addOrderSuccess = payload => ({
    type: CREATE_ORDER_SUCCESS,
    payload
})

const addOrderError = payload => ({
    type: CREATE_ORDER_ERROR,
    payload
}) 


// all orders

export function getOrdersAction(){
    return async (dispatch) => {
        dispatch (getOrders())
        await clientAxios.get('/orders')
        .then( response => {
            dispatch(getOrdersSuccess(response.data.orders))
        })
        .catch(error => {
            dispatch(getOrdersError(error.response.data))
        })
    }
}

const getOrders = () => ({
    type: VIEW_ORDERS,
    payload: true
})

const getOrdersSuccess = payload => ({
    type: VIEW_ORDERS_SUCCESS,
    payload
})

const getOrdersError = payload => ({
    type: VIEW_ORDERS_ERROR,
    payload
})


// Get EDIT

export function editOrderAction(id) {
    return async (dispatch) => {
        dispatch(editOrder())
        await clientAxios.get(`/orders/${id}/edit`)
        .then(response =>{
            dispatch(editOrderSuccess(response.data.order))
        })
        .catch( error => {
            editOrderError(error.response.data)
        })
    }
}


const editOrder = () => ({
    type: EDIT_ORDER,
    payload: true
})

const editOrderSuccess = payload => ({
    type: EDIT_ORDER_SUCCESS,
    payload
})

const editOrderError = payload => ({
    type: EDIT_ORDER_ERROR,
    payload: payload
})


// Update Order

export function updateOrderAction(order){
    return async dispatch => {
        dispatch(updateOrder())
        await clientAxios.put(`/orders/${order.id}`, order)
        .then( response => {
            dispatch(updateOrderSuccess(response.data.order))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your order has been updated',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .catch( error => {
            dispatch(updateOrderError(error.response.data))
        })
    }
}

const updateOrder = () => ({
    type: UPDATE_ORDER,
    payload: true
})

const updateOrderSuccess = payload => ({
    type: UPDATE_ORDER_SUCCESS,
    payload
})

const updateOrderError = payload => ({
    type: UPDATE_ORDER_ERROR,
    payload
})

// Delete
export function deleteOrderAction(id){
    return async dispatch => {
        await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteOrder(id))        
                clientAxios.delete(`/orders/${id}`)
                .then( response => {
                    dispatch(deleteOrderSuccess(response.data.order))
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                })
                .catch( error => {
                    dispatch(deleteOrderError(error.response.data.message))
                    Swal.fire(
                        'Error!',
                        'Your file could not be deleted.',
                        'error'
                      )
                })
            }
          })
        
    }
}

const deleteOrder = payload => ({
    type: DELETE_ORDER,
    payload
})

const deleteOrderSuccess = payload => ({
    type: DELETE_ORDER_SUCCESS,
    payload
})

const deleteOrderError = payload => ({
    type: DELETE_ORDER_ERROR,
    payload
})

// show

export function showOrderAction(id){
    return dispatch => {
        dispatch(showOrder())
        clientAxios.get(`/orders/${id}`)
        .then( response => {
            dispatch( showOrderSuccess(response.data))
        })
        .catch( error => {
            dispatch( showOrderError(error.data))
        })

    }
}


const showOrder = () => ({
    type: VIEW_ORDER
})

const showOrderSuccess = payload => ({
    type:VIEW_ORDER_SUCCESS,
    payload
})

const showOrderError = payload => ({
    type:VIEW_ORDER_ERROR,
    payload
})


/// ON ORDER

export function addItemCartAction (item) {
    return dispatch => {
        dispatch(addItemCart(item))
    }
}

const addItemCart = payload => ({
    type: ADD_ITEM_CART_ORDER,
    payload
})

export function deleteItemCartAction (id) {
    return dispatch => {
        dispatch(deleteItemCart(id))
    }
}

const deleteItemCart = payload => ({
    type: DELETE_ITEM_CART_ORDER,
    payload
})

export function cancelCartAction(){
    return dispatch => {
        dispatch(cancelCart())        
    }
}

const cancelCart = () => ({
    type: CANCEL_ITEMS_CART_ORDER,
})