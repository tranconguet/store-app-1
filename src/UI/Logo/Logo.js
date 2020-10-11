import React from 'react';
import classes from './logo.module.css';
import meowLogo from '../../assets/meow-logo.png';

const logo = props => {
    return (
        <div className={classes.Logo}>
            <a href="/home">
                <img src={meowLogo} alt="logo"></img>
            </a>
        </div>
    )
}

export default logo;