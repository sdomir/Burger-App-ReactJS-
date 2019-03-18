import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Aux} from "../../HOC/Aux";
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary";
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionType from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        summary: false,
        loading: false
    };

    componentDidMount() {
        /*axios.get('https://my-burger-66d54.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients:response.data});
            })*/
    }

    purchasebleState() {
        let sum = 0;
        for(let key in this.props.ingrd){
            sum = sum+this.props.ingrd[key];
        }
        return sum > 0;
    }

    showSummary = () => {
        this.setState({summary:true})
    }

    removeSummary = () => {
        this.setState({summary:false})
    }

    purchaseContinueHandler = () => {

        this.props.history.push('/summary');
    }

    render() {
        console.log("Rendering burger builder......");
        const disabled = {...this.props.ingrd};
        for(let key in disabled){
            disabled[key]=disabled[key] <= 0;
        };
        let orderSummary = null;
        let burger = <Spinner/>;
        if(this.props.ingrd){
            burger = (
              <Aux>
                  <Burger ingredients = {this.props.ingrd}/>
                  <BuildControls ingredients = {this.props.ingrd}
                                 addItem={this.props.onIngredientsAdd}
                                 rmItem={this.props.onIngredientsRemove}
                                 disableInfo={disabled}
                                 price={this.props.price}
                                 orderButtonState={this.purchasebleState()}
                                 orderClick={this.showSummary}/>
              </Aux>
            );
            orderSummary = <OrderSummary ingredients = {this.props.ingrd}
                                         show={this.state.summary}
                                         remove={this.removeSummary}
                                         continue={this.purchaseContinueHandler}
                                         price={this.props.price}/>;
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
const mapStateToProps = state => {
    return {
        ingrd: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdd: (igrName) => dispatch({type: actionType.ADD_INGREDIENT, ingrName:igrName}),
        onIngredientsRemove: (igrName) => dispatch({type: actionType.REMOVE_INGREDIENT, ingrName:igrName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);