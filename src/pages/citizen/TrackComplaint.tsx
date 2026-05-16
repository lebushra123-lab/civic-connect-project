import React from 'react';
import { Card, CardContent, Typography, Stepper, Step, StepLabel, TextField, Box, Chip, Stack } from '@mui/material';
import { useComplaint } from '../../hooks/useComplaints';

const steps = ['Pending', 'In Progress', 'Resolved'];

const statusColor = (status?: string) => status === 'Resolved' ? 'success' : status === 'In Progress' ? 'info' : 'warning';

const TrackComplaint: React.FC = () => {
	const [id, setId] = React.useState('');
	const { data } = useComplaint(id || undefined);
	const activeStep = data ? steps.indexOf(data.status) : 0;
	return (
		<Card className="glass-card">
			<CardContent>
				<Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" sx={{ mb: 2 }}>
					<Typography variant="h6" sx={{ flexGrow: 1 }}>Track Complaint</Typography>
					{data && <Chip label={data.status} color={statusColor(data.status) as any} />}
				</Stack>
				<Box sx={{ display: 'grid', gap: 2 }}>
					<TextField label="Complaint ID" value={id} onChange={(e) => setId(e.target.value)} fullWidth />
					<Stepper activeStep={activeStep < 0 ? 0 : activeStep} alternativeLabel>
						{steps.map((label) => (
							<Step key={label}><StepLabel>{label}</StepLabel></Step>
						))}
					</Stepper>
					{data && (
						<Typography color="text.secondary">Assigned: {data.department} Dept</Typography>
					)}
				</Box>
			</CardContent>
		</Card>
	);
};

export default TrackComplaint;
