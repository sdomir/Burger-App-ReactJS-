import React, {Component} from 'react';
import axios from 'axios';
import {Aux} from "../../HOC/Aux";
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary";
import Spinner from '../../components/UI/Spinner/Spinner';
const price = {
    Salad:0.2,
    Bacon:1.5,
    Cheese:0.5,
    Meat:1
}
class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 2,
        purchasable: false,
        summary: false,
        loading: false
    };

    componentDidMount() {
        axios.get('https://my-burger-66d54.firebaseio.com/ingredients.json')
            .then(response => {
                console.log(response.data);
                this.setState({ingredients:response.data});
            })
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

    removeSummary = () => {
        this.setState({summary:false})
    }

    purchaseContinueHandler = () => {
        const ingredient = [];
        for(let key in this.state.ingredients){
            ingredient.push(encodeURIComponent(key)+ "=" + encodeURIComponent(this.state.ingredients[key]))
        }
        ingredient.push("price=" + this.state.totalPrice);
        const query = ingredient.join('&');
        this.props.history.push({pathname: '/summary',
                                    search: '?'+query});
    }

    render() {
        console.log("Rendering burger builder......");
        const disabled = {...this.state.ingredients};
        for(let key in disabled){
            disabled[key]=disabled[key] <= 0;
        };
        let orderSummary = null
        let burger = <Spinner/>
        if(this.state.ingredients){
            burger = (
              <Aux>
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
            orderSummary = <OrderSummary ingredients = {this.state.ingredients}
                                         show={this.state.summary}
                                         remove={this.removeSummary}
                                         continue={this.purchaseContinueHandler}
                                         price={this.state.totalPrice}/>;
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }
        return (
          <Aux>
              {orderSummary}
              {burger}
          </Aux>
        );
    }
}
export default BurgerBuilder;