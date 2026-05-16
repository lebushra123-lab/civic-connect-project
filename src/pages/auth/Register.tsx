import React from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import backendApi from '../../services/backendApi';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await backendApi.register({ name, email, password });
            navigate('/login');
        } catch (err: any) {
            alert('Register failed: ' + (err.message || err));
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAF7', position: 'relative', overflow: 'hidden' }}>
            {/* Top Navigation Bar */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                p: { xs: 2, md: 4 },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 10
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ApartmentIcon sx={{ color: '#2e7d32', fontSize: 35, mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold" sx={{ color: '#2e7d32' }}>
                        CivicConnect
                    </Typography>
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
                    {['Home', 'Services', 'About', 'Contact'].map(item => (
                        <Button
                            key={item}
                            variant="text"
                            sx={{
                                color: 'text.secondary',
                                textTransform: 'none',
                                fontWeight: 500,
                                '&:hover': { color: 'var(--green-primary)', bgcolor: 'transparent' }
                            }}
                        >
                            {item}
                        </Button>
                    ))}
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '55fr 45fr' }, minHeight: '100vh' }}>
                {/* Left Panel */}
                <Box sx={{
                    p: { xs: 4, md: 8 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    pt: { xs: 12, md: 0 }
                }}>
                    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '2.5rem', md: '3.75rem' },
                                fontWeight: 800,
                                background: 'linear-gradient(90deg, #4dae50 0%, #1b5e20 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 3
                            }}
                        >
                            Join your city’s digital platform
                        </Typography>

                        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                            Register as a citizen to report, track, and resolve civic issues efficiently.
                        </Typography>
                    </Box>
                </Box>

                {/* Right Panel - Register Form */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, pt: 12 }}>
                    <Box sx={{ width: '100%', maxWidth: 480 }}>
                        <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
                            Citizen Registration
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 4 }}>
                            Create your account to get started.
                        </Typography>

                        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
                            {/* Citizen Badge */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    px: 3,
                                    py: 1,
                                    borderRadius: 3,
                                    bgcolor: 'rgba(46,125,50,0.08)',
                                    color: 'var(--green-primary)',
                                    fontWeight: 600
                                }}>
                                    <PersonOutlineIcon />
                                    Citizen Account
                                </Box>
                            </Box>

                            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                <TextField
                                    label="Full Name"
                                    fullWidth
                                    variant="filled"
                                    InputProps={{ disableUnderline: true }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />

                                <TextField
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    variant="filled"
                                    InputProps={{ disableUnderline: true }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <TextField
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    variant="filled"
                                    InputProps={{ disableUnderline: true }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    sx={{
                                        py: 1.8,
                                        borderRadius: 2,
                                        background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                                        fontWeight: 700,
                                        textTransform: 'none'
                                    }}
                                >
                                    Sign Up
                                </Button>

                                <Typography variant="body2" textAlign="center">
                                    Already registered?{' '}
                                    <Button
                                        onClick={() => navigate('/login')}
                                        sx={{ color: 'var(--green-primary)', fontWeight: 700, textTransform: 'none' }}
                                    >
                                        Login
                                    </Button>
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Register;
