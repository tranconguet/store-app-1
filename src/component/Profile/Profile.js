import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as Utility from '../../utility/utility';
import Alert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const checkData = data =>{
  return true
}


const Profile = (props) => {
  const [firstName, setFirstName] = useState(props.data.firstName);
  const [lastName, setLastName] = useState(props.data.lastName); 
  const [email, setEmail] = useState(props.data.email);
  const [notice, setNotice] = useState(null);

  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email
  }
  useEffect(()=>{
    setFirstName(props.data.firstName);
    setLastName(props.data.lastName);
    setEmail(props.data.email)
  },[props.data]);

  
  const update = async e => {
    if(checkData(data)){
      console.log(data);
      const oldData = {...props.data}
      const newData = {
        ...oldData,
        ...data
      }
      console.log(newData);
      await Utility.updateUserData(newData);
      setNotice((<Alert severity="success"> Update Successfully ! </Alert>));
    }else{
      setNotice((<Alert severity="error"> Check your UserName or Password ! </Alert>));
    }
  }
  const classes = useStyles();
  return (
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
              <AssignmentIndRoundedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <form className={classes.form} >
              <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                  <TextField
                  value={firstName}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={ e => setFirstName(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                  value={lastName}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={ e => setLastName(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                  value={email}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={e => setEmail(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12}>
                  <Link href="/change-password" variant="body1" >
                    Change password
                  </Link>
                  {notice}
              </Grid>

              <Grid item xs={12}>
                  <Button fullWidth variant="contained" color="primary" onClick={update}>
                    Update Profile
                  </Button>
              </Grid>
              </Grid>
          </form>
        </div>
      </Container>
    
  );
}

export default Profile;

