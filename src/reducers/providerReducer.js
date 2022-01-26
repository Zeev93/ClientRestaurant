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

const initialState = {
    providers: [],
    errors: false,
    loading: false,
    edit: false,
    delete: null,
    products: [],
}



export default function foo (state = initialState, action ){
    switch (action.type) {

        case CREATE_PROVIDER:
        case EDIT_PROVIDER:
        case UPDATE_PROVIDER:
        case GET_PROVIDER_PRODUCTS:
            return {
                ...state,
                loading: action.payload, 
            }
        case DELETE_PROVIDER:
            return {
                ...state,
                loading: true,
                delete: action.payload,
            }
        case CREATE_PROVIDER_SUCCESS:
            return {
                ...state,
                loading: false,
                providers: [...state.providers, action.payload],
                errors: null
            }
        
        case EDIT_PROVIDER_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: null,
                edit: action.payload,
                edition: false
            }
        case CREATE_PROVIDER_ERROR:
        case VIEW_PROVIDERS_ERROR:
        case EDIT_PROVIDER_ERROR:
        case DELETE_PROVIDER_ERROR:
        case UPDATE_PROVIDER_ERROR:
        case GET_PROVIDER_PRODUCTS_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case VIEW_PROVIDERS:
            return {
                ...state,
                loading: action.payload,
            }
        case VIEW_PROVIDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                providers: action.payload,
                error: false
            }
        case GET_PROVIDER_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: false
            }
        case UPDATE_PROVIDER_SUCCESS:
            return {
                ...state,
                edit: false,
                providers: state.providers.map ( item => item.id === action.payload.id ? item = action.payload : item )
            }
        case DELETE_PROVIDER_SUCCESS:
            return {
                ...state,
                providers: state.providers.filter( item => item.id !== state.delete ),
                delete: null
            }
        
        
        default: 
            return state
    }
}