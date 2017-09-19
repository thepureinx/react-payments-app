import * as ActionType from './ActionType';
import PaymentApi from '../api/PaymentApi';
import { ApiCallBeginAction, ApiCallErrorAction } from './ApiAction';

export const getPaymentsResponse = payments => ({
    type: ActionType.GET_PAYMENTS_RESPONSE,
    payments
});

export function getPaymentsAction() {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return PaymentApi.getAllPayments()
            .then(payments => {
                dispatch(getPaymentsResponse(payments));
            }).catch(error => {
                throw error;
            });
    };
}

export const addNewPaymentResponse = () => ({
    type: ActionType.ADD_NEW_PAYMENT_RESPONSE
});

export const updateExistingPaymentResponse = () => ({
    type: ActionType.UPDATE_EXISTING_PAYMENT_RESPONSE
});

export function savePaymentAction(paymentBeingAddedOrEdited) {
    return function (dispatch) {

        dispatch(ApiCallBeginAction());

        return PaymentApi.savePayment(paymentBeingAddedOrEdited)
            .then(() => {
                if (paymentBeingAddedOrEdited.id) {
                    dispatch(updateExistingPaymentResponse());
                } else {
                    dispatch(addNewPaymentResponse());
                }
            }).then(() => {
                dispatch(getPaymentsAction());
            }).catch(error => {
                dispatch(ApiCallErrorAction());
                throw (error);
            });
    };
}

export const getPaymentResponse = paymentFound => ({
    type: ActionType.GET_PAYMENT_RESPONSE,
    payment: paymentFound
});

export function getPaymentAction(paymentId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return PaymentApi.getPayment(paymentId)
            .then(payment => {
                dispatch(getPaymentResponse(payment));
            }).catch(error => {
                throw error;
            });
    };
}

export const deletePaymentResponse = () => ({
    type: ActionType.DELETE_PAYMENT_RESPONSE
});

export function deletePaymentAction(paymentId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return PaymentApi.deletePayment(paymentId)
            .then(() => {
                dispatch(deletePaymentResponse());
            }).then(() => {
                dispatch(getPaymentsAction());
            }).catch(error => {
                throw error;
            });
    };
}
