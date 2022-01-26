import {
    CREATE_PURCHASE,
    CREATE_PURCHASE_SUCCESS,
    CREATE_PURCHASE_ERROR,
    VIEW_PURCHASES,
    VIEW_PURCHASES_SUCCESS,
    VIEW_PURCHASES_ERROR,
    DELETE_PURCHASE,
    DELETE_PURCHASE_SUCCESS,
    DELETE_PURCHASE_ERROR,
    EDIT_PURCHASE,
    EDIT_PURCHASE_SUCCESS,
    EDIT_PURCHASE_ERROR,
    UPDATE_PURCHASE,
    UPDATE_PURCHASE_SUCCESS,
    UPDATE_PURCHASE_ERROR,
    VIEW_PURCHASE,
    VIEW_PURCHASE_SUCCESS,
    VIEW_PURCHASE_ERROR,
    ADD_ITEM_CART,
    DELETE_ITEM_CART,
    CANCEL_ITEMS_CART
} from '../types'
import clientAxios from '../config/axios'
import Swal from 'sweetalert2'


// Create 

export function createNewPurchaseAction(purchase, cartItems){
    return async dispatch => {
        // Change state
        dispatch(addPurchase())

        const data = [purchase, cartItems]
        // API
        await clientAxios.post('/purchases', data )
        .then( response => {
            dispatch(addPurchaseSuccess(response.data.purchase))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your purchase has been saved',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .catch( error => {
            dispatch(addPurchaseError(error.response.data))
        }) 
    }
}

const addPurchase = () => ({
    type: CREATE_PURCHASE,
    payload: true
})

const addPurchaseSuccess = payload => ({
    type: CREATE_PURCHASE_SUCCESS,
    payload
})

const addPurchaseError = payload => ({
    type: CREATE_PURCHASE_ERROR,
    payload
}) 


// all purchases

export function getPurchasesAction(){
    return async (dispatch) => {
        dispatch (getPurchases())
        await clientAxios.get('/purchases')
        .then( response => {
            dispatch(getPurchasesSuccess(response.data.purchases))
        })
        .catch(error => {
            dispatch(getPurchasesError(error.response.data))
        })
    }
}

const getPurchases = () => ({
    type: VIEW_PURCHASES,
    payload: true
})

const getPurchasesSuccess = payload => ({
    type: VIEW_PURCHASES_SUCCESS,
    payload
})

const getPurchasesError = payload => ({
    type: VIEW_PURCHASES_ERROR,
    payload
})


// Get EDIT

export function editPurchaseAction(id) {
    return async (dispatch) => {
        dispatch(editPurchase())
        await clientAxios.get(`/purchases/${id}/edit`)
        .then(response =>{
            dispatch(editPurchaseSuccess(response.data.purchase))
        })
        .catch( error => {
            editPurchaseError(error.response.data)
        })
    }
}


const editPurchase = () => ({
    type: EDIT_PURCHASE,
    payload: true
})

const editPurchaseSuccess = payload => ({
    type: EDIT_PURCHASE_SUCCESS,
    payload
})

const editPurchaseError = payload => ({
    type: EDIT_PURCHASE_ERROR,
    payload: payload
})


// Update Purchase

export function updatePurchaseAction(purchase){
    return async dispatch => {
        console.log(purchase);
        dispatch(updatePurchase())
        await clientAxios.put(`/purchases/${purchase.id}`, purchase)
        .then( response => {
            dispatch(updatePurchaseSuccess(response.data.purchase))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your purchase has been updated',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .catch( error => {
            dispatch(updatePurchaseError(error.response.data))
        })
    }
}

const updatePurchase = () => ({
    type: UPDATE_PURCHASE,
    payload: true
})

const updatePurchaseSuccess = payload => ({
    type: UPDATE_PURCHASE_SUCCESS,
    payload
})

const updatePurchaseError = payload => ({
    type: UPDATE_PURCHASE_ERROR,
    payload
})

// Delete
export function deletePurchaseAction(id){
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
                dispatch(deletePurchase(id))        
                clientAxios.delete(`/purchases/${id}`)
                .then( response => {
                    dispatch(deletePurchaseSuccess(response.data.purchase))
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                })
                .catch( error => {
                    dispatch(deletePurchaseError(error.response.data.message))
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

const deletePurchase = payload => ({
    type: DELETE_PURCHASE,
    payload
})

const deletePurchaseSuccess = payload => ({
    type: DELETE_PURCHASE_SUCCESS,
    payload
})

const deletePurchaseError = payload => ({
    type: DELETE_PURCHASE_ERROR,
    payload
})

// show

export function showPurchaseAction(id){
    return dispatch => {
        dispatch(showPurchase())
        clientAxios.get(`/purchases/${id}`)
        .then( response => {
            dispatch( showPurchaseSuccess(response.data))
        })
        .catch( error => {
            dispatch( showPurchaseError(error.data))
        })

    }
}


const showPurchase = () => ({
    type: VIEW_PURCHASE
})

const showPurchaseSuccess = payload => ({
    type:VIEW_PURCHASE_SUCCESS,
    payload
})

const showPurchaseError = payload => ({
    type:VIEW_PURCHASE_ERROR,
    payload
})


/// ON PURCHASE

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