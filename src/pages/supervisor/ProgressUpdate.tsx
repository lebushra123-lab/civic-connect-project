import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Button, Stack, Chip, Divider } from '@mui/material';
import { useAuthStore } from '../../store/auth';
import { useSupervisorComplaints, useUpdateStatus } from '../../hooks/useComplaints';
import { useSnackbar } from 'notistack';

const ProgressUpdate: React.FC = () => {
	const { user } = useAuthStore();
	const supId = user?.id || '';
	const { data, refetch } = useSupervisorComplaints(supId);
	const { mutateAsync } = useUpdateStatus();
	const { enqueueSnackbar } = useSnackbar();

	const pending = (data || []).filter(c => c.status === 'Work Completed');

	const handleVerify = async (id: string) => {
		await mutateAsync({ id, status: 'Verified' });
		enqueueSnackbar('Complaint Verified & Forwarded', { variant: 'success' });
		refetch();
	};

	return (
		<Paper className="glass-card" sx={{ p: 3 }}>
			<Typography variant="h6" gutterBottom>Verification Queue</Typography>
			<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
				Review tasks marked as completed by field workers. Verify the proof before closing.
			</Typography>

			{pending.length === 0 ? (
				<Typography align="center" py={4} color="text.secondary">All clear! No tasks pending verification.</Typography>
			) : (
				<List>
					{pending.map(c => (
						<React.Fragment key={c.id}>
							<ListItem
								alignItems="flex-start"
								secondaryAction={
									<Button variant="contained" color="success" onClick={() => handleVerify(c.id)}>
										Verify & Close
									</Button>
								}
							>
								<ListItemText
									primary={
										<Stack direction="row" spacing={1} alignItems="center">
											<Typography variant="subtitle1">#{c.id.slice(0, 8)}</Typography>
											<Chip label={c.category} size="small" />
										</Stack>
									}
									secondary={
										<>
											<Typography variant="body2" color="text.primary" mt={1}>
												{c.description}
											</Typography>
											<Typography variant="caption" display="block" color="warning.main" mt={0.5}>
												Action: Worker completed work. Awaiting approval.
											</Typography>
										</>
									}
								/>
							</ListItem>
							<Divider component="li" />
						</React.Fragment>
					))}
				</List>
			)}
		</Paper>
	);
};

export default ProgressUpdate;
