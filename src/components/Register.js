import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

export default function Register() {
	return (
		<Container sx={{ py: 5 }} maxWidth="sm">
			<form>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<TextField
							id="standard-basic"
							label="First name"
							variant="standard"
							fullWidth />
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id="standard-basic"
							label="Last name"
							variant="standard"
							fullWidth />
					</Grid>
					<Grid item xs={12}>
						<TextField
							id=""
							label="Email"
							variant="standard"
							fullWidth />
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth >
							<InputLabel id="gender">Gender</InputLabel>
							<Select
								labelId="gender"
								id="gender"
								label="Gender"
							>
								<MenuItem>Male</MenuItem>
								<MenuItem>Female</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							label="I agree with the Terms and Conditions"
							control={
								<Checkbox size="small" />
							}
						/>
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