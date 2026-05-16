import React from 'react';
import {
    Box,
    Button,
    Container,
    Typography,
    Paper,
    AppBar,
    Toolbar,
    IconButton,
    Stack,
    Divider,
    Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import MapPreview from '../components/maps/MapPreview';

const Landing: React.FC = () => {
    const navigate = useNavigate();

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Services', path: '/services' },
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/contact' }
    ];

    const features = [
        {
            title: 'Fast Reporting',
            desc: 'Submit complaints with photos and location in seconds.',
            icon: <SpeedIcon sx={{ fontSize: 40 }} />,
            color: '#3b5b3aff'
        },
        {
            title: 'Transparent Tracking',
            desc: 'Real-time status updates and department assignment tracking.',
            icon: <TrackChangesIcon sx={{ fontSize: 40 }} />,
            color: '#354838ff'
        },
        {
            title: 'Secure & Verified',
            desc: 'Verified citizen accounts ensure authentic communication.',
            icon: <SecurityIcon sx={{ fontSize: 40 }} />,
            color: '#2F3E22'
        }
    ];

    const steps = [
        { title: 'Report', desc: 'Identify a civic issue and submit it via our portal.' },
        { title: 'Verify', desc: 'Our team verifies and assigns it to the relevant department.' },
        { title: 'Resolve', desc: 'Field workers fix the issue and update the status.' },
        { title: 'Track', desc: 'Monitor the outcome and provide feedback on completion.' }
    ];

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAF7', display: 'flex', flexDirection: 'column' }}>
            {/* Glassmorphism Navbar */}
            <AppBar
                position="sticky"
                sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, md: 0 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
                            <ApartmentIcon sx={{ color: '#2e7d32', fontSize: 32, mr: 1 }} />
                            <Typography variant="h6" fontWeight={800} color="#2e7d32" sx={{ letterSpacing: -0.5 }}>
                                CivicConnect
                            </Typography>
                        </Box>

                        <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.label}
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        color: '#444',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        '&:hover': { color: '#2e7d32', bgcolor: 'transparent' }
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                            <Button
                                variant="contained"
                                onClick={() => navigate('/login')}
                                sx={{
                                    ml: 2,
                                    bgcolor: '#2e7d32',
                                    borderRadius: 2,
                                    px: 3,
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    '&:hover': { bgcolor: '#1b5e20' }
                                }}
                            >
                                Get Started
                            </Button>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Hero Section */}
            <Box
                sx={{
                    bgcolor: '#033927ff',
                    color: 'white',
                    pt: { xs: 8, md: 12 },
                    pb: { xs: 10, md: 15 },
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Decorative Elements */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: -100,
                        right: -100,
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(59, 91, 58, 0.4) 0%, transparent 70%)',
                        zIndex: 0
                    }}
                />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid container spacing={6} alignItems="center">
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '2.8rem', md: '4rem' },
                                    fontWeight: 800,
                                    lineHeight: 1.1,
                                    mb: 3,
                                    letterSpacing: -1
                                }}
                            >
                                Empowering Citizens,<br />
                                <Box component="span" sx={{ color: '#4dae50' }}>Building Better Cities.</Box>
                            </Typography>
                            <Typography variant="h6" sx={{ opacity: 0.9, mb: 5, fontWeight: 400, maxWidth: 600, lineHeight: 1.6 }}>
                                A seamless platform for citizens to report civic issues, track real-time progress, and collaborate with municipal authorities for a smarter, cleaner city.
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={6}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => navigate('/login')}
                                    sx={{
                                        bgcolor: 'white',
                                        color: '#033927ff',
                                        px: 6,
                                        py: 2,
                                        borderRadius: 3,
                                        fontWeight: 800,
                                        fontSize: '1.1rem',
                                        textTransform: 'none',
                                        '&:hover': { bgcolor: '#ecececff', transform: 'translateY(-2px)' },
                                        transition: '0.3s'
                                    }}
                                >
                                    Log Issues Now
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() => navigate('/services')}
                                    sx={{
                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                        color: 'white',
                                        px: 6,
                                        py: 2,
                                        borderRadius: 3,
                                        fontWeight: 700,
                                        fontSize: '1.1rem',
                                        textTransform: 'none',
                                        '&:hover': { borderColor: 'white', bgcolor: 'rgba(255, 255, 255, 0.05)' },
                                        transition: '0.3s'
                                    }}
                                >
                                    View Services
                                </Button>
                            </Stack>

                            {/* subtle portals navigation */}
                            <Box sx={{ opacity: 0.7, display: 'flex', gap: 3 }}>
                                <Button
                                    variant="text"
                                    onClick={() => navigate('/staff-login')}
                                    sx={{ color: 'white', textTransform: 'none', fontWeight: 600, '&:hover': { opacity: 1, bgcolor: 'transparent', textDecoration: 'underline' } }}
                                >
                                    Staff Portal
                                </Button>
                                <Button
                                    variant="text"
                                    onClick={() => navigate('/admin-login')}
                                    sx={{ color: 'white', textTransform: 'none', fontWeight: 600, '&:hover': { opacity: 1, bgcolor: 'transparent', textDecoration: 'underline' } }}
                                >
                                    Admin Login
                                </Button>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Paper
                                sx={{
                                    p: 2,
                                    borderRadius: 4,
                                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(5px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                                }}
                            >
                                <MapPreview />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Feature Highlights */}
            <Container maxWidth="lg" sx={{ mt: -8, mb: 10, position: 'relative', zIndex: 2 }}>
                <Grid container spacing={3}>
                    {features.map((f, i) => (
                        <Grid size={{ xs: 12, md: 4 }} key={i}>
                            <Paper
                                sx={{
                                    p: 4,
                                    borderRadius: 4,
                                    bgcolor: i === 1 ? '#354838ff' : 'white',
                                    color: i === 1 ? 'white' : 'inherit',
                                    boxShadow: i === 1 ? 10 : 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    transition: '0.3s',
                                    '&:hover': { transform: 'translateY(-8px)', boxShadow: 12 }
                                }}
                            >
                                <Box sx={{ color: i === 1 ? 'white' : '#2e7d32' }}>{f.icon}</Box>
                                <Typography variant="h5" fontWeight={800}>{f.title}</Typography>
                                <Typography variant="body1" sx={{ opacity: 0.8 }}>{f.desc}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* How It Works Section */}
            <Box sx={{ py: 12, bgcolor: 'white' }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography variant="overline" color="#2e7d32" fontWeight={800} letterSpacing={2}>
                            PROCESS
                        </Typography>
                        <Typography variant="h3" fontWeight={800} mt={1} mb={2}>
                            How CivicConnect Works
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                            A simple, 4-step process to ensure your voice is heard and issues are resolved efficiently.
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {steps.map((step, i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Box
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: '50%',
                                            bgcolor: '#F0F7F0',
                                            color: '#2e7d32',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem',
                                            fontWeight: 800,
                                            mx: 'auto',
                                            mb: 3,
                                            border: '2px solid #2e7d32'
                                        }}
                                    >
                                        {i + 1}
                                    </Box>
                                    <Typography variant="h6" fontWeight={800} mb={1}>
                                        {step.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {step.desc}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box sx={{ py: 10, bgcolor: '#033927ff', color: 'white', textAlign: 'center' }}>
                <Container maxWidth="sm">
                    <Typography variant="h4" fontWeight={800} mb={3}>
                        Ready to make a difference?
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8, mb: 4 }}>
                        Join thousands of citizens who are actively participating in making our city a better place to live.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/register')}
                        sx={{
                            bgcolor: '#4dae50',
                            color: 'white',
                            px: 8,
                            py: 2,
                            borderRadius: 3,
                            fontWeight: 800,
                            '&:hover': { bgcolor: '#388e3c' }
                        }}
                    >
                        Create Citizen Account
                    </Button>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ py: 8, bgcolor: 'white', borderTop: '1px solid #eee' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} justifyContent="space-between">
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <ApartmentIcon sx={{ color: '#2e7d32', fontSize: 28, mr: 1 }} />
                                <Typography variant="h6" fontWeight={800} color="#2e7d32">
                                    CivicConnect
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
                                A modern civic engagement platform dedicated to transparency, accountability, and efficient municipal service delivery.
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 6, md: 2 }}>
                            <Typography variant="subtitle1" fontWeight={700} mb={2}>Platform</Typography>
                            <Stack spacing={1}>
                                {navItems.map(item => (
                                    <Typography
                                        key={item.label}
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ cursor: 'pointer', '&:hover': { color: '#2e7d32' } }}
                                        onClick={() => navigate(item.path)}
                                    >
                                        {item.label}
                                    </Typography>
                                ))}
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 6, md: 2 }}>
                            <Typography variant="subtitle1" fontWeight={700} mb={2}>Portal</Typography>
                            <Stack spacing={1}>
                                <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: '#2e7d32' } }} onClick={() => navigate('/login')}>Citizen Login</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: '#2e7d32' } }} onClick={() => navigate('/staff-login')}>Staff Login</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: '#2e7d32' } }} onClick={() => navigate('/admin-login')}>Admin Portal</Typography>
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Typography variant="subtitle1" fontWeight={700} mb={2}>Stay Connected</Typography>
                            <Typography variant="body2" color="text.secondary" mb={2}>
                                Sign up for our newsletter to receive updates on city improvements.
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                <Paper sx={{ flex: 1, p: '2px 12px', display: 'flex', alignItems: 'center', border: '1px solid #ddd', boxShadow: 'none' }}>
                                    <Typography variant="body2" color="text.disabled">email@example.com</Typography>
                                </Paper>
                                <Button variant="contained" size="small" sx={{ bgcolor: '#2e7d32', textTransform: 'none' }}>Join</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 4 }} />
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                        © {new Date().getFullYear()} CivicConnect Municipal Platform. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Landing;