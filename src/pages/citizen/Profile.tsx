import React from 'react';
import { Card, CardContent, TextField, Typography, Button, Box, Paper } from '@mui/material';

const Profile: React.FC = () => {
	const [name, setName] = React.useState('Demo User');
	const [phone, setPhone] = React.useState('');
	const [address, setAddress] = React.useState('');
	return (
		<Paper className="glass-card" sx={{ p: 3 }}>
			<Typography variant="h6" gutterBottom>Profile</Typography>
			<Box sx={{ display: 'grid', gap: 2 }}>
				<TextField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
				<TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
				<TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} multiline minRows={2} />
				<Button variant="contained">Save Changes</Button>
			</Box>
		</Paper>
	);
};

export default Profile;
