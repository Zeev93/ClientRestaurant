import {
    CREATE_SALE,
    CREATE_SALE_SUCCESS,
    CREATE_SALE_ERROR,
    VIEW_SALES,
    VIEW_SALES_SUCCESS,
    VIEW_SALES_ERROR,
    DELETE_SALE,
    DELETE_SALE_SUCCESS,
    DELETE_SALE_ERROR,
    EDIT_SALE,
    EDIT_SALE_SUCCESS,
    EDIT_SALE_ERROR,
    UPDATE_SALE,
    UPDATE_SALE_SUCCESS,
    UPDATE_SALE_ERROR,
    VIEW_SALE,
    VIEW_SALE_SUCCESS,
    VIEW_SALE_ERROR,
    ADD_ITEM_CART,
    DELETE_ITEM_CART,
    CANCEL_ITEMS_CART
} from '../types'
import clientAxios from '../config/axios'
import Swal from 'sweetalert2'


// Create 

export function createNewSaleAction(purchase, cartItems){
    return async dispatch => {
        // Change state
        dispatch(addSale())

        const data = [purchase, cartItems]
        // API
        await clientAxios.post('/purchases', data )
        .then( response => {
            dispatch(addSaleSuccess(response.data.purchase))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your purchase has been saved',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .catch( error => {
            dispatch(addSaleError(error.response.data))
        }) 
    }
}

const addSale = () => ({
    type: CREATE_SALE,
    payload: true
})

const addSaleSuccess = payload => ({
    type: CREATE_SALE_SUCCESS,
    payload
})

const addSaleError = payload => ({
    type: CREATE_SALE_ERROR,
    payload
}) 


// all purchases

export function getSalesAction(){
    return async (dispatch) => {
        dispatch (getSales())
        await clientAxios.get('/purchases')
        .then( response => {
            dispatch(getSalesSuccess(response.data.purchases))
        })
        .catch(error => {
            dispatch(getSalesError(error.response.data))
        })
    }
}

const getSales = () => ({
    type: VIEW_SALES,
    payload: true
})

const getSalesSuccess = payload => ({
    type: VIEW_SALES_SUCCESS,
    payload
})

const getSalesError = payload => ({
    type: VIEW_SALES_ERROR,
    payload
})


// Get EDIT

export function editSaleAction(id) {
    return async (dispatch) => {
        dispatch(editSale())
        await clientAxios.get(`/purchases/${id}/edit`)
        .then(response =>{
            dispatch(editSaleSuccess(response.data.purchase))
        })
        .catch( error => {
            editSaleError(error.response.data)
        })
    }
}


const editSale = () => ({
    type: EDIT_SALE,
    payload: true
})

const editSaleSuccess = payload => ({
    type: EDIT_SALE_SUCCESS,
    payload
})

const editSaleError = payload => ({
    type: EDIT_SALE_ERROR,
    payload: payload
})


// Update Sale

export function updateSaleAction(purchase){
    return async dispatch => {
        console.log(purchase);
        dispatch(updateSale())
        await clientAxios.put(`/purchases/${purchase.id}`, purchase)
        .then( response => {
            dispatch(updateSaleSuccess(response.data.purchase))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your purchase has been updated',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .catch( error => {
            dispatch(updateSaleError(error.response.data))
        })
    }
}

const updateSale = () => ({
    type: UPDATE_SALE,
    payload: true
})

const updateSaleSuccess = payload => ({
    type: UPDATE_SALE_SUCCESS,
    payload
})

const updateSaleError = payload => ({
    type: UPDATE_SALE_ERROR,
    payload
})

// Delete
export function deleteSaleAction(id){
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
                dispatch(deleteSale(id))        
                clientAxios.delete(`/purchases/${id}`)
                .then( response => {
                    dispatch(deleteSaleSuccess(response.data.purchase))
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                })
                .catch( error => {
                    dispatch(deleteSaleError(error.response.data.message))
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

const deleteSale = payload => ({
    type: DELETE_SALE,
    payload
})

const deleteSaleSuccess = payload => ({
    type: DELETE_SALE_SUCCESS,
    payload
})

const deleteSaleError = payload => ({
    type: DELETE_SALE_ERROR,
    payload
})

// show

export function showSaleAction(id){
    return dispatch => {
        dispatch(showSale())
        clientAxios.get(`/purchases/${id}`)
        .then( response => {
            dispatch( showSaleSuccess(response.data))
        })
        .catch( error => {
            dispatch( showSaleError(error.data))
        })

    }
}


const showSale = () => ({
    type: VIEW_SALE
})

const showSaleSuccess = payload => ({
    type:VIEW_SALE_SUCCESS,
    payload
})

const showSaleError = payload => ({
    type:VIEW_SALE_ERROR,
    payload
})


/// ON SALE

export function addItemCartAction (item) {
    return dispatch => {
        dispatch(addItemCart(item))
    }
}

const addItemCart = payload => ({
    type: ADD_ITEM_CART,
    payload
})

export function deleteItemCartAction (id) {
    return dispatch => {
        dispatch(deleteItemCart(id))
    }
}

const deleteItemCart = payload => ({
    type: DELETE_ITEM_CART,
    payload
})

export function cancelCartAction(){
    return dispatch => {
        dispatch(cancelCart())        
    }
}

const cancelCart = () => ({
    type: CANCEL_ITEMS_CART,
})