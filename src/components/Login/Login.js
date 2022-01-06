import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import Collapse from '@mui/material/Collapse';
import { useSnackbar } from 'notistack';

import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { supabase } from '../../lib/supabaseClient'
import styles from './Login.module.css'

import { userAtom } from '../../atoms/user'
import { useRecoilState } from 'recoil';

export default function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [user, setUser] = useRecoilState(userAtom);

  const customSnackbar = (msg) => {
		enqueueSnackbar(msg, {
			anchorOrigin: {
				vertical: 'top',
				horizontal: 'center',
			},
			variant: 'error',
			persist: false,
			TransitionComponent: Collapse,
		});
	}

  const onLogin = async (e) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const { error, data } = await supabase.auth.signIn({
        email: email,
        password: password
      })

      if (error) throw error;

      const userData = data.user;
      setUser(userData)

      history.push("/");
    }
    catch (error) {
      customSnackbar(error.message);
    }
  }

  return (
    <div className={styles.login}>
      <form onSubmit={onLogin}>
        <Card variant="outlined">
          <CardContent>
            <h1>Login</h1>
            <div>
              <TextField
                fullWidth
                name="email"
                label="Email"
                variant="standard"
                margin="normal"
              />
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                helperText=""
                variant="standard"
                margin="normal"
              />
            </div>
          </CardContent>
          <CardActions className={styles.cardActions}>
            <div className="btn-container">
              <Button type="submit" variant="contained" size="large">
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Button>
              <Link
                to="/register"
                className={styles.registrationLink}>
                Register
              </Link>
            </div>
          </CardActions>
        </Card>
      </form>
    </div>
  )
}