import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import {Aux} from '../../../HOC/Aux';
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {

    state = {
        ingredients: null,
        name:'',
        email:'',
        address: {
            street:'',
            postalCode:''
        },
        loading: false
    };

    placeOrderHandler = () => {
        this.setState({loading:true});
       const order = {
           ingredients: this.props.ingredients,
           price: this.props.price,
           customer: {
               name: 'Dayum',
               Address: '506 Finacial District',
               City: 'San Francisco'
           }
       }
       axios.post('/orders.json',order).then(response => {
           this.setState({loading: false});
           this.props.history.push('/');
               })
               .catch(error => {
                   this.setState({loading:false});
               });
    }

    render() {
        let replacer=(<Aux>
                            <h4>Enter your contact data</h4>
                            <form>
                                <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                                <input className={classes.Input} type="text" name="email" placeholder="Your Email"/>
                                <input className={classes.Input} type="text" name="street" placeholder="Street Name"/>
                                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                                <Button color="Success" clicked={this.placeOrderHandler}>ORDER</Button>
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

export default ContactData;