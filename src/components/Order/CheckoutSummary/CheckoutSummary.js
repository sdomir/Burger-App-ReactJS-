import React from 'react';
import Button from "../../UI/Button/Button";
import classes from './CheckoutSummary.css';
import Burger from '../../Burger/Burger';

const CheckoutSummary = (props) => {
    return (
      <div className={classes.CheckoutSummary}>
          <h3>Hope you like it!</h3>
          <div>
              <Burger ingredients={props.ingredients}/>
          </div>
          <Button color="Danger" clicked={props.back}>CANCEL</Button>
          <Button color="Success" clicked={props.continue}>PROCEED</Button>
      </div>
    );
}

export default CheckoutSummary;