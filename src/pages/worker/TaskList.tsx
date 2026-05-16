import React from 'react';
import { Typography, List, ListItem, ListItemText, ListItemButton, Paper, Skeleton, Tabs, Tab, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { useWorkerTasks } from '../../hooks/useComplaints';

const WorkerTaskList: React.FC = () => {
	const { user } = useAuthStore();
	const worker = user?.id || '';
	const { data, isLoading } = useWorkerTasks(worker);
	const [tab, setTab] = React.useState(0);

	const activeTasks = (data || []).filter(c => c.status === 'Pending' || c.status === 'In Progress');
	const completedTasks = (data || []).filter(c => c.status === 'Work Completed' || c.status === 'Resolved');

	const renderList = (list: any[]) => (
		<List>
			{list.length === 0 && <Typography color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>No tasks in this list.</Typography>}
			{list.map((c) => (
				<ListItem key={c.id} disablePadding sx={{ mb: 1 }}>
					<ListItemButton component={RouterLink} to={`/worker/order/${c.id}`} sx={{ borderRadius: 2, border: '1px solid rgba(255,255,255,0.1)' }}>
						<ListItemText
							primary={
								<Box display="flex" justifyContent="space-between">
									<span>#{c.id.slice(0, 6)} {c.category}</span>
									<Typography variant="caption" sx={{ opacity: 0.7 }}>{c.status}</Typography>
								</Box>
							}
							secondary={`Location: ${c.location}`}
						/>
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);

	return (
		<Paper className="glass-card" sx={{ p: 2 }}>
			<Typography variant="h6" gutterBottom>My Workbench</Typography>

			<Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
				<Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth">
					<Tab label={`Active (${activeTasks.length})`} />
					<Tab label={`History (${completedTasks.length})`} />
				</Tabs>
			</Box>

			{isLoading ? (
				<List>
					{Array.from({ length: 3 }).map((_, i) => (
						<ListItem key={i} disablePadding sx={{ mb: 1 }}>
							<Skeleton variant="rounded" width="100%" height={60} />
						</ListItem>
					))}
				</List>
			) : (
				<>
					{tab === 0 && renderList(activeTasks)}
					{tab === 1 && renderList(completedTasks)}
				</>
			)}
		</Paper>
	);
};

export default WorkerTaskList;
