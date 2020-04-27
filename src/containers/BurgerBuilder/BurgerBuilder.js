import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Aux} from "../../HOC/Aux";
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary";
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions/burgerBuilder';

class BurgerBuilder extends Component {

    state = {
        summary: false,
        loading: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
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
        let burger = this.props.error?<p>Ingredients can't be loaded</p>:<Spinner/>;
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
        ingrd: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdd: (igrName) => dispatch(burgerBuilderActions.addIngredient(igrName)),
        onIngredientsRemove: (igrName) => dispatch(burgerBuilderActions.removeIngredient(igrName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);