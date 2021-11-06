import React, { useState } from 'react';
import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import login from '../../../images/login.png'
import useAuth from '../../../hooks/UseAuth';


const Register = () => {

  const [loginData, setLoginData] = useState({});


  const { user, registerUser, isLoading, authError } = useAuth();

  const handleOnChange = e => {
    const field = e.target.name;
    const value = e.target.value;
    // console.log(field, value);
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    // console.log(field, value, newLoginData);
    setLoginData(newLoginData)
  }

  const handleLoginSubmit = e => {
    if (loginData.password !== loginData.password2) {
      alert('Your password did not match')
      return;
    }

    registerUser(loginData.email, loginData.password)
    alert('hello')
    e.preventDefault();
  }


  return (
    <Container>
      <Grid container spacing={2}>

        <Grid item sx={{ mt: 8 }} xs={12} md={6}>
          <Typography variant="body1" gutterBottom>
            Register
          </Typography>
          {!isLoading && <form onSubmit={handleLoginSubmit}>
            <TextField
              sx={{ width: '75%', m: 1 }}
              id="standard-basic"
              label="Your Email"
              name="email"
              type="email"
              onChange={handleOnChange}
              variant="standard" />
            <TextField
              sx={{ width: '75%', m: 1 }}
              id="standard-basic"
              label="Your Password"
              type="password"
              name="password"
              onChange={handleOnChange}
              variant="standard" />
            <TextField
              sx={{ width: '75%', m: 1 }}
              id="standard-basic"
              label="ReType Your Password"
              type="password"
              name="password2"
              onChange={handleOnChange}
              variant="standard" />

            <Button sx={{ width: '75%', m: 1 }} type="submit" variant="contained">Register</Button>

            <NavLink
              style={{ textDecoration: 'none' }}
              to="/login">
              <Button variant="text">Already Registered? Please Login</Button>
            </NavLink>

          </form>}
          {isLoading && <CircularProgress />}

          {user?.email && <Alert severity="success">User Created Successfully</Alert>}

          {authError &&
            <Alert severity="serror">{authError}</Alert>}

        </Grid>

        <Grid item xs={12} md={6}>
          <img style={{ width: '100%' }} src={login} alt="" />
        </Grid>

      </Grid>
    </Container>
  );
};

export default Register;