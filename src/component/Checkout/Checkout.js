import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import * as Utility from '../../utility/utility';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
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

const steps = ['Shipping address', 'Payment details', 'Review your order'];


const Checkout = props => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  
  const cart = props.cart.map(cur => {
    const id = cur[0];
    const data = Utility.getDataFromId(id);
    const number = cur[1];
    return {id: id, name : data.title, number: number, priceEach: Utility.convertPrice(data.newPrice)};
  });
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    location: '',
    phoneNumber: ''
  });
  const [payment, setPayment] = useState({
    type: 'receive',
    cardInfo: {
      type: '',
      holder: '',
      number: ''
    }
  });

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <AddressForm submit={(data) => setAddress(data)} handleNext={handleNext} data={address} />;
      case 1:
        return <PaymentForm submit={(data) => setPayment(data)} handleBack={handleBack} handleNext={handleNext} data={payment}/>;
      case 2:
        return <Review handleBack={handleBack} handleNext={handleNext} cart={cart} address={address} payment={payment}
        addOrder={props.addOrder}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, you can check your order in order history session.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default Checkout;