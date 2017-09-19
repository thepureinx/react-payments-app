import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import paymentReducer from './paymentReducer';
import selectedPaymentReducer from './selectedPaymentReducer';
import apiReducer from './apiReducer';

export default combineReducers({
    paymentReducer,
    selectedPaymentReducer,
    apiReducer,
    form: formReducer
});
