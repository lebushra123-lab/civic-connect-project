import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

import { useAuthStore } from '../../store/auth';
import backendApi from '../../services/backendApi';

const Workers: React.FC = () => {
	const { user } = useAuthStore();
	const dept = user?.department || '';
	const [workers, setWorkers] = React.useState<any[]>([]);

	React.useEffect(() => {
		if (dept) {
			backendApi.listUsers({ role: 'worker', department: dept })
				.then(setWorkers)
				.catch(console.error);
		}
	}, [dept]);

	return (
		<Card>
			<CardContent>
				<Typography variant="h6" gutterBottom>Field Workers ({dept})</Typography>
				<List>
					{workers.length === 0 ? <Typography>No field workers found in this department.</Typography> :
						workers.map(w => (
							<ListItem key={w.id} divider>
								<ListItemText primary={w.name} secondary={`${w.email} - Active`} />
							</ListItem>
						))}
				</List>
			</CardContent>
		</Card>
	);
};

export default Workers;
