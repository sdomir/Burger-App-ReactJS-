import React, {Component} from 'react';
import {Aux} from '../../HOC/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar';
import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer";

class Layout extends Component {
    state= {showSideDrawer:false}

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false})
    }

    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer:true})
    }
    render() {
        return (
            <Aux>
                <Toolbar clicked={this.sideDrawerOpenHandler}
                         hideNav={this.state.showSideDrawer}/>
                <Sidedrawer show={this.state.showSideDrawer}
                            shut={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}
export default Layout;