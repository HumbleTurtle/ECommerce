import {Button, Container, Grid, Link, TextField, Typography} from '@mui/material';

import {useRegisterMutation} from 'api/api';
import {DialogContext} from 'app/context/DialogContext';

import React, {useContext, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {theme} from 'theme';



const Login = () => {
  const [submitRegister, registerResult] : ReturnType<typeof useRegisterMutation> = useRegisterMutation({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {infoDialog} = useContext<any>(DialogContext);

  const [messages, setMessages] = useState([] as any[]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');

  
  useEffect(() => {
    if (registerResult.isSuccess) {
      setMessages([]);

      infoDialog( {
        onAccept: () => {
          navigate('/login');
        },
        title: '¡Success!.',
        text: 'Register successful.',
      })
    } else if (registerResult.isError) {
      try {
        infoDialog({
          title: 'Error.',
          text:
            <Typography component='span' sx={{textAlign: 'left'}}>
              {
                registerResult.error.data.message.map(
                    (el:string, index:number)=><Typography key={index} variant='body2'>{el}</Typography>)
              }
            </Typography>,
        });

        console.log(registerResult);
        if (registerResult.error.data.message) {
          setMessages(registerResult.error.data.message);
        } else {
          setMessages(['An unexpected error has ocurred.']);
        }
      } catch (ex) {
        setMessages(['An unexpected error has ocurred.']);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerResult]);

  const usernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
  };

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const confirmationPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmationPassword(value);
  };

  const register = () => {
    submitRegister({username, password, confirmationPassword, email});
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
              Register
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
              label="Email"
              variant="standard"
              onChange={emailChange}
              sx={{width: '100%'}}
            />
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              type='password'
              onChange={passwordChange}
              sx={{width: '100%'}}
            />
            <TextField
              id="standard-basic"
              label="Repeat password"
              variant="standard"
              type='password'
              onChange={confirmationPasswordChange}
              sx={{width: '100%'}}
            />
            <br/>
            <br/>
            <Button onClick={register} variant="contained" fullWidth> Register </Button>

            <br/>
            <br/>
            <Typography component="span" variant="body1">
              Already have an account?&nbsp;
              <Link href="#" onClick={
                ()=> {
                  navigate('/login');
                }
              }>Login here </Link>
            </Typography>

          </Grid>
        </Grid>


      </Container>
    </React.Fragment>
  );
};

export default Login;
