import React from 'react';
import classes from './BuildControl.css';

const BuildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less}
                    onClick={()=> props.removeClick(props.typeOf)}
                    disabled={props.toDisable[props.typeOf]}>-</button>
            <button className={classes.More} onClick={()=> props.addClick(props.typeOf)}>+</button>
            <input className={classes.Quant} value={props.ingr[props.typeOf]} readOnly/>
        </div>
    );
};

export default BuildControl;