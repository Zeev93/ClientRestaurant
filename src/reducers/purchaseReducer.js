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
    CANCEL_ITEMS_CART,
} from '../types'

const initialState = {
    purchases: [],
    errors: false,
    loading: false,
    edit: false,
    delete: null,
    cart: [],
    showPurchase: null,
    showProducts: []
}



export default function foo (state = initialState, action ){
    switch (action.type) {

        case CREATE_PURCHASE:
        case EDIT_PURCHASE:
        case UPDATE_PURCHASE:
        case VIEW_PURCHASE:
            return {
                ...state,
                loading: action.payload, 
            }
        case DELETE_PURCHASE:
            return {
                ...state,
                loading: true,
                delete: action.payload,
            }
        case CREATE_PURCHASE_SUCCESS:
            return {
                ...state,
                loading: false,
                purchases: [...state.purchases, action.payload],
                errors: null
            }
        case EDIT_PURCHASE_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: null,
                edit: action.payload,
                edition: false
            }
        case CREATE_PURCHASE_ERROR:
        case VIEW_PURCHASES_ERROR:
        case EDIT_PURCHASE_ERROR:
        case DELETE_PURCHASE_ERROR:
        case UPDATE_PURCHASE_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case VIEW_PURCHASES:
            return {
                ...state,
                loading: action.payload,
            }
        case VIEW_PURCHASES_SUCCESS:
            return {
                ...state,
                loading: false,
                purchases: action.payload,
                error: false
            }
        case UPDATE_PURCHASE_SUCCESS:
            return {
                ...state,
                edit: false,
                purchases: state.purchases.map ( item => item.id === action.payload.id ? item = action.payload : item )
            }
        case DELETE_PURCHASE_SUCCESS:
            return {
                ...state,
                purchases: state.purchases.filter( item => item.id !== state.delete ),
                delete: null
            }

        case DELETE_ITEM_CART:
            return{
                ...state,
                cart: state.cart.filter( item => item.id !== action.payload )
            }
        case CANCEL_ITEMS_CART:
            return {
                ...state,
                cart: [],
                providers: [],
                products: []
            }
        case ADD_ITEM_CART:
            return {
                ...state,
                loading: false,
                cart: state.cart.reduce((total, currentValue) => {
                    const existingItem = total.find(item => item.id === currentValue.id);
                    if (existingItem) {
                      return total.map((item) => {
                        if (item.id === currentValue.id) {
                          return {
                            ...item,
                            amount: Number(item.amount) + Number(currentValue.amount),
                          }
                        }
                  
                        return item;
                      });
                    }
                    return [...total, currentValue]
                  }, [action.payload]),
                errors: null
            }
        
        case VIEW_PURCHASE_SUCCESS:
            return {
                ...state,
                showPurchase: action.payload.purchase,
                showProducts: action.payload.products
            }
        default: 
            return state
    }
}