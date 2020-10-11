import React, { useState } from 'react';
import {NavLink }from 'react-router-dom';
import classes from './search-box.module.css';

const Search = props => {
    const [input, setInput] = useState('');


    return (
        <div className={classes.container}>
            <div className={classes.SearchBox}>
                <input className={classes.SearchInput} type="text" name="content" placeholder="Search . . ." 
                onChange={e =>{setInput(e.target.value)}}></input>
                <NavLink to={{
                    pathname: `/search`,
                    hash: '#submit',
                    search: input}}>
                    <button className={classes.SearchButton}>
                        <i className="material-icons">
                            search
                        </i>
                    </button>
                </NavLink>
            </div>
        </div>
        
    )
}

export default Search;