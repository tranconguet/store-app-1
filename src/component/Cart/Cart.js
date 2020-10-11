import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import classes from './cart.module.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import * as Utility from '../../utility/utility';
import Link from '@material-ui/core/Link';

const Cart = props => {

    const newData = props.cart.map(cur => {
        const id = cur[0];
        const data = Utility.getDataFromId(id);
        const number = cur[1];
        return [id, number, data.title, Utility.convertPrice(data.newPrice)];
    });

    const [cart, setCart] = useState([]);

    useEffect(()=>{
        setCart(props.cart);
    },[props.cart]);

    const numberHandle = (e, index) =>{
        const value = e.target.value;
        let newCart = [...cart];
        let newObject = [newCart[index][0], value];
        newCart[index] = newObject;
        props.updateCart(newCart);
        setCart(newCart);
    }
    const total = newData.reduce((sum,cur) => {
        return sum += cur[3]*cur[1];
    },0);

    return (
        <div className={classes.CartTable}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Price Each</th>
                        <th>Number</th>
                        <th>Price</th>
                        <th>Cancel</th>
                    </tr>
                </thead>
                <tbody>
                    {newData.map((cur,index)=>
                        {
                            let num;
                            if(cart[index]) num = cart[index][1];
                            return (
                                <tr key={cur[0]}>
                                    <td>1</td>
                                    <td>{cur[2]}</td>
                                    <td>{Utility.convertPriceToString(cur[3])}</td>
                                    <td><input type="number" value={num || ''} onChange={(e)=>numberHandle(e,index)}
                                    style={{width: "60px",float:"right"}}></input></td>
                                    <td>{Utility.convertPriceToString(cur[3]*cur[1])}</td>
                                    <td className={classes.deleteIcon} >
                                        <IconButton aria-label="delete" onClick={()=>props.cancelItem(cur[0])}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </td>
                                </tr>)}
                    )}
                    <tr>
                        <td>Total</td>
                        <td colSpan="5">{Utility.convertPriceToString(total)}</td>
                    </tr>
                </tbody>
            </Table>
            <div style={{float: 'right'}}>
                <Link href="/check-out"> Check out </Link>
            </div>
            
        </div>
    )
}


export default Cart;