import React from 'react';
import classes from './result-page.module.css'


const resultPage = props => {

    return (
        <div className={classes.ResultPage}>
            {props.children}
        </div>            
    );
}

export default resultPage;