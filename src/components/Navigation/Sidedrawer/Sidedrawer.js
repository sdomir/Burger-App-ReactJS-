import React from 'react';
import classes from './Sidedrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems';
import Backdrop from "../../UI/Backdrop/Backdrop";
import {Aux} from "../../../HOC/Aux";
const Sidedrawer = (props) => {
    let attachedClasses = [classes.Sidedrawer, classes.Close];
    if(props.show){
        attachedClasses = [classes.Sidedrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop showing={props.show} clicked={props.shut}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default Sidedrawer;