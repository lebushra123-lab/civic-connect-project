import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  Button,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import PeopleIcon from '@mui/icons-material/People';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SettingsIcon from '@mui/icons-material/Settings';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Create Staff',
      desc: 'Create authorized accounts for Dept. Heads, Supervisors etc.',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      path: '#',
      color: '#757575'
    },
    {
      title: 'User Analytics',
      desc: 'View detailed distribution of citizens and staff across departments.',
      icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
      path: '/admin/user-analysis',
      color: '#0d47a1'
    },
    {
      title: 'Complaint Analysis',
      desc: 'Monitor civic issues, track statuses, and analyze departmental efficiency.',
      icon: <RequestQuoteIcon sx={{ fontSize: 40 }} />,
      path: '/admin/complaint-analysis',
      color: '#2e7d32'
    },
    {
      title: 'Staff Management',
      desc: 'Add, update, or remove municipal staff members from the system.',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      path: '/admin/staff-management',
      color: '#ed6c02'
    }

  ];

  return (
    <Box sx={{ p: 4, bgcolor: '#F5F6FA', minHeight: '100vh' }}>
      {/* Welcome Header */}
      <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 3,
            bgcolor: '#0d47a1',
            color: 'white',
            mr: 3,
            display: 'flex',
            boxShadow: '0 4px 20px rgba(13, 71, 161, 0.3)'
          }}
        >
          <DashboardIcon sx={{ fontSize: 32 }} />
        </Box>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#1A1A1A" letterSpacing={-0.5}>
            Admin Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Monitor your city's pulse and manage administrative tasks.
          </Typography>
        </Box>
      </Box>

      {/* Quick Access Info */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          bgcolor: 'white',
          boxShadow: '0 2px 15px rgba(0,0,0,0.03)',
          border: '1px solid rgba(0,0,0,0.05)',
          mb: 6
        }}
      >
        <Typography variant="h6" fontWeight={800} mb={1}>
          Administrative Controls
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 700, mb: 3 }}>
          See the action cards below to get overview Or use the sidebar for navigation.
        </Typography>
        <Divider />
      </Paper>

      {/* Action Cards Grid */}
      <Typography variant="overline" color="text.secondary" fontWeight={800} letterSpacing={2} mb={3} display="block">
        QUICK ACTIONS
      </Typography>
      <Grid container spacing={4}>
        {quickActions.map((action, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: 'white',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.04)',
                '&:hover': {
                  transform: 'translateY(-12px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                  borderColor: action.color
                }
              }}
            >
              <Box
                sx={{
                  color: action.color,
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 64,
                  height: 64,
                  borderRadius: 3,
                  bgcolor: `${action.color}10`
                }}
              >
                {action.icon}
              </Box>
              <Typography variant="h6" fontWeight={800} mb={1.5} color="#1A1A1A">
                {action.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, flexGrow: 1, lineHeight: 1.6 }}>
                {action.desc}
              </Typography>

            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;