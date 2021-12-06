import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import Collapse from '@mui/material/Collapse';

import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { supabase } from '../../lib/supabaseClient'
import styles from './Register.module.css'

export default function Register() {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const history = useHistory();

	const message = {
		pwNoMatch: "Passwords do not match!",
		wrongUserOrPw: "Wrong username or password!"
	};

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

	const register = async (e) => {
		e.preventDefault();

		const { email, password, confirmPassword } = Object.fromEntries(new FormData(e.currentTarget));

		if (password === confirmPassword) {
			try {
				const { error } = await supabase.auth.signUp({
					email: email,
					password: password
				})

				if (error) throw error;
				history.push("/login");
			}
			catch (error) {
				customSnackbar(error.message);
			}
		}
		customSnackbar(message.pwNoMatch);
	}

	return (
		<div className={styles.register}>
			<form onSubmit={register}>
				<Card variant="outlined">
					<CardContent>
						<h1>Register</h1>
						<div>
							<TextField
								name='email'
								label="Email"
								variant="standard"
								fullWidth
								margin="normal"
							/>

							<TextField
								name='password'
								label="Password"
								variant="standard"
								fullWidth
								margin="normal"
							/>

							<TextField
								name='confirmPassword'
								label="Confirm password"
								variant="standard"
								fullWidth
								margin="normal"
							/>
						</div>
					</CardContent>

					<CardActions className={styles.cardActions}>
						<div className="btn-container">
							<Button
								type="submit"
								variant="contained"
								size="large"
								sx={{ mb: 2 }}
							>
								Register
							</Button>
							<div>
								<span>Already have an account?</span>
								<Link
									to="/login"
									className={styles.loginLink}
								>
									Login
								</Link>
							</div>
						</div>
					</CardActions>
				</Card>
			</form>
		</div>
	)
}