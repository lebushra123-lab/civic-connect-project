import React from 'react';
import { AppBar, Toolbar, Typography, Box, TextField, IconButton, Avatar, Button } from '@mui/material';
import { useAuthStore } from '../../store/auth';
import { useNavigate } from 'react-router-dom';

const HeaderBar: React.FC = () => {
	const { user, logout } = useAuthStore();
	const navigate = useNavigate();
	const [q, setQ] = React.useState('');
	return (
		<AppBar position="sticky" elevation={0} sx={{ background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)', color: '#fff' }}>
			<Toolbar sx={{ gap: 2 }}>
				<Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>Civic Complaints</Typography>
				<TextField size="small" placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} sx={{ minWidth: 240, bgcolor: 'white', borderRadius: 1, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }} />
				<Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' }}>{user?.name?.[0] || 'U'}</Avatar>
				
			</Toolbar>
		</AppBar>
	);
};

export default HeaderBar;
