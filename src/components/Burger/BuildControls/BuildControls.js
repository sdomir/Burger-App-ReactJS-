import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    { label: "salad", type: "Salad"},
    { label: "bacon", type: "Bacon"},
    { label: "cheese", type: "Cheese"},
    { label: "meat", type: "Meat"}
];
const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Burger Price: <strong>{props.price.toFixed(2)}</strong></p>
            {
                controls.map(ig => {
                    return <BuildControl addClick={props.addItem}
                                         removeClick={props.rmItem}
                                         label={ig.label}
                                         key={ig.label}
                                         ingr = {props.ingredients}
                                         typeOf ={ig.type}
                                          toDisable={props.disableInfo}/>
                })
            }
            <button className={classes.OrderButton}
                    disabled={!props.orderButtonState}
                    onClick={props.orderClick}>ORDER NOW</button>
        </div>
    );
};

export default BuildControls;