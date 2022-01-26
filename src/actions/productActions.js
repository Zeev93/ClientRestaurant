import {
    CREATE_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_ERROR,
    VIEW_PRODUCTS,
    VIEW_PRODUCTS_SUCCESS,
    VIEW_PRODUCTS_ERROR,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR,
    EDIT_PRODUCT,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_ERROR,
} from '../types'
import clientAxios from '../config/axios'
import Swal from 'sweetalert2'


// Create 

export function createNewProductAction(product){
    return dispatch => {
        // Change state
        dispatch(addProduct())
        // API
        clientAxios.post('products', product)
        .then( response => {
            dispatch(addProductSuccess(response.data.product))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your product has been saved',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .catch( error => {
            dispatch(addProductError(error.response.data))
        }) 
    }
}

const addProduct = () => ({
    type: CREATE_PRODUCT,
    payload: true
})

const addProductSuccess = payload => ({
    type: CREATE_PRODUCT_SUCCESS,
    payload
})

const addProductError = payload => ({
    type: CREATE_PRODUCT_ERROR,
    payload
}) 


// all products

export function getProductsAction(){
    return async (dispatch) => {
        dispatch (getProducts())
        await clientAxios.get('/products')
        .then( response => {
            dispatch(getProductsSuccess(response.data.products))
        })
        .catch(error => {
            dispatch(getProductsError(error.response.data))
        })
    }
}

const getProducts = () => ({
    type: VIEW_PRODUCTS,
    payload: true
})

const getProductsSuccess = payload => ({
    type: VIEW_PRODUCTS_SUCCESS,
    payload
})

const getProductsError = payload => ({
    type: VIEW_PRODUCTS_ERROR,
    payload
})


// Get EDIT

export function editProductAction(id) {
    return async (dispatch) => {
        dispatch(editProduct())
        await clientAxios.get(`/products/${id}/edit`)
        .then(response =>{
            dispatch(editProductSuccess(response.data.product))
        })
        .catch( error => {
            editProductError(error.response.data)
        })
    }
}


const editProduct = () => ({
    type: EDIT_PRODUCT,
    payload: true
})

const editProductSuccess = payload => ({
    type: EDIT_PRODUCT_SUCCESS,
    payload
})

const editProductError = payload => ({
    type: EDIT_PRODUCT_ERROR,
    payload: payload
})


// Update Product

export function updateProductAction(product){
    return async dispatch => {
        console.log(product);
        dispatch(updateProduct())
        await clientAxios.put(`/products/${product.id}`, product)
        .then( response => {
            dispatch(updateProductSuccess(response.data.product))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your product has been updated',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .catch( error => {
            dispatch(updateProductError(error.response.data))
        })
    }
}

const updateProduct = () => ({
    type: UPDATE_PRODUCT,
    payload: true
})

const updateProductSuccess = payload => ({
    type: UPDATE_PRODUCT_SUCCESS,
    payload
})

const updateProductError = payload => ({
    type: UPDATE_PRODUCT_ERROR,
    payload
})


export function deleteProductAction(id){
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
                dispatch(deleteProduct(id))        
                clientAxios.delete(`/products/${id}`)
                .then( response => {
                    dispatch(deleteProductSuccess(response.data.product))
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                })
                .catch( error => {
                    dispatch(deleteProductError(error.response.data.message))
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

const deleteProduct = payload => ({
    type: DELETE_PRODUCT,
    payload
})

const deleteProductSuccess = payload => ({
    type: DELETE_PRODUCT_SUCCESS,
    payload
})

const deleteProductError = payload => ({
    type: DELETE_PRODUCT_ERROR,
    payload
})