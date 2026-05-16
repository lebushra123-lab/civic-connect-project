import React from 'react';
import { Box, Typography, Container, Paper, Grid } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';

const About: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAF7', py: 8 }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <ApartmentIcon sx={{ color: '#2e7d32', fontSize: 60, mb: 2 }} />
                    <Typography variant="h3" fontWeight={800} color="#2d3436" mb={2}>
                        About CivicConnect
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                        Empowering citizens and municipal authorities to collaborate on building better cities through transparency and technology.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper sx={{ p: 4, height: '100%', borderRadius: 4 }}>
                            <Typography variant="h5" fontWeight={700} color="#2e7d32" mb={2}>
                                Our Mission
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                CivicConnect was born out of a simple idea: that every citizen deserves a direct and transparent line of communication with their local government.
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                We aim to bridge the gap between reporting an issue and seeing it resolved, providing real-time tracking and accountability for every complaint filed.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper sx={{ p: 4, height: '100%', borderRadius: 4 }}>
                            <Typography variant="h5" fontWeight={700} color="#2e7d32" mb={2}>
                                Why Choose Us?
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                Our platform leverages modern technology to ensure that municipal issues are routed to the right departments instantly.
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                From road repairs to waste management, we provide a unified dashboard for transparency, efficiency, and civic engagement.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default About;
