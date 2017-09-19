import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';

const paymentsReducer = (state = initialState.paymentsReducer, action) => {
    switch(action.type) {
        case ActionType.GET_PAYMENTS_RESPONSE: {

            return {
                ...state,
                payments: _.assign(action.payments)
            };
        }

        default: { return state; }
    }
};

export default paymentsReducer;
