import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as Utility from '../../utility/utility';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const ChangePassword = (props) => {

  const [oldPassword, setOldPassword] = useState(props.data.password);
  const [password, setPassword] = useState(''); 
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');
  const [notice, setNotice] = useState(null);

  useEffect(()=>{
    setOldPassword(props.data.password);
  },[props.data])
  
  const check = (oldP, newP, newPA) =>{
    if(oldP === '' || newP === '' || newPA === ''){
        return 'empty'
    }
    if(oldP !== oldPassword){
        return 'incorrect password'
    }
    if(newP !== newPA){
        return 'type incorrect'
    }
    return 'ok'
  }
  console.log(password + ' ' + newPassword + ' ' + newPasswordAgain)
  const change = async e => {
    const status = check(password, newPassword, newPasswordAgain);
    if(status === 'empty'){
        setNotice(<Alert severity="error">Fill the blank</Alert>)
        return
    }
    if(status === 'incorrect password'){
        setNotice(<Alert severity="error"> Old Password is incorrect </Alert>)
        return
    }
    if(status === 'type incorrect'){
        setNotice(<Alert severity="error"> Type your new password incorrectly </Alert>)
        return
    }
    if(status === 'ok'){
        const newData = {
            ...props.data,
            password: newPassword
        }
        await Utility.updateUserData(newData);
        setOldPassword(newPassword);
        setNotice(<Alert severity="success"> Update password successfully ! </Alert>)
    }
  }
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        
        <form className={classes.form}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Current Password"
                type="password"
                onChange= {e => setPassword(e.target.value)}/>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="New Password"
                type="password"
                onChange= {e => setNewPassword(e.target.value)}/>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="New Password"
                type="password"
                onChange= {e => setNewPasswordAgain(e.target.value)}/>
            {notice}
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={change}>
            Update
            </Button>
        </form>
      </div>
    </Container>
  );
}

export default ChangePassword;

