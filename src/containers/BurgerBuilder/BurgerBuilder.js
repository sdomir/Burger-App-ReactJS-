import React, {Component} from 'react';
import {Aux} from "../../HOC/Aux";
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const price = {
    Salad:0.2,
    Bacon:1.5,
    Cheese:0.5,
    Meat:1
}
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            Salad:0,
            Bacon:0,
            Cheese:0,
            Meat:0
        },
        totalPrice: 2
    }

    addIngredientHandler = (type) => {
        const oldcount = this.state.ingredients[type];
        const updatedcount = oldcount+1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedcount;
        const olddprice = this.state.totalPrice;
        const newprice = olddprice + price[type];
        this.setState({ingredients:updatedIngredients, totalPrice:newprice});
    }

    removeIngredientHandler = (type) => {
        const oldcount = this.state.ingredients[type];
        if(oldcount === 0)
            return;
        const updatedcount = oldcount-1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedcount;
        const olddprice = this.state.totalPrice;
        const newprice = olddprice - price[type];
        this.setState({ingredients:updatedIngredients, totalPrice:newprice});
    }

    render() {
        const disabled = {...this.state.ingredients};
        for(let key in disabled){
            disabled[key]=disabled[key] <= 0;
        }
        return (
          <Aux>
              <Burger ingredients = {this.state.ingredients}/>
              <BuildControls ingredients = {this.state.ingredients}
                             addItem={this.addIngredientHandler}
                             rmItem={this.removeIngredientHandler}
                             disableInfo={disabled}/>
          </Aux>
        );
    }
}
export default BurgerBuilder;