import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Checkbox, FormControlLabel } from '@material-ui/core'
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";
const Login = () => {

  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0' }
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockIcon /></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField label='Username' placeholder='Enter username' fullWidth required />
        <TextField label='Password' placeholder='Enter password' type='password' fullWidth required />
        <FormControlLabel
          control={
            <Checkbox
              name="checkedB"
              color="primary"
            />
          }
          label="Remember me"
        />
        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
        <Typography >
          <Link href="#" >
            Forgot password ?
          </Link>
        </Typography>
        <Typography > Do you have an account ?
          <Link to="/register" >
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  )
}


export default Login