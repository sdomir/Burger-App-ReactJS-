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
        </div>
    );
};

export default BuildControls;