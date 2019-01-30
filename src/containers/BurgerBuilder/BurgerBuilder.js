import React, {Component} from 'react';
import {Aux} from "../../HOC/Aux";
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary";

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
        totalPrice: 2,
        purchasable: false,
        summary: false
    }

    purchasebleState(updatedIngredients) {
        let sum = 0;
        for(let key in updatedIngredients){
            sum = sum+updatedIngredients[key];
        }
        console.log(sum>0);
        return sum > 0;
    }

    addIngredientHandler = (type) => {
        const oldcount = this.state.ingredients[type];
        const updatedcount = oldcount+1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedcount;
        const olddprice = this.state.totalPrice;
        const newprice = olddprice + price[type];
        this.setState({ingredients:updatedIngredients,
            totalPrice:newprice,
            purchasable:true});
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
        this.setState({ingredients:updatedIngredients,
            totalPrice:newprice,
            purchasable:this.purchasebleState(updatedIngredients)});
    }

    showSummary = () => {
        this.setState({summary:true})
    }

    render() {
        const disabled = {...this.state.ingredients};
        for(let key in disabled){
            disabled[key]=disabled[key] <= 0;
        };
        return (
          <Aux>
              <OrderSummary ingredients = {this.state.ingredients}
                            show={this.state.summary}/>
              <Burger ingredients = {this.state.ingredients}/>
              <BuildControls ingredients = {this.state.ingredients}
                             addItem={this.addIngredientHandler}
                             rmItem={this.removeIngredientHandler}
                             disableInfo={disabled}
                             price={this.state.totalPrice}
                             orderButtonState={this.state.purchasable}
                             orderClick={this.showSummary}/>
          </Aux>
        );
    }
}
export default BurgerBuilder;