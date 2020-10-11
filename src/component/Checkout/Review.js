import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import * as Utility from '../../utility/utility';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const Review = props => {
  const classes = useStyles();

  const orderDate = new Date();
  const expiryDate = new Date(orderDate);
  expiryDate.setDate(expiryDate.getDate() + 4);

  const products = [
    ...props.cart,
    { name: 'Shipping', number: '', priceEach: 0 }
  ];
  const address = {...props.address};
  const payment = {...props.payment};
  const paymentDetails = () => {
    if(payment.type === 'receive') {
      return (
        <Grid item xs={12}>
          <Typography gutterBottom>Pay when you receive </Typography>
        </Grid>
      );
    }
    if(payment.type === 'card'){
      return (
        <React.Fragment>
          <Grid item xs={12}>
            <Typography gutterBottom>Card type: {payment.cardInfo.type}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Card holder: {payment.cardInfo.holder}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Card number: {payment.cardInfo.number}</Typography>
          </Grid>
        </React.Fragment>
      )
    }
  }
  
  const total = products.reduce((sum,cur) => {
    return sum += cur.priceEach * cur.number;
  },0);
  const next = () =>{
    const data = {
      orderDate: orderDate.toDateString(),
      products: products,
      address: address,
      payment: payment
    }
    props.addOrder(data);
    props.handleNext();
  }
  const back = () =>{
    props.handleBack();
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => {
          const price = Utility.convertPriceToString(product.priceEach * product.number);
          return (
            <ListItem className={classes.listItem} key={product.name}>
              <ListItemText primary={product.name} secondary={product.number} />
              <Typography variant="body2">{price}</Typography>
            </ListItem>
        )})}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {Utility.convertPriceToString(total)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{`${address.firstName} ${address.lastName}`}</Typography>
          <Typography gutterBottom>{`Phone number: ${address.phoneNumber}`}</Typography>
          <Typography gutterBottom>{`Address: ${address.location}`}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {paymentDetails()}
          </Grid>
        </Grid>
      </Grid>
      <Typography gutterBottom style={{margin: "20px 0px 10px 0px"}}>
        {`You will receive my products from ${orderDate.toDateString()} to ${expiryDate.toDateString()} !` }
      </Typography>
      <div className={classes.buttons}>
          <Button onClick={back} className={classes.button}>
            Back
          </Button>  
          <Button
          variant="contained"
          color="primary"
          onClick={next}
          className={classes.button}>
            Order
          </Button>
      </div>
    </React.Fragment>
  );
}

export default Review;