import React, { useState, useCallback, useEffect } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Checkbox, FormControlLabel } from '@material-ui/core'
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.user.token);
  const student = useSelector(state => state.user.student);
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const paperStyle = { padding: 20, height: '70vh', width: 600, margin: "20px auto", marginTop: 50 }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0' }
  const handleSumit = useCallback(() => {
    if (email && password) {
      let data = { email: email, password: password }
      dispatch({
        type: "SIGNIN_REQUEST",
        payload: data
      })
    }

  }, [email, password, token]);
  useEffect(() => {
    if (token && localStorage.getItem('token')) {
      if (student === "STUDENT") {
        return navigate("/student/home");
      } else {
        return navigate("/home");
      }

    }
  }, [token])
  return (
    // <Grid>
    //   <Paper elevation={10} style={paperStyle}>
    //     <Grid align='center'>
    //       <Avatar style={avatarStyle}><LockIcon /></Avatar>
    //       <h2>Sign In</h2>
    //     </Grid>
    //     <TextField label='Username' placeholder='Enter username' fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />
    //     <TextField label='Password' placeholder='Enter password' type='password' fullWidth required value={password} onChange={(e) => setpassword(e.target.value)} />
    //     <FormControlLabel
    //       control={
    //         <Checkbox
    //           name="checkedB"
    //           color="primary"
    //         />
    //       }
    //       label="Remember me"
    //     />
    //     <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={handleSumit}>Sign in</Button>
    //     <Typography >
    //       <Link href="#" >
    //         Forgot password ?
    //       </Link>
    //     </Typography>
    //     <Typography > Do you have an account ?
    //       <Link to="/register" >
    //         Sign Up
    //       </Link>
    //     </Typography>
    //   </Paper>
    // </Grid>
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center' >
          <div className='logo_header' style={{ cursor: "pointer" }}>
            <img src='https://stylemixthemes.com/masterstudy/wp-content/themes/landing/assets/svg/logo.svg' alt='image' />
            <h2>Login yo your account</h2>
          </div>
        </Grid>
        <div className='edit_student_group' style={{ paddingLeft: "8%", paddingRight: "8%", paddingTop: "30px" }}>
          <TextField
            fullWidth
            type='email'
            variant="outlined" placeholder='Your email' required value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>
        <div className='edit_student_group' style={{ paddingLeft: "8%", paddingRight: "8%", paddingTop: "10px" }}>
          <TextField
            fullWidth
            placeholder='Password'
            type='password'
            variant="outlined" required value={password} onChange={(e) => setpassword(e.target.value)}
          />

        </div>
        <div className='remember_forgot_password' style={{ paddingLeft: "8%", paddingRight: "8%" }}>
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Typography >
            <Link href="#" >
              Forgot password ?
            </Link>
          </Typography>
        </div>
        <div style={{ paddingLeft: "8%", paddingRight: "8%", width: '100%' }} className="submit_login">
          <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={handleSumit}>Login</Button>
          {/* <Typography > Do you have an account ?
            <Link to="/register" >
              Sign Up
            </Link>
          </Typography> */}
        </div>

      </Paper>
    </Grid>
  )
}


export default Login