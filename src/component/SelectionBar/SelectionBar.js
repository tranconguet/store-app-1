import React from 'react';
import classes from './selection-bar.module.css';

const selectionBar = props => {

    return (
        <div>
            <div className={classes.Container}>
                <a href="/home" className={classes.Link} > Home </a> 
                <a href="/phone" className={classes.Link} > Phone </a>
                <a href="/acs" className={classes.Link} > Accessories </a>
                <a href="/watch" className={classes.Link} > Watch </a>
                <a href="/tablet" className={classes.Link} > Tablet </a>
             </div>
        </div>
        
    )
}

export default selectionBar;