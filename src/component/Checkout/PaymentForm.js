import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
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

const PaymentForm = props =>{
  const classes = useStyles();
  const [selection, setSelection] = useState(props.data.type);
  const [inputProps, setInputProps] = useState({disabled: props.data.type === 'receive'});
  const [cardInfo, setCardInfo] = useState(props.data.cardInfo);
  const [notice, setNotice] = useState(null);

  let data;
  const next = ()=>{
    if(selection === 'receive'){
      data = {type: 'receive', cardInfo: cardInfo}
    }
    if(selection === 'card'){
      data = {type: 'card', cardInfo: cardInfo}
    }
    if(selection === 'receive' || (cardInfo.type && cardInfo.holder && cardInfo.number)){
      props.submit(data);
      props.handleNext();
    }else{
      setNotice(
        <Alert severity="info"> Please fill out information ! </Alert>);
    }
  }

  const back = ()=>{
    props.handleBack();
  }

  const changeSelection = e =>{
    if(e.target.value === 'receive'){
      setSelection('receive');
      setInputProps({disabled: true});
    }else{
      setSelection('card');
      setInputProps({disabled: false})
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <RadioGroup aria-label="quiz" name="quiz" value={selection} onChange={e => changeSelection(e)}>
          <FormControlLabel value="receive" control={<Radio />} label="Pay when receiving"/>
          <FormControlLabel value="card" control={<Radio />} label="Pay by card" />
          <TextField
            required
            label="Card type"
            fullWidth
            autoComplete="card type"
            inputProps={inputProps}
            value={cardInfo.type}
            onChange={e => setCardInfo({
              ...cardInfo, 
              type: e.target.value})}
          />
          <TextField
            required
            label="Card holder"
            fullWidth
            autoComplete="card holder"
            inputProps={inputProps}
            value={cardInfo.holder}
            onChange={e => setCardInfo({
              ...cardInfo, 
              holder: e.target.value})}
          />
          <TextField
            required
            label="Card number"
            fullWidth
            autoComplete="card number"
            inputProps={inputProps}
            value={cardInfo.number}
            onChange={e => setCardInfo({
              ...cardInfo, 
              number: e.target.value})}
          />
      </RadioGroup>
      {notice}
      <div className={classes.buttons}>
        <Button onClick={back} className={classes.button}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={next}
          className={classes.button}
        >
          Next
        </Button>
      </div>
    </React.Fragment>
  );
}

export default PaymentForm;