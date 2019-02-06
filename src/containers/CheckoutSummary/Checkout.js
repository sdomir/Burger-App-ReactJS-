import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";
import {Route} from "react-router-dom";

class Checkout extends Component {
    state = {
        ingredient: null,
        totalPrice: 0
    };

    componentWillMount() {
        const searchParams = this.props.location.search;
        const query = new URLSearchParams(searchParams);
        const ingredients={}
        let price=0;
        for(let key of query.entries()){
            if(key[0]==="price"){
                price = +key[1];
            }
            else {
                ingredients[key[0]] = +key[1];
            }
        }
        this.setState({ingredient:ingredients, totalPrice:price});
    }

    goBackHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/summary/ContactData');
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredient}
                                    back={this.goBackHandler}
                                    continue={this.checkoutContinueHandler}/>
                <Route path ={this.props.match.path + '/ContactData'}
                       render={(props)=>(<ContactData ingredients={this.state.ingredient} price={this.state.totalPrice}
                                                      {...props}/>)}/>
            </div>
        );
    }

}

export default Checkout;