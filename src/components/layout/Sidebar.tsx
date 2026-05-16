import React from 'react';
import { Box, Button, Stack, Typography, Divider, IconButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/GridView';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/PersonOutline';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import backendApi from '../../services/backendApi';

interface SidebarProps {
	isOpen: boolean;
	onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
	const { role, logout } = useAuthStore();
	const navigate = useNavigate();
	const location = useLocation();

	const links = role === 'citizen' ? [
		{ label: 'Welcome', to: '/citizen', icon: <HomeIcon /> },
		{ label: 'Dashboard', to: '/citizen/track', icon: <DashboardIcon /> },
		{ label: 'Submit Complaint', to: '/citizen/submit', icon: <AddCircleIcon /> },
		{ label: 'My Complaints', to: '/citizen/history', icon: <ListAltIcon /> },
		{ label: 'Profile', to: '/citizen/profile', icon: <PersonIcon /> },
	] : role === 'head' ? [
		{ label: 'Dashboard', to: '/department', icon: <DashboardIcon /> },
		{ label: 'Final Review', to: '/department/allocation', icon: <FactCheckIcon /> },
		{ label: 'Reports', to: '/department/reports', icon: <AssessmentIcon /> },
		{ label: 'Supervisors', to: '/department/supervisors', icon: <SupervisorAccountIcon /> },
	] : role === 'supervisor' ? [
		{ label: 'Dashboard', to: '/supervisor', icon: <DashboardIcon /> },
		{ label: 'Manage', to: '/supervisor/manage', icon: <AssignmentIcon /> },
		{ label: 'Reports', to: '/supervisor/reports', icon: <AssessmentIcon /> },
		{ label: 'Workers', to: '/supervisor/workers', icon: <EngineeringIcon /> },
	] : role === 'admin' ? [
		{ label: 'Dashboard', to: '/admin/dashboard', icon: <DashboardIcon /> },
		{ label: 'Create Staff', to: '/admin/create-staff', icon: <AddCircleIcon /> },
		{ label: 'User Analysis', to: '/admin/analysis', icon: <AnalyticsIcon /> },
		{ label: 'Complaint Analysis', to: '/admin/complaints', icon: <AnalyticsIcon /> },
		{ label: 'Staff Management', to: '/admin/staff', icon: <SupervisorAccountIcon /> },

	] : [
		{ label: 'My Tasks', to: '/worker', icon: <ListAltIcon /> },
	];

	const isAuthed = Boolean(backendApi.getToken());

	return (
		<Box
			className="sidebar"
			sx={{
				width: isOpen ? 280 : 88,
				height: '100vh',
				borderRight: '1px solid #eee',
				bgcolor: '#fff',
				display: 'flex',
				flexDirection: 'column',
				p: isOpen ? 3 : 2,
				position: 'fixed',
				left: 0,
				top: 0,
				transition: 'width 0.3s, padding 0.3s',
				overflowX: 'hidden',
				zIndex: 1200
			}}
		>
			<Stack spacing={4} sx={{ height: '100%' }}>
				{/* Logo */}
				<Box sx={{ display: 'flex', alignItems: 'center', px: isOpen ? 1 : 0.5, justifyContent: isOpen ? 'flex-start' : 'center', minHeight: 40 }}>
					<ApartmentIcon sx={{ color: '#2e7d32', fontSize: isOpen ? 28 : 32, mr: isOpen ? 1.5 : 0, transition: 'all 0.3s' }} />
					{isOpen && (
						<Typography variant="h6" sx={{ color: '#2d3436', fontWeight: 800, fontSize: '1.25rem', whiteSpace: 'nowrap', opacity: isOpen ? 1 : 0, transition: 'opacity 0.2s' }}>
							CivicConnect
						</Typography>
					)}
				</Box>

				<Stack spacing={1} sx={{ flexGrow: 1 }}>
					{isAuthed && links.map(link => {
						const isActive = location.pathname === link.to;
						return (
							<Tooltip key={link.to} title={!isOpen ? link.label : ''} placement="right">
								<Button
									startIcon={link.icon}
									variant={isActive ? 'contained' : 'text'}
									onClick={() => navigate(link.to)}
									sx={{
										justifyContent: isOpen ? 'flex-start' : 'center',
										px: isOpen ? 3 : 0,
										py: 1.5,
										minWidth: isOpen ? 'auto' : 48,
										width: '100%',
										borderRadius: '12px',
										color: isActive ? '#fff' : '#636e72',
										background: isActive ? 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)' : 'transparent',
										fontWeight: isActive ? 600 : 500,
										textTransform: 'none',
										fontSize: '0.95rem',
										boxShadow: isActive ? '0 4px 12px rgba(50, 205, 50, 0.2)' : 'none',
										'&:hover': {
											background: isActive ? 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)' : 'rgba(0,0,0,0.03)',
											color: isActive ? '#fff' : '#2d3436'
										},
										'& .MuiButton-startIcon': {
											mr: isOpen ? 2 : 0,
											color: isActive ? '#fff' : '#b2bec3',
											'& svg': { fontSize: 22 }
										}
									}}
								>
									{isOpen && link.label}
								</Button>
							</Tooltip>
						);
					})}
				</Stack>

				{/* Toggle & Auth Actions */}
				<Box>
					<Box sx={{ display: 'flex', justifyContent: isOpen ? 'flex-end' : 'center', mb: 2 }}>
						<IconButton
							onClick={onToggle}
							sx={{
								bgcolor: 'rgba(0,0,0,0.6)',
								color: '#fff',
								width: 32,
								height: 32,
								'&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
							}}
						>
							{isOpen ? <ChevronLeftIcon sx={{ fontSize: 20 }} /> : <ChevronRightIcon sx={{ fontSize: 20 }} />}
						</IconButton>
					</Box>

					<Divider sx={{ borderColor: '#f1f2f6', mb: 2 }} />

					{isAuthed ? (
						<Tooltip title={!isOpen ? "Logout" : ""} placement="right">
							<Button
								onClick={() => { backendApi.setToken(null); logout(); navigate('/login', { replace: true }); }}
								startIcon={<LogoutIcon />}
								sx={{
									justifyContent: isOpen ? 'flex-start' : 'center',
									px: isOpen ? 3 : 0,
									minWidth: isOpen ? 'auto' : 48,
									width: '100%',
									py: 1.5,
									borderRadius: '12px',
									color: '#636e72',
									textTransform: 'none',
									fontSize: '0.95rem',
									fontWeight: 500,
									'&:hover': { bgcolor: '#ffebee', color: '#d63031' },
									'& .MuiButton-startIcon': { mr: isOpen ? 2 : 0 }
								}}
							>
								{isOpen && "Logout"}
							</Button>
						</Tooltip>
					) : (
						<Tooltip title={!isOpen ? "Login" : ""} placement="right">
							<Button
								onClick={() => navigate('/login')}
								variant="contained"
								startIcon={!isOpen ? <LoginIcon /> : undefined}
								sx={{
									justifyContent: 'center',
									borderRadius: '12px',
									background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
									color: '#fff',
									boxShadow: '0 4px 12px rgba(50, 205, 50, 0.2)',
									textTransform: 'none',
									py: 1.5,
									width: '100%',
									fontWeight: 600,
									'&:hover': { background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)' }
								}}
							>
								{isOpen ? "Login" : ""}
							</Button>
						</Tooltip>
					)}
				</Box>
			</Stack>
		</Box>
	);
};

export default Sidebar;
