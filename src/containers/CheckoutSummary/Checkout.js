import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";
import {Route} from "react-router-dom";
import {connect} from 'react-redux';

class Checkout extends Component {

    goBackHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/summary/ContactData');
    }

    render() {
        console.log("Rendering checkout.....");
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ingr}
                                    back={this.goBackHandler}
                                    continue={this.checkoutContinueHandler}/>
                <Route path ={this.props.match.path + '/ContactData'} component={ContactData}/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        ingr: state.ingredients,
    }
}

export default connect(mapStateToProps, null)(Checkout);