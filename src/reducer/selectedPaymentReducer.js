import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';

const selectedPaymentReducer = (state = initialState.selectedPaymentReducer, action) => {
    switch(action.type) {

        case ActionType.GET_PAYMENT_RESPONSE: {
            return {
                ...state,
                payment: _.assign(action.payment)
            };
        }

        default: { return state; }
    }
};

export default selectedPaymentReducer;
