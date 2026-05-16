import React from 'react';
import { Box, Button, Typography, TextField, Paper, Checkbox, FormControlLabel } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import backendApi from '../../services/backendApi';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation() as any;
    const { login } = useAuthStore();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // 🔒 Role is fixed to citizen
    const role = 'citizen';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await backendApi.login({ email, password, role });
            const user = data.user;
            const token = data.token;

            backendApi.setToken(token);
            login({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department
            });

            navigate((location.state?.from?.pathname as string) || '/citizen', { replace: true });
        } catch (err: any) {
            alert('Login failed: ' + (err.message || err));
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
                    {[
                        { label: 'Home', path: '/' },
                        { label: 'Services', path: '/services' },
                        { label: 'About', path: '/about' },
                        { label: 'Contact', path: '/contact' }
                    ].map((item) => (
                        <Button
                            key={item.label}
                            variant="text"
                            onClick={() => navigate(item.path)}
                            sx={{
                                color: 'text.secondary',
                                textTransform: 'none',
                                fontWeight: 500,
                                '&:hover': { color: '#2e7d32', bgcolor: 'transparent' }
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Box>
            </Box>

            {/* Main Layout */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '55fr 45fr' }, minHeight: '100vh' }}>
                {/* Left Panel */}
                <Box sx={{
                    p: { xs: 4, md: 8 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    pt: { xs: 12, md: 0 }
                }}>
                    <Box sx={{ maxWidth: '600px', mx: 'auto', width: '100%' }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '2.5rem', md: '3.75rem' },
                                fontWeight: 800,
                                background: 'linear-gradient(90deg, #4dae50 0%, #1b5e20 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 3,
                                lineHeight: 1.1
                            }}
                        >
                            Raise Civic Issues with Confidence
                        </Typography>

                        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 6, lineHeight: 1.6 }}>
                            Report, track, and stay updated on municipal issues in your city — transparently and efficiently.
                        </Typography>
                    </Box>
                </Box>

                {/* Right Panel – Citizen Login */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, pt: 12 }}>
                    <Box sx={{ width: '100%', maxWidth: 480 }}>
                        <Typography variant="h4" fontWeight={800} sx={{ mb: 1, color: '#333' }}>
                            Citizen Login
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            Access your civic dashboard
                        </Typography>

                        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                <PersonOutlineIcon sx={{ fontSize: 40, color: 'var(--green-primary)' }} />
                            </Box>

                            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                <TextField
                                    label="Email"
                                    fullWidth
                                    variant="filled"
                                    InputProps={{ disableUnderline: true, sx: { borderRadius: 2, bgcolor: '#f8f9fa' } }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    variant="filled"
                                    InputProps={{ disableUnderline: true, sx: { borderRadius: 2, bgcolor: '#f8f9fa' } }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <FormControlLabel
                                        control={<Checkbox sx={{ '&.Mui-checked': { color: 'var(--green-primary)' } }} />}
                                        label="Remember me"
                                    />
                                    <Button variant="text" sx={{ color: 'var(--green-primary)', textTransform: 'none' }}>
                                        Forgot password?
                                    </Button>
                                </Box>

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
                                    Login
                                </Button>

                                <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
                                    New here?{' '}
                                    <Button
                                        onClick={() => navigate('/register')}
                                        sx={{ color: 'var(--green-primary)', fontWeight: 700, textTransform: 'none' }}
                                    >
                                        Create a citizen account
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

export default Login;
