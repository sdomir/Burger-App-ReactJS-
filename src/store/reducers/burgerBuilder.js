import * as actionType from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 2,
    error: false
}

const price = {
    Salad:0.2,
    Bacon:1.5,
    Cheese:0.5,
    Meat:1
}

const burgerBuilder = (state=initialState, action) => {
    switch(action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingrName]: state.ingredients[action.ingrName] + 1
                },
                totalPrice: state.totalPrice + price[action.ingrName]
            };
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingrName]: state.ingredients[action.ingrName] - 1
                },
                totalPrice: state.totalPrice - price[action.ingrName]
            };
        case actionType.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            };
        case actionType.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default burgerBuilder;