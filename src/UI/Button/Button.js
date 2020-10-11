import React from 'react';
import classes from './button.module.css';


const button = props => {

    return (
        <div className={classes.Button} align="center" onClick={props.click}>
            <a className={classes.AddButton} href={props.goTo} rel="nofollow noopener">
                {props.content}
            </a>
        </div>
    )
}

export default button;