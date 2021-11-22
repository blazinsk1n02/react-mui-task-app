import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';

export default function Login() {
  return (
    <div className="login-container">
      <Card variant="outlined">
        <CardContent>
          <h1>Login</h1>
          <div>
            <TextField
              error
              fullWidth
              id="standard-error"
              label="Error"
              defaultValue=""
              placeholder="Enter your email"
              variant="standard"
              margin="normal"
            />
            <TextField
              error
              fullWidth
              id="standard-error-helper-text"
              label="Error"
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
            <Button variant="contained" size="large">
              <LoginIcon />
              Login
            </Button>
            <Button size="small">Sign up</Button>
          </div>
        </CardActions>
      </Card>
    </div>
  )
}