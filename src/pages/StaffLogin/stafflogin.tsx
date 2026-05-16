import React from 'react';
import { Box, Button, Typography, TextField, Paper, Checkbox, FormControlLabel } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore, Role } from '../../store/auth';
import backendApi from '../../services/backendApi';

/* 🔒 STAFF ROLES ONLY — UI CHANGE */
const roles: { key: Role; label: string }[] = [
    { key: 'head', label: 'Dept. Head' },
    { key: 'supervisor', label: 'Supervisor' },
    { key: 'worker', label: 'Field Worker' }
];

const Login: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation() as any;
    const { login } = useAuthStore();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState<Role>('head'); // default staff role

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

            const redirect =
                user.role === 'head'
                    ? '/department'
                    : user.role === 'supervisor'
                    ? '/supervisor'
                    : '/worker';

            navigate((location.state?.from?.pathname as string) || redirect, { replace: true });
        } catch (err: any) {
            alert('Login failed: ' + (err.message || err));
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAF7', position: 'relative' }}>
            {/* Top Bar */}
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, p: 3, display: 'flex', alignItems: 'center' }}>
                <ApartmentIcon sx={{ color: '#2e7d32', fontSize: 34, mr: 1 }} />
                <Typography fontWeight={800} sx={{ color: '#2e7d32' }}>CivicConnect — Staff Portal</Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '55fr 45fr' }, minHeight: '100vh' }}>
                {/* Left */}
                <Box sx={{ p: { xs: 4, md: 8 }, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h3" fontWeight={800}>
                        Authorized Staff Login
                    </Typography>
                </Box>

                {/* Right */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
                    <Paper sx={{ p: 4, borderRadius: 4, width: '100%', maxWidth: 460 }}>
                        <Typography variant="h5" fontWeight={700} mb={3}>
                            Select Role
                        </Typography>

                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
                            {roles.map((r) => {
                                const selected = role === r.key;
                                return (
                                    <Paper
                                        key={r.key}
                                        onClick={() => setRole(r.key)}
                                        sx={{
                                            p: 2,
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            border: '2px solid',
                                            borderColor: selected ? '#2e7d32' : '#eee',
                                            color: selected ? '#2e7d32' : 'text.secondary'
                                        }}
                                    >
                                        {r.key === 'head' && <CorporateFareIcon />}
                                        {r.key === 'supervisor' && <SupervisorAccountIcon />}
                                        {r.key === 'worker' && <EngineeringIcon />}
                                        <Typography fontWeight={600}>{r.label}</Typography>
                                    </Paper>
                                );
                            })}
                        </Box>

                        <Box sx={{ mb: 3, p: 2, bgcolor: '#fff4e5', borderRadius: 2 }}>
                            <Typography variant="body2" textAlign="center" color="#e65100">
                                Staff accounts are created by the Admin.
                            </Typography>
                        </Box>

                        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Email"
                                variant="filled"
                                required
                                InputProps={{ disableUnderline: true }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                variant="filled"
                                required
                                InputProps={{ disableUnderline: true }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <FormControlLabel control={<Checkbox />} label="Remember me" />

                            <Button type="submit" variant="contained" size="large" sx={{ py: 1.5, fontWeight: 700 }}>
                                Login
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
