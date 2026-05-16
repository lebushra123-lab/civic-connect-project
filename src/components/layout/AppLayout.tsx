import React from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import HeaderBar from './HeaderBar';
import Chatbot from '../ui/Chatbot';

const AppLayout: React.FC = () => {
	const [sidebarOpen, setSidebarOpen] = React.useState(true);

	return (
		<Box className="app-shell">
			<Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
			<Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', ml: { md: sidebarOpen ? '280px' : '88px' }, transition: 'margin-left 0.3s' }}>
				<HeaderBar />
				<Container maxWidth="lg" sx={{ py: 3, flexGrow: 1 }}>
					<Outlet />
				</Container>
			</Box>
			<Chatbot />
		</Box>
	);
};

export default AppLayout;
