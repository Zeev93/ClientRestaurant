import {
    CREATE_CATEGORY,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR,
    VIEW_CATEGORIES,
    VIEW_CATEGORIES_SUCCESS,
    VIEW_CATEGORIES_ERROR,
    DELETE_CATEGORY,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,
    EDIT_CATEGORY,
    EDIT_CATEGORY_SUCCESS,
    EDIT_CATEGORY_ERROR,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_ERROR,
} from '../types'

const initialState = {
    categories: [],
    errors: false,
    loading: false,
    edit: false,
    delete: null
}


export default function foo (state = initialState, action ){
    switch (action.type) {

        case CREATE_CATEGORY:
        case EDIT_CATEGORY:
        case UPDATE_CATEGORY:
            return {
                ...state,
                loading: action.payload, 
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                loading: true,
                delete: action.payload,
            }
        case CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload],
                errors: null
            }
        case EDIT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: null,
                edit: action.payload,
                edition: false
            }
        case CREATE_CATEGORY_ERROR:
        case VIEW_CATEGORIES_ERROR:
        case EDIT_CATEGORY_ERROR:
        case DELETE_CATEGORY_ERROR:
        case UPDATE_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case VIEW_CATEGORIES:
            return {
                ...state,
                loading: action.payload,
            }
        case VIEW_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload,
                error: false
            }
        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                edit: false,
                categories: state.categories.map ( item => item.id === action.payload.id ? item = action.payload : item )
            }
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: state.categories.filter( item => item.id !== state.delete ),
                delete: null
            }

        
        
        default: 
            return state
    }
}