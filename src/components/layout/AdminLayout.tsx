// components/layout/AdminLayout.tsx
import React from 'react';
import { Box, Typography, List, ListItemButton, ListItemText, Divider } from '@mui/material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'User Analysis', path: '/admin/analysis' },
    { label: 'Complaint Analysis', path: '/admin/complaints' }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 220,
          bgcolor: '#2e7d32',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
          Admin Panel
        </Typography>
        <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.3)' }} />
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                mb: 1,
                borderRadius: 1,
                bgcolor: location.pathname === item.path ? 'rgba(255,255,255,0.2)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' }
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4, bgcolor: '#F9FAF7' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;