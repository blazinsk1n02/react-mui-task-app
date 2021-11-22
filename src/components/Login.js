import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';

import { useHistory } from "react-router-dom";
import * as authService from '../services/authService'

export default function Login(props) {
  const history = useHistory();

  const onLogin = (e) => {
    e.preventDefault();
    console.log('asdads')

    let formData = new FormData(e.currentTarget);

    let email = formData.get("userEmail")

    authService.login(email)

    history.push("/");
  }

  return (
    <div className="login-container">
      <form id="login-form" onSubmit={onLogin}>
        <Card variant="outlined">
          <CardContent>
            <h1>Login</h1>
            <div>
              <TextField
                error
                fullWidth
                id="userEmail"
                name="email"
                label="User email"
                defaultValue=""
                placeholder="Enter your email"
                variant="standard"
                margin="normal"
              />
              <TextField
                error
                fullWidth
                id="userPassword"
                name="password"
                label="User password"
                defaultValue=""
                placeholder="Enter your password"
                helperText="Incorrect entry."
                variant="standard"
                margin="normal"
              />
            </div>
          </CardContent>
          <CardActions>
            <div className="btn-container">
              <Button type="submit" variant="contained" size="large">
                <LoginIcon />
                Login
              </Button>
              <Button size="small">Sign up</Button>
            </div>
          </CardActions>
        </Card>
      </form>
    </div>
  )
}