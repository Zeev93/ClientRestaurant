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
        dispatch(createNewProvider())
        await clientAxios.post('/providers', provider)
        .then( response => {
            dispatch(createNewProviderSuccess(response.data.provider))
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


export function editProviderAction(provider) {
    return async dispatch => {
        dispatch(editProvider())
        await clientAxios.put(`/providers/${provider.id}`, provider)
        .then( response => {
            dispatch(editProviderSuccess(response.data.provider))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your provider has been updated',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .catch( error => {
            dispatch(editProviderError(error.response.data))
        })
    }
}

const editProvider = () => ({
    type: UPDATE_PROVIDER
})

const editProviderSuccess = payload => ({
    type: UPDATE_PROVIDER_SUCCESS,
    payload
})

const editProviderError = payload => ({
    type: UPDATE_PROVIDER_ERROR,
    payload
})


export function setEditProviderAction (id) {
    return async dispatch => {
        dispatch(setEditProvider())
        await clientAxios.get(`/providers/${id}/edit`)
        .then( response => {
            dispatch(setEditProviderSuccess(response.data.provider))
        })
        .catch( error => {
            dispatch(setEditProviderError(error.response.data))
        })
    }
}


const setEditProvider = () => ({
    type: EDIT_PROVIDER
})

const setEditProviderSuccess = payload => ({
    type: EDIT_PROVIDER_SUCCESS,
    payload
})

const setEditProviderError = payload => ({
    type: EDIT_PROVIDER_ERROR,
    payload
})


export function deleteProviderAction (id) {
    return async dispatch => {
        dispatch(deleteProvider())
        clientAxios.get(`/providers/${id}`)
        .then( response => {
            console.log(response);
        })
        .catch( error => {
            console.log(error);
        })
    }
}

const deleteProvider = () => ({
    type: DELETE_PROVIDER
})