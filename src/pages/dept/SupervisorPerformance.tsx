import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useAuthStore } from '../../store/auth';
import backendApi from '../../services/backendApi';

const SupervisorPerformance: React.FC = () => {
	const { user } = useAuthStore();
	const dept = user?.department || '';
	const [supervisors, setSupervisors] = React.useState<any[]>([]);

	React.useEffect(() => {
		if (dept) {
			backendApi.listUsers({ role: 'supervisor', department: dept })
				.then(setSupervisors)
				.catch(console.error);
		}
	}, [dept]);

	return (
		<Card>
			<CardContent>
				<Typography variant="h6" gutterBottom>Supervisor List ({dept})</Typography>
				<List>
					{supervisors.length === 0 ? <Typography>No supervisors found.</Typography> :
						supervisors.map((s) => (
							<ListItem key={s.id} divider>
								<ListItemText primary={s.name} secondary={`${s.email} - Active`} />
							</ListItem>
						))}
				</List>
			</CardContent>
		</Card>
	);
};

export default SupervisorPerformance;
