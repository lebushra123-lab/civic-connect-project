import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAF7', py: 8 }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="h3" fontWeight={800} color="#2d3436" mb={2}>
                        Contact Us
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                        Have a question or feedback? We'd love to hear from you.
                    </Typography>
                </Box>

                {/* Contact Card */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 4,
                        justifyContent: 'center'
                    }}
                >
                    <Paper
                        sx={{
                            p: 6,
                            borderRadius: 4,
                            bgcolor: 'white',
                            flex: 1,
                            maxWidth: 500,
                            mx: 'auto',
                            boxShadow: 4,
                            transition: '0.3s',
                            '&:hover': { boxShadow: 6, transform: 'translateY(-3px)' }
                        }}
                    >
                        <Typography variant="h5" fontWeight={700} mb={4}>
                            Get in Touch
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <MailOutlineIcon sx={{ color: '#2e7d32', mr: 2 }} />
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Email
                                </Typography>
                                <Typography variant="body1">support@civicconnect.com</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <PhoneIcon sx={{ color: '#2e7d32', mr: 2 }} />
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Phone
                                </Typography>
                                <Typography variant="body1">+1 (555) 123-4567</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOnIcon sx={{ color: '#2e7d32', mr: 2 }} />
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Office
                                </Typography>
                                <Typography variant="body1">
                                    123 Civic Plaza, Smart City, SC 12345
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
};

export default Contact;