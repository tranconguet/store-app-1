import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as Ultility from '../../utility/utility';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [isSuccess, setIsSuccess] = useState(false);
  const [notice, setNotice] = useState(null);
  const [info, setInfo] = useState({
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    cart: [],
    orders: []
  })
  const checkSignUp = async e =>{
    e.preventDefault();
    if(info.userName.length < 6){
      return setNotice(<Alert severity="error">User Name must be at least 6 letters</Alert>)
    }
    if(Ultility.isEmailValid(info.email)){
      return setNotice(<Alert severity="error">Email is invalid !</Alert>)
    }
    console.log(info);
    await Ultility.addUser(info)
    .then(response => {
      console.log(response)
      if(response.status === 200){
        return setIsSuccess(true);
      }
      if(response.status === 201){
        return setNotice(<Alert severity="error">User Name already exists!</Alert>)
      }
      if(response.status === 202){
        return setNotice(<Alert severity="error">Email already exists!</Alert>)
      }
      if(response.status === 203){
        return setNotice(<Alert severity="error">Something wrong!</Alert>)
      }
    })
    
  }
  const content = isSuccess ? (<Alert severity="success">Sign Up Successfully !</Alert>):(
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} onSubmit={e=>checkSignUp(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              type="text"
              id="userName"
              label="User Name"
              name="userName"
              onChange={e => {
                const value = e.target.value;
                setInfo(prevState => ({
                  ...prevState,
                  userName: value
              }))}}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              onChange={e => {
                const value = e.target.value;
                setInfo(prevState => ({
                  ...prevState,
                  firstName: value
              }))}}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              onChange={e => {
                const value = e.target.value;
                setInfo(prevState => ({
                  ...prevState,
                  lastName: value
              }))}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={e => {
                const value = e.target.value;
                setInfo(prevState => ({
                  ...prevState,
                  email: value
              }))}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => {
                const value = e.target.value;
                setInfo(prevState => ({
                  ...prevState,
                  password: value
              }))}}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
          <Grid item xs={12}>{notice}</Grid>
          
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  )
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
        {content}
    </Container>
  );
}
