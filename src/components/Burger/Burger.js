import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    const transIngredients = Object.keys(props.ingredients);
    let ingredients = transIngredients.map((name) => {
         return [...Array(props.ingredients[name])]
             .map((_,index) => {
             return <BurgerIngredient type={name} key={name+index}/>
        });
    });
    let reducedIngredients= null;
    reducedIngredients = ingredients.reduce((arr,curVal) => {return arr.concat(curVal)},[]);
    if(reducedIngredients.length === 0)
        ingredients = <p>Please add ingredients</p>
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="BreadTop"/>
            {ingredients}
            <BurgerIngredient type="BreadBottom"/>
        </div>
    );
};

export default Burger;