import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const AddressForm = props => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState(props.data.firstName);
  const [lastName, setLastName] = useState(props.data.lastName);
  const [address, setAddress] = useState(props.data.location);
  const [phoneNumber, setPhoneNumber] = useState(props.data.phoneNumber);
  const [notice, setNotice] = useState(null);
  let data = {
    firstName: firstName,
    lastName: lastName,
    location: address,
    phoneNumber: phoneNumber
  }

  const next = () =>{
    if(firstName !== '' && lastName !== '' && address !== '' && phoneNumber !== ''){
      console.log(data);
      props.submit(data);
      props.handleNext();
    }else{
      setNotice(
        <Alert severity="info"> Please fill out information ! </Alert>)
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="shipping address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="phonenumber"
            name="phonenumber"
            label="Phone Number"
            fullWidth
            autoComplete="shipping phonenumber"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
      {notice}
      <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={next}
                    className={classes.button}
                  > Next </Button>
      </div>
    </React.Fragment>
  );
}

export default AddressForm;
