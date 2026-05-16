import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';
import { useAuthStore } from '../../store/auth';
import { useDepartmentComplaints, useUpdateStatus } from '../../hooks/useComplaints';
import { useSnackbar } from 'notistack';
import Hero from '../../components/ui/Hero';

const SupervisorDashboard: React.FC = () => {
	const { user } = useAuthStore();
	const dept = user?.department || '';
	const { data, refetch } = useDepartmentComplaints(dept);
	const { mutateAsync } = useUpdateStatus();
	const { enqueueSnackbar } = useSnackbar();

	const [openDialog, setOpenDialog] = React.useState(false);
	const [selectedId, setSelectedId] = React.useState<string | null>(null);
	const [reportNote, setReportNote] = React.useState('');

	const handleOpenVerify = (id: string) => {
		setSelectedId(id);
		setReportNote('Verified. Guidelines followed. Work satisfactory.');
		setOpenDialog(true);
	};

	const handleConfirmVerify = async () => {
		if (selectedId) {
			await mutateAsync({ id: selectedId, status: 'Verified', supervisorNote: reportNote });
			enqueueSnackbar('Report Generated & Forwarded to Dept Head', { variant: 'success' });
			refetch();
			setOpenDialog(false);
		}
	};

	const pendingVerification = (data || []).filter(c => c.status === 'Work Completed');
	const activeComplaints = (data || []).filter(c => c.status !== 'Work Completed' && c.status !== 'Resolved');

	return (
		<>
			<Hero title="Supervisor Console" subtitle="Track and verify assigned complaints" />

			{pendingVerification.length > 0 && (
				<Paper className="glass-card" sx={{ p: 2, mb: 3, border: '1px solid #ff9800' }}>
					<Typography variant="h6" color="warning.main" gutterBottom>Pending Verification</Typography>
					<List>
						{pendingVerification.map((c) => (
							<ListItem key={c.id} divider secondaryAction={
								<Button variant="contained" color="success" onClick={() => handleOpenVerify(c.id)}>Generate Report & Verify</Button>
							}>
								<ListItemText
									primary={`#${c.id} ${c.category}`}
									secondary={
										<>
											<Typography component="span" variant="body2" display="block">Worker Report: {c.workerNote || 'No notes provided.'}</Typography>
											<Typography component="span" variant="caption" color="text.secondary">Status: Pending Verification</Typography>
										</>
									}
								/>
							</ListItem>
						))}
					</List>
				</Paper>
			)}

			<Paper className="glass-card" sx={{ p: 2 }}>
				<Typography variant="h6" gutterBottom>Active Assignments</Typography>
				<List>
					{activeComplaints.map((c) => (
						<ListItem key={c.id} divider>
							<ListItemText primary={`#${c.id} ${c.category}`} secondary={`Status: ${c.status}`} />
						</ListItem>
					))}
					{activeComplaints.length === 0 && <Typography p={2} color="text.secondary">No active complaints.</Typography>}
				</List>
			</Paper>

			<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
				<DialogTitle>Generate Verification Report</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ mb: 2 }}>
						Add your final observations before forwarding this to the Department Head.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						label="Supervisor Report / Note"
						fullWidth
						multiline
						rows={3}
						value={reportNote}
						onChange={(e) => setReportNote(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDialog(false)}>Cancel</Button>
					<Button onClick={handleConfirmVerify} variant="contained" color="primary">Generate & Forward</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default SupervisorDashboard;
