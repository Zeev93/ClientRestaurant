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

const initialState = {
    products: [],
    errors: false,
    loading: false,
    edit: false,
    delete: null
}



export default function foo (state = initialState, action ){
    switch (action.type) {

        case CREATE_PRODUCT:
        case EDIT_PRODUCT:
        case UPDATE_PRODUCT:
            return {
                ...state,
                loading: action.payload, 
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                loading: true,
                delete: action.payload,
            }
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload],
                errors: null
            }
        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: null,
                edit: action.payload,
                edition: false
            }
        case CREATE_PRODUCT_ERROR:
        case VIEW_PRODUCTS_ERROR:
        case EDIT_PRODUCT_ERROR:
        case DELETE_PRODUCT_ERROR:
        case UPDATE_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case VIEW_PRODUCTS:
            return {
                ...state,
                loading: action.payload,
            }
        case VIEW_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: false
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                edit: false,
                products: state.products.map ( item => item.id === action.payload.id ? item = action.payload : item )
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.filter( item => item.id !== state.delete ),
                delete: null
            }

        
        
        default: 
            return state
    }
}