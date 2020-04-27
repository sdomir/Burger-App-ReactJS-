import * as actionType from './actionTypes';
import axios from 'axios';

export const purchaseBurgerSuccess = (id,data) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: data
    }
};

export const purchaseBurgerFailure = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAILURE,
        error: error
    }
};

export const purchaseOrder = (orderData) => {
    return dispatch => {
        dispatch(purchaseOrderStart());
        axios.post('https://my-burger-66d54.firebaseio.com/orders.json',orderData).then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        })
            .catch(error => {
                dispatch(purchaseBurgerFailure(error))
            });
    }
};

export const purchaseOrderStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START
    };
};
