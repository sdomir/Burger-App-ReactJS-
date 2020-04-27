import * as actionType from './actionTypes';
import axios from 'axios';

export const addIngredient = (name) => {
    return {
        type: actionType.ADD_INGREDIENT,
        ingrName: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actionType.REMOVE_INGREDIENT,
        ingrName: name
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionType.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionType.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://my-burger-66d54.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            }).catch(error => {
                dispatch(fetchIngredientsFailed());
        })
    };
};
