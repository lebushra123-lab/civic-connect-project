import React from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

const ADMIN_CREDENTIALS = {
    email: 'admin@civicconnect.com',
    password: 'admin123'
};

const AdminLogin: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { login } = useAuthStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            login({
                id: 'admin-1',
                name: 'Administrator',
                email: ADMIN_CREDENTIALS.email,
                role: 'admin'
            });
            navigate('/admin/dashboard');
        } else {
            alert('Invalid admin credentials!');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'linear-gradient(160deg, #0b3a2f 0%, #14543b 100%)',
                backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.03) 0%, transparent 60%),
                                  radial-gradient(circle at 80% 70%, rgba(255,255,255,0.03) 0%, transparent 60%)`,
                p: 3
            }}
        >
            <Paper
                sx={{
                    p: 6,
                    borderRadius: 5,
                    maxWidth: 420,
                    width: '100%',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.35)',
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(12px)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight={800}
                    sx={{ mb: 2, color: '#1b5e20', textAlign: 'center' }}
                >
                    Admin Login
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4, textAlign: 'center' }}
                >
                    Enter your admin credentials to access the portal.
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                >
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        variant="filled"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sx={{
                            background: 'rgba(255,255,255,0.95)',
                            borderRadius: 2,
                            '& .MuiInputBase-root': { boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.08)' }
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        variant="filled"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={{
                            background: 'rgba(255,255,255,0.95)',
                            borderRadius: 2,
                            '& .MuiInputBase-root': { boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.08)' }
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                            py: 1.8,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #34c759 0%, #1b5e20 100%)',
                            fontWeight: 700,
                            fontSize: '1rem',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
                            }
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default AdminLogin;