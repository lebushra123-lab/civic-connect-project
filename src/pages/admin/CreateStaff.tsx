import React from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { Role } from '../../store/auth';
import backendApi from '../../services/backendApi';
import { useNavigate } from 'react-router-dom';

const staffRoles: { key: Role; label: string }[] = [
    { key: 'citizen', label: 'Citizen' },
    { key: 'head', label: 'Dept. Head' },
    { key: 'supervisor', label: 'Supervisor' },
    { key: 'worker', label: 'Field Worker' }
];

const CreateStaff: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState<Role>('head');
    const [department, setDepartment] = React.useState('');

    const departments = ['Roads Maintenance', 'Urban Drainage', 'Waste Management'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Frontend validation
        if (role !== 'citizen' && !department) {
            alert('Please select a department for this role.');
            return;
        }

        try {
            // Use createStaff for admin controls
            await backendApi.createStaff({
                name,
                email,
                password,
                role,
                department: role === 'citizen' ? undefined : department
            });
            alert(`Staff ${name} registered successfully!`);
            setName('');
            setEmail('');
            setPassword('');
            setRole('head');
            setDepartment('');
        } catch (err: any) {
            console.error(err);
            // Parse error message if it's a JSON string in err.message
            let msg = err.message || err;
            try {
                const parsed = JSON.parse(msg);
                if (parsed.error) msg = parsed.error;
            } catch (e) { /* ignore */ }
            alert('Registration failed: ' + msg);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAF7', p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper sx={{ p: 4, borderRadius: 4, width: '100%', maxWidth: 480 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <ApartmentIcon sx={{ fontSize: 40, color: '#2e7d32', mr: 1 }} />
                    <Typography variant="h5" fontWeight={700}>Admin: Create Staff</Typography>
                </Box>

                <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>Select Role</Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                    {staffRoles.map((r) => {
                        const isSelected = role === r.key;
                        return (
                            <Paper
                                key={r.key}
                                elevation={0}
                                onClick={() => setRole(r.key)}
                                sx={{
                                    p: 2,
                                    border: '2px solid',
                                    borderColor: isSelected ? 'var(--green-primary)' : '#eee',
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 1,
                                    bgcolor: isSelected ? 'rgba(85,107,47,0.04)' : 'transparent',
                                    color: isSelected ? 'var(--green-primary)' : 'text.secondary',
                                    flex: '1 0 40%',
                                    '&:hover': { borderColor: '#2e7d32' }
                                }}
                            >
                                {r.key}
                                <Typography fontWeight={600} variant="body2">{r.label}</Typography>
                            </Paper>
                        );
                    })}
                </Box>

                {role !== 'citizen' && (
                    <>
                        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>Select Department</Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 4, flexWrap: 'wrap' }}>
                            {departments.map((dept) => {
                                const isSelected = department === dept;
                                return (
                                    <Button
                                        key={dept}
                                        onClick={() => setDepartment(dept)}
                                        variant={isSelected ? "contained" : "outlined"}
                                        sx={{
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            bgcolor: isSelected ? '#2e7d32' : 'transparent',
                                            color: isSelected ? '#fff' : 'text.secondary',
                                            borderColor: isSelected ? '#2e7d32' : '#ddd',
                                            '&:hover': {
                                                bgcolor: isSelected ? '#1b5e20' : '#f5f5f5',
                                                borderColor: '#2e7d32'
                                            }
                                        }}
                                    >
                                        {dept}
                                    </Button>
                                );
                            })}
                        </Box>
                    </>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Full Name"
                        fullWidth
                        variant="filled"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        InputProps={{ disableUnderline: true, sx: { borderRadius: 2, bgcolor: '#f8f9fa' } }}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        variant="filled"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        InputProps={{ disableUnderline: true, sx: { borderRadius: 2, bgcolor: '#f8f9fa' } }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        variant="filled"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        InputProps={{ disableUnderline: true, sx: { borderRadius: 2, bgcolor: '#f8f9fa' } }}
                    />

                    <Button type="submit" variant="contained" sx={{ mt: 1, py: 1.5, fontWeight: 700 }}>
                        Create Staff
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default CreateStaff;
