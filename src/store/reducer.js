import * as actionType from './actions';

const initialState = {
    ingredients: {
        Salad: 0,
        Meat: 0,
        Bacon: 0,
        Cheese: 0
    },
    totalPrice: 2
}

const price = {
    Salad:0.2,
    Bacon:1.5,
    Cheese:0.5,
    Meat:1
}

const reducer = (state=initialState,action) => {
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
        default:
            return state;
    }
}

export default reducer;