import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { FaPowerOff } from 'react-icons/fa';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Zbuduj burgera</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/orders" >Twoje zamówienia</NavigationItem> : null}
            {!props.isAuthenticated
                ? <NavigationItem link="/auth" >Logowanie</NavigationItem>
                : <NavigationItem link="/logout">Wyloguj <FaPowerOff style={{ paddingLeft: '10px', marginTop: '2px' }} /></NavigationItem>}
        </ul>
    );
}

export default navigationItems;