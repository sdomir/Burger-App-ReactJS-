import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";
import {Route,Redirect} from "react-router-dom";
import {connect} from 'react-redux';

class Checkout extends Component {

    goBackHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/summary/ContactData');
    }

    render() {
        let summary = <Redirect to={'/'}/>;
        console.log("Rendering checkout.....");
        if(this.props.ingr) {
            summary = (
                <div>
                <CheckoutSummary ingredients={this.props.ingr}
                                       back={this.goBackHandler}
                                       continue={this.checkoutContinueHandler}/>
                <Route path ={this.props.match.path + '/ContactData'} component={ContactData}/>
                </div>);
        }
        return summary;
    }

}

const mapStateToProps = state => {
    return {
        ingr: state.burgerBuilder.ingredients,
    }
}

export default connect(mapStateToProps, null)(Checkout);