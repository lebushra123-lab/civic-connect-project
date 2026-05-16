import React from 'react';
import { Card, CardContent, Typography, Stack, Paper } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import Hero from '../../components/ui/Hero';
import StatCard from '../../components/ui/StatCard';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAuthStore } from '../../store/auth';
import { useDepartmentComplaints } from '../../hooks/useComplaints';

const Reports: React.FC = () => {
	const { user } = useAuthStore();
	const dept = user?.department || '';
	const { data: complaints = [] } = useDepartmentComplaints(dept);

	// Calculate Stats
	const total = complaints.length;
	const resolved = complaints.filter(c => c.status === 'Resolved').length;
	const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

	// Calculate Category Breakdown
	const categoryCounts = complaints.reduce((acc: any, curr) => {
		acc[curr.category] = (acc[curr.category] || 0) + 1;
		return acc;
	}, {});

	const chartData = Object.keys(categoryCounts).map(key => ({
		category: key,
		count: categoryCounts[key]
	}));

	return (
		<>
			<Hero title={`${dept} Reports`} subtitle="Performance metrics for your department" />
			<Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
				<StatCard
					title="Resolution Rate"
					value={`${resolutionRate}%`}
					color="linear-gradient(45deg,var(--green-dark),var(--green))"
					icon={<QueryStatsIcon />}
				/>
				<StatCard
					title="Total Complaints"
					value={total.toString()}
					color="linear-gradient(45deg,var(--green),#81c784)"
					icon={<AccessTimeIcon />}
				/>
			</Stack>
			<Paper className="glass-card" sx={{ p: 2 }}>
				<Typography variant="h6" gutterBottom>Complaint Issues in {dept}</Typography>
				{chartData.length > 0 ? (
					<div style={{ width: '100%', height: 320 }}>
						<ResponsiveContainer>
							<BarChart data={chartData}>
								<XAxis dataKey="category" stroke="var(--green-dark)" />
								<YAxis stroke="var(--green-dark)" />
								<Tooltip
									contentStyle={{ backgroundColor: '#fff', borderRadius: 8 }}
									itemStyle={{ color: 'var(--green-dark)' }}
								/>
								<Bar dataKey="count" fill="var(--green)" radius={[4, 4, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				) : (
					<Typography p={4} align="center" color="text.secondary">No data available for reports yet.</Typography>
				)}
			</Paper>
		</>
	);
};

export default Reports;
