import React from 'react';
import { Typography, Stack, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { useAuthStore } from '../../store/auth';
import { useDepartmentComplaints } from '../../hooks/useComplaints';
import Hero from '../../components/ui/Hero';
import StatCard from '../../components/ui/StatCard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SupervisorReports: React.FC = () => {
    const { user } = useAuthStore();
    const dept = user?.department || '';
    const { data: complaints = [] } = useDepartmentComplaints(dept);

    // Filter stats
    const total = complaints.length;
    const verified = complaints.filter(c => c.status === 'Verified' || c.status === 'Resolved').length;
    const blocked = complaints.filter(c => c.status === 'Blocked');
    const inProgress = complaints.filter(c => c.status === 'In Progress' || c.status === 'Pending').length;

    return (
        <>
            <Hero title="Supervisor Reports" subtitle="Operational overview and issue tracking" />

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
                <StatCard
                    title="Total Tasks"
                    value={total.toString()}
                    color="linear-gradient(45deg, #1976d2, #64b5f6)"
                    icon={<AssessmentIcon />}
                />
                <StatCard
                    title="Field Issues (Blocked)"
                    value={blocked.length.toString()}
                    color="linear-gradient(45deg, #d32f2f, #ef5350)"
                    icon={<WarningIcon />}
                />
                <StatCard
                    title="Verified & Done"
                    value={verified.toString()}
                    color="linear-gradient(45deg, #2e7d32, #66bb6a)"
                    icon={<CheckCircleIcon />}
                />
            </Stack>

            {/* Blocked / Issues Section */}
            <Paper className="glass-card" sx={{ p: 3, mb: 3, borderLeft: '6px solid #d32f2f' }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#d32f2f', display: 'flex', alignItems: 'center' }}>
                    <WarningIcon sx={{ mr: 1 }} /> Tasks Unable to Complete (Issues)
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    The following tasks were flagged by field workers as impossible to complete. Review the reasons below.
                </Typography>

                {blocked.length === 0 ? (
                    <Typography color="text.secondary">No reported issues. Good job!</Typography>
                ) : (
                    <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Task ID</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Worker</TableCell>
                                    <TableCell><strong>Reason for Non-Completion</strong></TableCell>
                                    <TableCell>Date Report</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {blocked.map((c) => (
                                    <TableRow key={c.id}>
                                        <TableCell>#{c.id.slice(0, 6)}</TableCell>
                                        <TableCell>{c.category}</TableCell>
                                        <TableCell>{c.worker || 'Unknown'}</TableCell>
                                        <TableCell sx={{ color: 'error.main', fontWeight: 500 }}>
                                            {c.workerNote}
                                        </TableCell>
                                        <TableCell>{new Date(c.updatedAt).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>

            <Paper className="glass-card" sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Workforce Verification Status</Typography>
                <Typography variant="body2">Breakdown of current workload status.</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Chip label={`Pending: ${inProgress}`} color="warning" variant="outlined" />
                    <Chip label={`Issues: ${blocked.length}`} color="error" variant="outlined" />
                    <Chip label={`Verified: ${verified}`} color="success" variant="outlined" />
                </Stack>
            </Paper>
        </>
    );
};

export default SupervisorReports;
