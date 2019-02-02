import React from 'react';
import classes from './OrderSummary.css';
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Button from "../../components/UI/Button/Button"
import {Aux} from '../../HOC/Aux';
const OrderSummary = (props) => {
    const summary = Object.keys(props.ingredients).map(ig => {
        if(props.ingredients[ig] !== 0) {
            return <li key={ig}><strong>{ig}</strong>:{props.ingredients[ig]}</li>
        }
        return null;
    });
    return (
        <Aux>
            <Backdrop showing={props.show} clicked={props.remove}/>
            <div className={classes.Modal}
                 style={{
                     transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
                     opacity: props.show ? '1':'0'
                 }}>
                <h3>Order Summary</h3>
                <p>The following is your order:</p>
                <ul>
                    {summary}
                </ul>
                <p><strong>Total Price:{props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={props.remove} color="Danger">CANCEL</Button>
                <Button color="Success" clicked={props.continue}>PROCEED</Button>
            </div>
        </Aux>
    );
}

export default OrderSummary;