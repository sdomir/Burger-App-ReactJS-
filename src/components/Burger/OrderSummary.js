import React from 'react';
import classes from './OrderSummary.css';
const OrderSummary = (props) => {
    const summary = Object.keys(props.ingredients).map(ig => {
        if(props.ingredients[ig] !== 0) {
            return <li key={ig}><strong>{ig}</strong>:{props.ingredients[ig]}</li>
        }
        return null;
    });
    return (
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
            <button>Checkout!</button>
        </div>
    );
}

export default OrderSummary;