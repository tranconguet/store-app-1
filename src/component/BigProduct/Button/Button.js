import React from 'react'
import './Button.css'


export default function Button(props) {
    const active = props.isActive ? 'active' : '';
    return (
        <div className={`button ${active}`} onClick={props.onClick}></div>
    )
}
