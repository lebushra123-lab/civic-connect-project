import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Button, Paper, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useAuthStore } from '../../store/auth';
import { useDepartmentComplaints, useUpdateStatus } from '../../hooks/useComplaints';
import backendApi from '../../services/backendApi';

const Allocation: React.FC = () => {
	const { user } = useAuthStore();
	const { enqueueSnackbar } = useSnackbar();
	const dept = user?.department || '';
	const { data: complaints = [] } = useDepartmentComplaints(dept);

	const [tab, setTab] = React.useState(0);
	const { mutateAsync } = useUpdateStatus();

	const verified = complaints.filter((c: any) => c.status === 'Verified');
	// const pending = complaints.filter((c: any) => c.status === 'Pending'); // Old allocation logic disabled

	const handleFinalize = async (id: string) => {
		await mutateAsync({ id, status: 'Resolved' }); // Final state
		enqueueSnackbar('Complaint Finalized & Closed', { variant: 'success' });
	};

	if (!dept) {
		return (
			<Paper className="glass-card" sx={{ p: 3 }}>
				<Typography variant="h6" color="error">Error: No Department Assigned</Typography>
				<Typography>Your account <strong>{user?.name} ({user?.email})</strong> does not have a department linked.</Typography>
			</Paper>
		);
	}

	return (
		<Paper className="glass-card" sx={{ p: 3 }}>
			<Typography variant="h6" gutterBottom>Final Verification (Department Head)</Typography>
			<Typography variant="body2" sx={{ mb: 3 }}>Review verified complaints from supervisors and close them.</Typography>

			<List>
				{verified.length === 0 && <Typography p={2} color="text.secondary">No reports pending final approval.</Typography>}

				{verified.map((c: any) => (
					<ListItem key={c.id} divider secondaryAction={<Button variant="contained" color="primary" onClick={() => handleFinalize(c.id)}>Approve & Close</Button>}>
						<ListItemText
							primary={
								<Stack direction="column">
									<Typography variant="subtitle1">#{c.id.slice(0, 8)} {c.category}</Typography>
									<Typography variant="caption" color="text.secondary">From Citizen: {c.citizenId || 'Anonymous'}</Typography>
								</Stack>
							}
							secondary={
								<>
									<Typography variant="body2">{c.description}</Typography>
									{c.workerNote && <Typography variant="body2" sx={{ mt: 1, p: 1, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 1, fontSize: '0.85rem' }}><strong>Worker Report:</strong> {c.workerNote}</Typography>}
									{c.supervisorNote && <Typography variant="body2" sx={{ mt: 1, p: 1, bgcolor: '#e8f5e9', borderRadius: 1, color: '#1b5e20' }}><strong>Supervisor Verification Report:</strong> {c.supervisorNote}</Typography>}
									<Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>Ready for Final Approval</Typography>
								</>
							}
						/>
					</ListItem>
				))}
			</List>
		</Paper>
	);
};

export default Allocation;
