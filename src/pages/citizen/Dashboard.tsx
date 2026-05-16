import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { useCitizenComplaints } from '../../hooks/useComplaints';
import Hero from '../../components/ui/Hero';
import StatCard from '../../components/ui/StatCard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import FadeInOnScroll from '../../components/ui/FadeInOnScroll';

const CitizenDashboard: React.FC = () => {
	const { user } = useAuthStore();
	const { data: complaints = [] } = useCitizenComplaints(user?.id || '');
	const navigate = useNavigate();

	const pending = complaints.filter(c => c.status === 'Pending').length;
	const inProgress = complaints.filter(c => c.status === 'In Progress').length;
	const resolved = complaints.filter(c => c.status === 'Resolved').length;

	return (
		<>
			<FadeInOnScroll>
				{/* Welcome Hero Banner */}
				<Box sx={{
					background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
					borderRadius: 4,
					p: { xs: 4, md: 6 },
					mb: 4,
					textAlign: 'center',
					color: '#fff',
					boxShadow: '0 10px 30px rgba(50, 205, 50, 0.15)',
					position: 'relative',
					overflow: 'hidden'
				}}>
					<Typography variant="h3" sx={{ fontWeight: 800, mb: 2, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
						Welcome to CivicConnect
					</Typography>
					<Typography variant="h6" sx={{ mb: 4, opacity: 0.95, fontWeight: 500 }}>
						Your direct bridge to municipal services
					</Typography>
					<Box
						component="button"
						onClick={() => navigate('/citizen/submit')}
						sx={{
							bgcolor: 'rgba(255,255,255,0.2)',
							backdropFilter: 'blur(10px)',
							border: '1px solid rgba(255,255,255,0.3)',
							color: '#fff',
							px: 4,
							py: 1.5,
							borderRadius: 2,
							cursor: 'pointer',
							fontSize: '1rem',
							fontWeight: 600,
							transition: 'all 0.2s',
							'&:hover': { bgcolor: '#fff', color: '#2e7d32' }
						}}
					>
						Submit your Complaint
					</Box>
				</Box>
			</FadeInOnScroll>

			<FadeInOnScroll>
				<Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
					{/* Stat Card: Pending */}
					<Box sx={{ flex: 1, bgcolor: '#fff', p: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
						<Box sx={{ width: 60, height: 60, borderRadius: '50%', bgcolor: '#fff4e5', color: '#ff9800', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
							<AccessTimeIcon sx={{ fontSize: 30 }} />
						</Box>
						<Typography variant="h6" fontWeight={700} gutterBottom>Pending Complaints</Typography>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
							{pending} issues currently awaiting review.
						</Typography>
					</Box>

					{/* Stat Card: In Progress */}
					<Box sx={{ flex: 1, bgcolor: '#fff', p: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
						<Box sx={{ width: 60, height: 60, borderRadius: '50%', bgcolor: '#e3f2fd', color: '#2196f3', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
							<BuildCircleIcon sx={{ fontSize: 30 }} />
						</Box>
						<Typography variant="h6" fontWeight={700} gutterBottom>Track Progress</Typography>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
							{inProgress} complaints are being resolved.
						</Typography>
					</Box>

					{/* Stat Card: Resolved */}
					<Box sx={{ flex: 1, bgcolor: '#fff', p: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
						<Box sx={{ width: 60, height: 60, borderRadius: '50%', bgcolor: '#e8f5e9', color: '#4caf50', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
							<CheckCircleIcon sx={{ fontSize: 30 }} />
						</Box>
						<Typography variant="h6" fontWeight={700} gutterBottom>Community Impact</Typography>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
							{resolved} issues successfully resolved.
						</Typography>
					</Box>
				</Stack>
			</FadeInOnScroll>
		</>
	);
};

export default CitizenDashboard;
