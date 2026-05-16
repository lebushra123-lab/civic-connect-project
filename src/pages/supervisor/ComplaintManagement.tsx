import React from 'react';
import { Typography, List, ListItem, ListItemText, Button, Paper, Menu, MenuItem } from '@mui/material';
import backendApi from '../../services/backendApi';
import { useAuthStore } from '../../store/auth';
import { useAssignWorker, useDepartmentComplaints } from '../../hooks/useComplaints';
import { useSnackbar } from 'notistack';

const ComplaintManagement: React.FC = () => {
	const { user } = useAuthStore();
	const dept = user?.department || '';
	const { data } = useDepartmentComplaints(dept);
	const { mutateAsync } = useAssignWorker();
	const { enqueueSnackbar } = useSnackbar();

	const [workers, setWorkers] = React.useState<any[]>([]);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [selectedComplaint, setSelectedComplaint] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (dept) {
			backendApi.listUsers({ role: 'worker', department: dept })
				.then(setWorkers)
				.catch(console.error);
		}
	}, [dept]);

	const handleOpen = (e: React.MouseEvent<HTMLElement>, id: string) => {
		setAnchorEl(e.currentTarget);
		setSelectedComplaint(id);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setSelectedComplaint(null);
	};

	const handleAssign = async (workerId: string, workerName: string) => {
		if (selectedComplaint) {
			await mutateAsync({ id: selectedComplaint, worker: workerId });
			enqueueSnackbar(`Assigned to ${workerName}`, { variant: 'success' });
			handleClose();
		}
	};

	return (
		<Paper className="glass-card" sx={{ p: 3 }}>
			<Typography variant="h6" gutterBottom>Assign to Field Workers</Typography>
			<List>
				{(data || []).filter(c => c.status === 'Pending').map((c) => (
					<ListItem key={c.id} secondaryAction={<Button variant="contained" onClick={(e) => handleOpen(e, c.id)}>Assign Worker</Button>} sx={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
						<ListItemText primary={`#${c.id} ${c.category}`} secondary={c.description} />
					</ListItem>
				))}
			</List>
			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
				{workers.length === 0 ? <MenuItem disabled>No workers found</MenuItem> :
					workers.map(w => (
						<MenuItem key={w.id} onClick={() => handleAssign(w.id, w.name)}>{w.name} ({w.email})</MenuItem>
					))}
			</Menu>
		</Paper>
	);
};

export default ComplaintManagement;
