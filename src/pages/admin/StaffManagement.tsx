import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    CircularProgress,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Alert,
    Snackbar
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import backendApi from '../../services/backendApi';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
}

const ROLES = [
    { value: 'head', label: 'Department Head' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'worker', label: 'Field Worker' }
];

const DEPARTMENTS = [
    'Roads Maintenance',
    'Urban Drainage',
    'Waste Management',
    'Electricity & Lighting',
    'Water Supply',
    'General'
];

const StaffManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Edit State
    const [editOpen, setEditOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [editData, setEditData] = useState({
        name: '',
        email: '',
        role: '',
        department: '',
        password: ''
    });

    // Delete State
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    // Snackbar State
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

    const fetchUsers = async () => {
        setLoading(true);
        try {
            // Fetch staff roles only
            const headRes = await backendApi.listUsers({ role: 'head' });
            const supervisorRes = await backendApi.listUsers({ role: 'supervisor' });
            const workerRes = await backendApi.listUsers({ role: 'worker' });

            setUsers([...headRes, ...supervisorRes, ...workerRes]);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEditClick = (user: User) => {
        setSelectedUser(user);
        setEditData({
            name: user.name || '',
            email: user.email || '',
            role: user.role || '',
            department: user.department || '',
            password: '' // Don't show current password
        });
        setEditOpen(true);
    };

    const handleDeleteClick = (user: User) => {
        setUserToDelete(user);
        setDeleteOpen(true);
    };

    const handleEditSave = async () => {
        if (!selectedUser) return;
        try {
            const payload: any = { ...editData };
            if (!payload.password || payload.password.trim() === '') {
                delete payload.password;
            }

            await backendApi.updateUser(selectedUser.id, payload);
            setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
            setEditOpen(false);
            fetchUsers();
        } catch (err: any) {
            setSnackbar({ open: true, message: err.message || 'Update failed', severity: 'error' });
        }
    };

    const handleDeleteConfirm = async () => {
        if (!userToDelete) return;
        try {
            await backendApi.deleteUser(userToDelete.id);
            setSnackbar({ open: true, message: 'User deleted successfully', severity: 'success' });
            setDeleteOpen(false);
            fetchUsers();
        } catch (err: any) {
            setSnackbar({ open: true, message: err.message || 'Delete failed', severity: 'error' });
        }
    };

    const groupedUsers = users.reduce((acc, user) => {
        const dept = user.department || 'Unassigned';
        if (!acc[dept]) acc[dept] = [];
        acc[dept].push(user);
        return acc;
    }, {} as Record<string, User[]>);

    if (loading && users.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4, bgcolor: '#F5F6FA', minHeight: '100vh' }}>
            <Typography variant="h4" fontWeight={800} color="#2d3436" mb={1}>
                Staff Management
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
                Manage department heads, supervisors, and field workers.
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {Object.keys(groupedUsers).length === 0 && !loading && (
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                    <Typography color="text.secondary">No staff members found.</Typography>
                </Paper>
            )}

            {Object.entries(groupedUsers).map(([dept, deptUsers]) => (
                <Accordion key={dept} sx={{ mb: 2, borderRadius: '12px !important', '&:before': { display: 'none' }, boxShadow: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6" fontWeight={700} color="#2e7d32">
                            {dept} ({deptUsers.length})
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                                        <TableCell sx={{ fontWeight: 700, textAlign: 'right' }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {deptUsers.map((user) => (
                                        <TableRow key={user.id} hover>
                                            <TableCell>{user.name || 'N/A'}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell sx={{ textTransform: 'capitalize' }}>{user.role}</TableCell>
                                            <TableCell align="right">
                                                <IconButton color="primary" onClick={() => handleEditClick(user)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleDeleteClick(user)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            ))}

            {/* Edit Dialog */}
            <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 800 }}>Edit Staff Details</DialogTitle>
                <DialogContent sx={{ pt: 2 }}>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
                        <TextField
                            label="Full Name"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Email Address"
                            value={editData.email}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            select
                            label="Role"
                            value={editData.role}
                            onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                            fullWidth
                        >
                            {ROLES.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Department"
                            value={editData.department}
                            onChange={(e) => setEditData({ ...editData, department: e.target.value })}
                            fullWidth
                        >
                            {DEPARTMENTS.map((dept) => (
                                <MenuItem key={dept} value={dept}>
                                    {dept}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="New Password (Optional)"
                            type="password"
                            value={editData.password}
                            onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                            placeholder="Leave blank to keep current password"
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setEditOpen(false)} color="inherit">Cancel</Button>
                    <Button onClick={handleEditSave} variant="contained" sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}>
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
                <DialogTitle sx={{ fontWeight: 800 }}>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete <strong>{userToDelete?.name || userToDelete?.email}</strong>?
                        This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setDeleteOpen(false)} color="inherit">Cancel</Button>
                    <Button onClick={handleDeleteConfirm} variant="contained" color="error">
                        Delete Staff Member
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default StaffManagement;
