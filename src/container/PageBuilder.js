import React from 'react';
import classes from './page-builder.module.css';

const pageBuilder = props => {

    return (
        <div className={classes.PageBuilder}>
            {props.children}
        </div>
    )
}

export default pageBuilder;