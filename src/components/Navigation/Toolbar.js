import React from 'react';
import classes from './Toolbar.css';
import Logo from '../Logo/Logo';
import NavigationItems from './NavigationItems';
const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div onClick={props.clicked}>MENU</div>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <NavigationItems hide={props.hideNav}/>
        </header>
    );
}

export default Toolbar;