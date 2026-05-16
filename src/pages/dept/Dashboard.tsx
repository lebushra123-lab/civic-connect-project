import React from 'react';
import { Stack } from '@mui/material';
import { useAuthStore } from '../../store/auth';
import { useDepartmentComplaints } from '../../hooks/useComplaints';
import Hero from '../../components/ui/Hero';
import StatCard from '../../components/ui/StatCard';
import RouteIcon from '@mui/icons-material/Route';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

const DeptHeadDashboard: React.FC = () => {
	const { user } = useAuthStore();
	const dept = user?.department || '';
	const { data: complaints = [] } = useDepartmentComplaints(dept);

	const pending = complaints.filter(c => c.status === 'Pending').length;
	const inProgress = complaints.filter(c => c.status === 'In Progress').length;
	const resolved = complaints.filter(c => c.status === 'Resolved').length;

	let icon = <RouteIcon />;
	let color = "var(--green)";
	if (dept === 'Urban Drainage') { icon = <WaterDropIcon />; color = "var(--blue)"; }
	else if (dept === 'Waste Management') { icon = <DeleteSweepIcon />; color = "var(--orange)"; }

	return (
		<>
			<Hero title={`${dept} Dashboard`} subtitle="Overview of your department's performance" />
			<Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
				<StatCard title="Pending" value={pending} color={color} icon={icon} />
				<StatCard title="In Progress" value={inProgress} color="#fbc02d" icon={<RouteIcon />} />
				<StatCard title="Resolved" value={resolved} color="#66bb6a" icon={<RouteIcon />} />
			</Stack>
		</>
	);
};

export default DeptHeadDashboard;
