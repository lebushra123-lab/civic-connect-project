import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Chip, Stack } from '@mui/material';
import { useAuthStore } from '../../store/auth';
import { useCitizenComplaints } from '../../hooks/useComplaints';

const History: React.FC = () => {
	const { user } = useAuthStore();
	const { data: items = [] } = useCitizenComplaints(user?.id || '');

	return (
		<Paper className="glass-card" sx={{ p: 2 }}>
			<Typography variant="h6" gutterBottom>My Complaints</Typography>
			<List>
				{items.map((i) => (
					<ListItem key={i.id} divider secondaryAction={<Chip label={i.status} color={i.status === 'Resolved' ? 'success' : i.status === 'In Progress' ? 'info' : 'default'} />}>
						<ListItemText primary={`#${i.id.slice(0, 8)}... - ${i.category}`} secondary={i.description} />
					</ListItem>
				))}
			</List>
		</Paper>
	);
};

export default History;
