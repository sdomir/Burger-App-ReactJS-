import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import {connect} from 'react-redux'
import {Aux} from '../../../HOC/Aux';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                valid: false,
                touched:false
            },
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                valid: false,
                touched:false
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                valid: false,
                touched:false
            },
            postalCode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zipcode'
                },
                value: '',
                valid: false,
                touched:false
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig: {
                    options:[{value:'fastest', displayValue: 'Fastest'},
                            {value:'cheapest', displayValue: 'Cheapest'}
                            ]
                },
                value: 'Fastest',
                valid: true
            },
        },
        loading: false,
        formIsValid: false
    };

    placeOrderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
       const customerDetails = {};
       for(let key in this.state.orderForm){
           customerDetails[key]=this.state.orderForm[key].value;
       }
       const order = {
           ingredients: this.props.ingr,
           price: this.props.price,
           customer: customerDetails
        };
       axios.post('/orders.json',order).then(response => {
           this.setState({loading: false});
           this.props.history.push('/');
               })
               .catch(error => {
                   this.setState({loading:false});
               });
    }

    isValid(value){
        return value.trim()!==''?true:false;
    }

    inputHandler = (event,inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedOrderElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedOrderElement.value=event.target.value;
        updatedOrderElement.valid = this.isValid(updatedOrderElement.value);
        updatedOrderElement.touched=true;
        updatedOrderForm[inputIdentifier]=updatedOrderElement;
        let isFormValid = true;
        for(let element in updatedOrderForm){
            isFormValid = isFormValid && updatedOrderForm[element].valid;
        }
        this.setState({orderForm:updatedOrderForm, formIsValid:isFormValid});
    }
    render() {
        let formArray = [];
        for(let key in this.state.orderForm){
            formArray.push({id:key,config:this.state.orderForm[key]})
        }
        let replacer=(<Aux>
                            <h4>Enter your contact data</h4>
                            <form onSubmit={this.placeOrderHandler}>
                                {formArray.map(el => (
                                    <Input  key={el.id}
                                            elementType={el.config.elementType}
                                           elementConfig={el.config.elementConfig}
                                           value={el.config.value}
                                            invalid={!el.config.valid}
                                            touched={el.config.touched}
                                            changed={(event) => this.inputHandler(event,el.id)}/>
                                ))}
                                <Button color="Success" disable={!this.state.formIsValid}>ORDER</Button>
                            </form>
                          </Aux>
                            );
        if(this.state.loading)
            replacer = <Spinner/>

        return (
            <div className={classes.ContactData}>
                {replacer}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingr:state.ingredients,
        price:state.totalPrice
    }
}

export default connect(mapStateToProps,null)(ContactData);