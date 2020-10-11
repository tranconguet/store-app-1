import React from 'react';
import classes from './SayHi.module.css';


const sayHi = props => {
    let sayHi;
    if(props.name){
        sayHi = `Welcome, ${props.name} !`;
    }
    return (
        <div className={classes.SayHi}>
            <div></div>
            <div>
                <p className={classes.text}>{sayHi}</p>
            </div>
            <div></div>
        </div>
    )
}

export default sayHi;