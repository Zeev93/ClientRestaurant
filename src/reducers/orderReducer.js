import {
    CREATE_ORDER,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,
    VIEW_ORDERS,
    VIEW_ORDERS_SUCCESS,
    VIEW_ORDERS_ERROR,
    DELETE_ORDER,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_ERROR,
    EDIT_ORDER,
    EDIT_ORDER_SUCCESS,
    EDIT_ORDER_ERROR,
    UPDATE_ORDER,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_ERROR,

    VIEW_ORDER,
    VIEW_ORDER_SUCCESS,
    VIEW_ORDER_ERROR,

    ADD_ITEM_CART_ORDER,
    DELETE_ITEM_CART_ORDER,
    CANCEL_ITEMS_CART_ORDER,
} from '../types'

const initialState = {
    orders: [],
    errors: false,
    loading: false,
    edit: false,
    delete: null,
    cart: [],
    showOrder: null,
    showProducts: [], 
    total: 0
}



export default function foo (state = initialState, action ){
    switch (action.type) {

        case CREATE_ORDER:
        case EDIT_ORDER:
        case UPDATE_ORDER:
        case VIEW_ORDER:
            return {
                ...state,
                loading: action.payload, 
            }
        case DELETE_ORDER:
            return {
                ...state,
                loading: true,
                delete: action.payload,
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: [...state.orders, action.payload],
                errors: null
            }
        case EDIT_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: null,
                edit: action.payload,
                edition: false
            }
        case CREATE_ORDER_ERROR:
        case VIEW_ORDERS_ERROR:
        case EDIT_ORDER_ERROR:
        case DELETE_ORDER_ERROR:
        case UPDATE_ORDER_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case VIEW_ORDERS:
            return {
                ...state,
                loading: action.payload,
            }
        case VIEW_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
                error: false
            }
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                edit: false,
                orders: state.orders.map ( item => item.id === action.payload.id ? item = action.payload : item )
            }
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                orders: state.orders.filter( item => item.id !== state.delete ),
                delete: null
            }

        case DELETE_ITEM_CART_ORDER:
            return{
                ...state,
                cart: state.cart.filter( item => item.id !== action.payload )
            }
        case CANCEL_ITEMS_CART_ORDER:
            return {
                ...state,
                cart: [],
                providers: [],
                products: []
            }
        case ADD_ITEM_CART_ORDER:
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
                errors: null,
            }
        
        case VIEW_ORDER_SUCCESS:
            return {
                ...state,
                showPurchase: action.payload.purchase,
                showProducts: action.payload.products
            }
        default: 
            return state
    }
}