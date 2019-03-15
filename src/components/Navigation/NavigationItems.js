import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem';

const NavigationItems = (props) => {
    let navstyle = classes.NavigationItems;
    if(props.hide)
        navstyle= classes.List;
    return (
        <ul className={navstyle}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
        </ul>
    );
}

export default NavigationItems;