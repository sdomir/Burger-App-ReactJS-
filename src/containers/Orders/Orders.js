import React,{Component} from 'react';
import Order from "../../components/Order/Order";
import axios from '../../axios-order';
class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    };

    componentDidMount() {
        axios.get('/orders.json').then(response => {
            const fetchedOrders=[];
            for(let key in response.data){
                fetchedOrders.push({...response.data[key],id:key});
            }
            this.setState({orders:fetchedOrders,loading:false});
        }).catch(err => {
            this.setState({loading:false});
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.orders.map(or => {
                        return (
                            <Order key={or.id}
                               price={or.price}
                               ingredients={or.ingredients} />
                        )})
                }
            </div>
        );
    }
}

export default Orders;