import {Box, Button, Container, Grid, Link, TextField, Typography} from '@mui/material';
import {useLoginMutation} from 'api/api';
import {DialogContext, DialogContextInterface} from 'app/context/DialogContext';

import {saveUser} from 'features/common/userSlice';

import React, {useContext, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {theme} from 'theme';

const Login = () => {
  const [submitLogin, loginResult] = useLoginMutation();
  const {infoDialog} = useContext<any>(DialogContext);

  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (loginResult.isSuccess) {
      console.log('Login being called');
      dispatch(saveUser({username}));
      localStorage.setItem('user', JSON.stringify({username}));
      navigate('/');
    } else if (loginResult.isError) {
      infoDialog({
        title: 'Invalid credentials.',
        text: 'Please retry',
      });
    }
  }, [loginResult]);

  const usernameChange = (e : React.ChangeEvent<HTMLInputElement> ) => {
    const value = e.target.value;
    setUsername(value);
  };

  const passwordChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const login = () => {
    submitLogin({username, password});
  };

  return (
    <React.Fragment>
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Grid container
          sx={{
            background: 'white',
            borderRadius: 8,
            [theme.breakpoints.up('md')]: {
              paddingY: 5,
            },
            [theme.breakpoints.down('md')]: {
              paddingY: 3,
            },
          }}
        >

          <Grid item xs={12} sx={{
            paddingX: 5,
            position: 'relative',
          }}>
            <Typography variant="h3">
              Login
            </Typography>
            <TextField
              id="standard-basic"
              label="Username"
              variant="standard"
              onChange={usernameChange}
              sx={{width: '100%'}}
            />
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              type="password"
              onChange={passwordChange}
              sx={{width: '100%'}}
            />
            <br/>
            <br/>
            <Button onClick={login} variant="contained" fullWidth> Login </Button>
            <br/>
            <br/> 
            <Typography component="span" variant="body1">
              Do not have an account? &nbsp;
              <Link href="#" onClick={
                ()=> {
                  navigate('/register');
                }
              }>Register here </Link>
            </Typography>

          </Grid>
        </Grid>


      </Container>
    </React.Fragment>
  );
};

export default Login;
