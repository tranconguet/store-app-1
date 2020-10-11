import React from 'react'
import './card.css'


export default function Card(props) {
    const img = require(`../data/img/${props.index}.png`);
    return (
        <div className="card">
            <a href={props.link}>
                <img alt={props.index} src={img}></img>
            </a>
        </div>
    )
}
