import React from 'react';
import classes from './product.module.css';
import Button from '../../../UI/Button/Button';
import * as Utility from '../../../utility/utility';

const product = props => {
    const img = props.data.img;
    const productCode = Utility.getProductCodeFromUrl(props.data.url);
    let price = <div>
                    <p style={{visibility:"hidden"}}>none</p>
                    <p className={classes.Sale} >Price : {props.data.newPrice}</p>
                </div>;
    if(props.data.oldPrice){
        price = 
            <div>   
                <p className={classes.OldPrice}>Price : {props.data.oldPrice}</p>
                <p className={classes.Sale}>Price : {props.data.newPrice}</p>
            </div>;
    }
    return (
        <div className={classes.Product}>
            <div className={classes.img}>
                <a href={`/${productCode}-details`} ><img src={img} alt="product" className="card-img-top"/></a>
            </div>
            <p style={{height:"50px"}}>{props.data.title}</p>
            {price}
            <Button goTo={`${productCode}-details`} content="Details"/>
        </div>
    )
}

export default product;