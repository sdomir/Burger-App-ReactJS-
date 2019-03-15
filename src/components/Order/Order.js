import React from 'react';
import classes from './Order.css';
const Order = (props) => {
        let arrayOfIngredients = [];
        for (let key in props.ingredients) {
            arrayOfIngredients.push({name: key, amount: props.ingredients[key]});
        }
        const ingredientsOutput = arrayOfIngredients.map(ig => {
            return <span className={classes.ingredients} key={ig.name}>{ig.name} ({ig.amount}) </span>
        })
    return (
        <div className={classes.Order}>
            <p>Ingredients:{ingredientsOutput}</p>
            <p>Price:<strong> USD {props.price}</strong></p>
        </div>
        )
}

export default Order;