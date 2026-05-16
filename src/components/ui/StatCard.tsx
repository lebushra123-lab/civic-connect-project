import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

interface StatCardProps {
	title: string;
	value: string | number;
	color: string;
	icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color, icon }) => {
	return (
		<Paper className="glass-card" sx={{ p: 3 }}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				<Box className="stat-badge" sx={{ background: color }}>{icon}</Box>
				<Box>
					<Typography variant="h6">{value}</Typography>
					<Typography variant="body2" color="text.secondary">{title}</Typography>
				</Box>
			</Box>
		</Paper>
	);
};

export default StatCard;
