import { combineReducers } from "redux";

import authReducer from './authReducer'
import alertReducer from './alertReducer'
import categoryReducer from './categoryReducer'
import providerReducer from './providerReducer'


export default combineReducers({
    auth:authReducer,
    alert:alertReducer,
    categories:categoryReducer,
    providers:providerReducer
})