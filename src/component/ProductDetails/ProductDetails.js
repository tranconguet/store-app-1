import React, {useState} from 'react';
import classes from './product-details.module.css'
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Alert/Modal/Modal';
import * as Utility from '../../utility/utility';
import Alert from '@material-ui/lab/Alert';

const ProductDetails = props => {
    const [notice, setNotice] = useState(null);
    const data = props.data;
    const productCode = Utility.getProductCodeFromUrl(data.url);
    const description = () => {
        const temp = data.productDescription.split("\n");
        let result = temp.map(p => (<p>{p}</p>));
        return result;
    };
    const parameters = data.parameters.map( param => (<li>{param}</li>));
    let price = 
        <div>
            <p>Price : {data.newPrice}$</p>
            <p style={{visibility:"hidden"}}>none</p>
        </div>;
    if(data.oldPrice){
        price = 
            <div>   
                <p className={classes.OldPrice}>Price : {data.oldPrice}</p>
                <p className={classes.Sale}>Sale : {data.newPrice} </p>
            </div>;
    }    
    return (
        <div className={classes.ProductDetails}>
            <Modal show={props.isAddingCart} modalClosed={props.cancelAddingCart} 
                  addItem={()=>props.addItem(productCode)}>
                  <p>Add {data.title} to your cart ?  </p>
                    {notice}
                  <div className={classes.mButton}>
                    <Button content={`Cancel`} click={props.cancelAddingCart} />
                  </div>
                  <div className={classes.mButton}>
                    <Button content={`Add`} click={()=> {
                        if(props.isAuth){
                            props.addItem();
                            props.cancelAddingCart();
                        }else{
                            setNotice((<Alert severity="error"> You need to login first ! </Alert>));
                        }
                        
                        }} goto="/cart"/>
                  </div>
            </Modal>
            <div className={classes.Details}>
                <img src={data.img} alt="product" className={classes.picture} />
                <div className={classes.Info}>
                    <strong>Product: {data.title}</strong>
                    <p></p>
                    <p></p>
                    <p>Product Information: </p>
                    {parameters}
                    <p></p>
                    {price}
                </div>
            </div>
            <div className={classes.Buttons}>
                <Button content={`Add to cart`} click={props.openModal} />
            </div>
            <div className={classes.productDescription}>
                {description()}
            </div>
        </div>
    )
}

export default ProductDetails;