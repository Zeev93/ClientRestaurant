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

    ADD_ITEM_CART_SALE,
    DELETE_ITEM_CART_SALE,
    CANCEL_ITEMS_CART_SALE,
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

        case CREATE_SALE:
        case EDIT_SALE:
        case UPDATE_SALE:
        case VIEW_SALE:
            return {
                ...state,
                loading: action.payload, 
            }
        case DELETE_SALE:
            return {
                ...state,
                loading: true,
                delete: action.payload,
            }
        case CREATE_SALE_SUCCESS:
            return {
                ...state,
                loading: false,
                purchases: [...state.purchases, action.payload],
                errors: null
            }
        case EDIT_SALE_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: null,
                edit: action.payload,
                edition: false
            }
        case CREATE_SALE_ERROR:
        case VIEW_SALES_ERROR:
        case EDIT_SALE_ERROR:
        case DELETE_SALE_ERROR:
        case UPDATE_SALE_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case VIEW_SALES:
            return {
                ...state,
                loading: action.payload,
            }
        case VIEW_SALES_SUCCESS:
            return {
                ...state,
                loading: false,
                purchases: action.payload,
                error: false
            }
        case UPDATE_SALE_SUCCESS:
            return {
                ...state,
                edit: false,
                purchases: state.purchases.map ( item => item.id === action.payload.id ? item = action.payload : item )
            }
        case DELETE_SALE_SUCCESS:
            return {
                ...state,
                purchases: state.purchases.filter( item => item.id !== state.delete ),
                delete: null
            }

        case DELETE_ITEM_CART_SALE:
            return{
                ...state,
                cart: state.cart.filter( item => item.id !== action.payload )
            }
        case CANCEL_ITEMS_CART_SALE:
            return {
                ...state,
                cart: [],
                providers: [],
                products: []
            }
        case ADD_ITEM_CART_SALE:
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
        
        case VIEW_SALE_SUCCESS:
            return {
                ...state,
                showPurchase: action.payload.purchase,
                showProducts: action.payload.products
            }
        default: 
            return state
    }
}