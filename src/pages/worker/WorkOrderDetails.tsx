import React from 'react';
import { Paper, Typography, Box, Button, TextField, MenuItem, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import MapPreview from '../../components/maps/MapPreview';
import { useComplaint, useUpdateStatus } from '../../hooks/useComplaints';
import { useSnackbar } from 'notistack';

const WorkOrderDetails: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data: complaint, isLoading } = useComplaint(id);
	const { mutateAsync, isPending } = useUpdateStatus();
	const { enqueueSnackbar } = useSnackbar();
	const [status, setStatus] = React.useState('In Progress');
	const [note, setNote] = React.useState('');

	React.useEffect(() => {
		if (complaint) {
			setStatus(complaint.status);
			if (complaint.workerNote) setNote(complaint.workerNote);
		}
	}, [complaint]);

	const handleUpdate = async () => {
		if (!id) return;
		await mutateAsync({ id, status: status as any, workerNote: note });
		enqueueSnackbar('Task status updated successfully', { variant: 'success' });
		navigate('/worker'); // Go back to list
	};

	if (isLoading) return <Paper sx={{ p: 3 }}>Loading...</Paper>;
	if (!complaint) return <Paper sx={{ p: 3 }}>Work order not found</Paper>;

	return (
		<Paper className="glass-card" sx={{ p: 3 }}>
			<Typography variant="h6" gutterBottom>Work Order #{complaint.id.slice(0, 8)}</Typography>

			<Box sx={{ mb: 3 }}>
				<Typography variant="subtitle2" color="text.secondary">Category</Typography>
				<Typography variant="body1">{complaint.category}</Typography>
			</Box>

			<Box sx={{ mb: 3 }}>
				<Typography variant="subtitle2" color="text.secondary">Description</Typography>
				<Typography variant="body1">{complaint.description}</Typography>
				{complaint.imageUrl && (
					<Box sx={{ mt: 2 }}>
						<Typography variant="subtitle2" color="text.secondary" gutterBottom>Attached Image</Typography>
						<img src={complaint.imageUrl} alt="Complaint" style={{ maxHeight: '300px', borderRadius: '8px', border: '1px solid var(--glass-border)' }} />
					</Box>
				)}
			</Box>

			<Box sx={{ mb: 3 }}>
				<Typography variant="subtitle2" color="text.secondary">Location</Typography>
				<Typography variant="body1">{complaint.location}</Typography>
				<Box sx={{ mt: 1 }}>
					<MapPreview height={220} />
				</Box>
			</Box>

			<Divider sx={{ my: 3 }} />

			<Typography variant="h6" gutterBottom>Update Status</Typography>
			<Typography variant="body2" sx={{ mb: 2 }}>Mark the task as completed when you are done.</Typography>

			<Box sx={{ display: 'grid', gap: 2 }}>
				<TextField
					select
					label="Current Status"
					value={status}
					onChange={(e) => setStatus(e.target.value)}
					fullWidth
				>
					<MenuItem value="In Progress">In Progress (Working)</MenuItem>
					<MenuItem value="Work Completed">Work Completed (Pending Verification)</MenuItem>
					<MenuItem value="Blocked">Unable to Complete (Report Issue)</MenuItem>
				</TextField>

				{status === 'Blocked' && (
					<TextField
						label="Reason for Issue"
						multiline
						minRows={3}
						placeholder="Describe why the task cannot be completed..."
						value={note}
						onChange={(e) => setNote(e.target.value)}
						required
						fullWidth
					/>
				)}

				{status === 'Work Completed' && (
					<Box sx={{ display: 'flex', gap: 2 }}>
						<Button variant="outlined" component="label" fullWidth>
							Upload Photo Proof
							<input hidden type="file" accept="image/*" />
						</Button>
					</Box>
				)}

				<Button
					variant="contained"
					size="large"
					disabled={isPending}
					onClick={handleUpdate}
					sx={{ mt: 1 }}
				>
					Update Task
				</Button>
			</Box>
		</Paper>
	);
};

export default WorkOrderDetails;
