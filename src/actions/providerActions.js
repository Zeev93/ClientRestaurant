import Swal from 'sweetalert2'
import clientAxios from '../config/axios'
import {
    CREATE_PROVIDER,
    CREATE_PROVIDER_SUCCESS,
    CREATE_PROVIDER_ERROR,
    VIEW_PROVIDERS,
    VIEW_PROVIDERS_SUCCESS,
    VIEW_PROVIDERS_ERROR,
    DELETE_PROVIDER,
    DELETE_PROVIDER_SUCCESS,
    DELETE_PROVIDER_ERROR,
    EDIT_PROVIDER,
    EDIT_PROVIDER_SUCCESS,
    EDIT_PROVIDER_ERROR,
    UPDATE_PROVIDER,
    UPDATE_PROVIDER_SUCCESS,
    UPDATE_PROVIDER_ERROR,
    GET_PROVIDER_PRODUCTS,
    GET_PROVIDER_PRODUCTS_SUCCESS,
    GET_PROVIDER_PRODUCTS_ERROR,
} from '../types'


export function getProvidersAction() {
    return dispatch => {
        dispatch(getProviders())
        clientAxios.get('/providers')
        .then( response => {
            dispatch(getProvidersSuccess(response.data.providers))
        })
        .catch( error => {
            dispatch(getProvidersError(error.data.response))
        })
    }
}

const getProviders = () => ({
    type: VIEW_PROVIDERS
})

const getProvidersSuccess = payload => ({
    type: VIEW_PROVIDERS_SUCCESS,
    payload
})

const getProvidersError = payload => ({
    type: VIEW_PROVIDERS_ERROR,
    payload
})

export function createNewProviderAction (provider) {
    return async dispatch => {
        console.log(provider);
        dispatch(createNewProvider())
        await clientAxios.post('/providers', provider)
        .then( response => {
            dispatch(createNewProviderSuccess(response.data.provider))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your provider has been saved',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .catch( error => {
            dispatch(createNewProviderError(error.response.data))
        })
    }
}


const createNewProvider = () => ({
    type: CREATE_PROVIDER
})

const createNewProviderSuccess = payload => ({
    type: CREATE_PROVIDER_SUCCESS,
    payload
})

const createNewProviderError = payload => ({
    type: CREATE_PROVIDER_ERROR,
    payload
})


export function updateProviderAction(provider) {
    return async dispatch => {
        dispatch(updateProvider())
        await clientAxios.put(`/providers/${provider.id}`, provider)
        .then( response => {
            dispatch(updateProviderSuccess(response.data.provider))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your provider has been updated',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .catch( error => {
            dispatch(updateProviderError(error.response.data))
        })
    }
}

const updateProvider = () => ({
    type: UPDATE_PROVIDER
})

const updateProviderSuccess = payload => ({
    type: UPDATE_PROVIDER_SUCCESS,
    payload
})

const updateProviderError = payload => ({
    type: UPDATE_PROVIDER_ERROR,
    payload
})


export function editProviderAction (id) {
    return async dispatch => {
        dispatch(editProvider())
        await clientAxios.get(`/providers/${id}/edit`)
        .then( response => {
            dispatch(editProviderSuccess(response.data.provider))
        })
        .catch( error => {
            dispatch(editProviderError(error.response.data))
        })
    }
}


const editProvider = () => ({
    type: EDIT_PROVIDER
})

const editProviderSuccess = payload => ({
    type: EDIT_PROVIDER_SUCCESS,
    payload
})

const editProviderError = payload => ({
    type: EDIT_PROVIDER_ERROR,
    payload
})



export function deleteProviderAction(id){
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
                dispatch(deleteProvider(id))        
                clientAxios.delete(`/providers/${id}`)
                .then( response => {
                    dispatch(deleteProviderSuccess(response.data.product))
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                })
                .catch( error => {
                    dispatch(deleteProviderError(error.response.data.message))
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

const deleteProvider = payload => ({
    type: DELETE_PROVIDER,
    payload
})

const deleteProviderSuccess = payload => ({
    type: DELETE_PROVIDER_SUCCESS,
    payload
})

const deleteProviderError = payload => ({
    type: DELETE_PROVIDER_ERROR,
    payload
})

export function getProviderProductsAction(id){
    return async dispatch => {
        dispatch(getProviderProducts())
        await clientAxios.get(`providers/products/${id}`)
        .then( response => {
            dispatch(getProviderProductsSuccess(response.data.products))
        })
        .catch( error => {
            dispatch(getProviderProductsError(error.response.data))
        })
    }
}

const getProviderProducts = () => ({
    type: GET_PROVIDER_PRODUCTS,
    payload: true
})

const getProviderProductsSuccess = payload => ({
    type: GET_PROVIDER_PRODUCTS_SUCCESS,
    payload
})

const getProviderProductsError = payload => ({
    type: GET_PROVIDER_PRODUCTS_ERROR,
    payload
})