import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import WaterIcon from '@mui/icons-material/Water'; // For Urban Drainage

const services = [
    {
        title: 'Roads Maintenance',
        icon: <ConstructionIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
        description: 'Reporting and tracking of potholes, broken pavements, and general road repairs.'
    },
    {
        title: 'Waste Management',
        icon: <DeleteSweepIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
        description: 'Garbage collection requests and reporting of overflowing bins.'
    },
    {
        title: 'Urban Drainage',
        icon: <WaterIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
        description: 'Report and track issues related to storm drains, blocked gutters, and urban water flow.'
    }
];

const Services: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAF7', py: 8 }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="h3" fontWeight={800} color="#2d3436" mb={2}>
                        Our Services
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                        CivicConnect simplifies the reporting and tracking of various municipal services to ensure your city stays smart and clean.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {services.map((service, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <Paper
                                sx={{
                                    p: 4,
                                    height: '100%',
                                    borderRadius: 4,
                                    textAlign: 'center',
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 }
                                }}
                            >
                                <Box sx={{ mb: 2 }}>{service.icon}</Box>
                                <Typography variant="h6" fontWeight={700} mb={1}>
                                    {service.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {service.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Services;