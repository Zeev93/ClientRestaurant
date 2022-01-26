import { combineReducers } from "redux";

import authReducer from './authReducer'
import alertReducer from './alertReducer'
import categoryReducer from './categoryReducer'
import providerReducer from './providerReducer'
import productReducer from './productReducer'
import purchaseReducer from './purchaseReducer'
import saleReducer from './saleReducer'


export default combineReducers({
    auth:authReducer,
    alert:alertReducer,
    categories:categoryReducer,
    providers:providerReducer,
    products:productReducer,
    purchases:purchaseReducer,
    sales: saleReducer
})