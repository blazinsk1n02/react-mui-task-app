import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Register() {

	const register = async (e) => {
		e.preventDefault();

		const { firstName, lastName, email } = Object.fromEntries(new FormData(e.currentTarget));

		console.log(firstName, lastName, email)
	}

	return (
		<Container sx={{ py: 5 }} maxWidth="sm">
			<form onSubmit={register}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<TextField
							name='firstName'
							label="First name"
							variant="standard"
							fullWidth />
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							name='lastName'
							label="Last name"
							variant="standard"
							fullWidth />
					</Grid>
					<Grid item xs={12} sx={{ mb: 5 }}>
						<TextField
							name='email'
							label="Email"
							variant="standard"
							fullWidth />
					</Grid>

					<div className="btn-container">
						<Button type="submit" variant="contained" size="large">
							Register
						</Button>
					</div>
				</Grid>
			</form>
		</Container>
	)
}