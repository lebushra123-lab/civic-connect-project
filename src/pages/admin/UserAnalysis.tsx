import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Avatar,
  Divider
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EngineeringIcon from '@mui/icons-material/Engineering';
import BusinessIcon from '@mui/icons-material/Business';
import backendApi from '../../services/backendApi';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
}

const roleColors: Record<string, string> = {
  citizen: '#386593ff',
  head: '#255527ff',
  supervisor: '#65931cff',
  worker: '#92ef4aff'
};

const UserAnalysis: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await backendApi.listUsers({});
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  const totalUsers = users.length;
  const citizens = users.filter(u => u.role === 'citizen');
  const heads = users.filter(u => u.role === 'head');
  const supervisors = users.filter(u => u.role === 'supervisor');
  const workers = users.filter(u => u.role === 'worker');

  const departmentGroups: Record<string, User[]> = {};
  // Filter out citizens from department-wise distribution
  users.filter(u => u.role !== 'citizen').forEach(user => {
    const dept = user.department || 'Unassigned';
    if (!departmentGroups[dept]) departmentGroups[dept] = [];
    departmentGroups[dept].push(user);
  });

  const stats = [
    { label: 'Total Users', value: totalUsers, color: '#0d47a1', icon: <PeopleIcon sx={{ fontSize: 32 }} /> },
    { label: 'Citizens', value: citizens.length, color: roleColors['citizen'], icon: <PersonIcon sx={{ fontSize: 32 }} /> },
    { label: 'Dept Heads', value: heads.length, color: roleColors['head'], icon: <ManageAccountsIcon sx={{ fontSize: 32 }} /> },
    { label: 'Supervisors', value: supervisors.length, color: roleColors['supervisor'], icon: <SupervisorAccountIcon sx={{ fontSize: 32 }} /> },
    { label: 'Workers', value: workers.length, color: roleColors['worker'], icon: <EngineeringIcon sx={{ fontSize: 32 }} /> }
  ];

  return (
    <Box sx={{ p: 4, bgcolor: '#F5F6FA', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight={700} mb={4}>
        Admin User Analytics
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={5}>
        {stats.map((item, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 2.4 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                bgcolor: 'white',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: '0.3s',
                border: `1px solid rgba(0,0,0,0.03)`,
                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${item.color}15`, color: item.color, display: 'flex' }}>
                  {item.icon}
                </Box>
                <Typography variant="h4" fontWeight={800} color={item.color}>
                  {item.value}
                </Typography>
              </Box>
              <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                {item.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Role-wise Breakdown */}
      <Typography variant="h6" fontWeight={700} mb={3} display="flex" alignItems="center">
        <PersonIcon sx={{ mr: 1, color: '#2e7d32' }} /> Role-wise Breakdown
      </Typography>
      <Grid container spacing={3} mb={6}>
        {[
          { title: 'Citizens', data: citizens, icon: <PersonIcon /> },
          { title: 'Department Heads', data: heads, icon: <ManageAccountsIcon /> },
          { title: 'Supervisors', data: supervisors, icon: <SupervisorAccountIcon /> },
          { title: 'Field Workers', data: workers, icon: <EngineeringIcon /> }
        ].map((section, i) => (
          <Grid key={i} size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: 'white',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.05)',
                height: 400,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, pb: 1, borderBottom: '1px solid #f0f0f0' }}>
                <Box sx={{ color: roleColors[section.data[0]?.role || 'citizen'], mr: 1.5, display: 'flex' }}>
                  {section.icon}
                </Box>
                <Typography variant="h6" fontWeight={700}>
                  {section.title}
                </Typography>
                <Chip
                  label={section.data.length}
                  size="small"
                  sx={{ ml: 'auto', fontWeight: 700, bgcolor: `${roleColors[section.data[0]?.role || 'citizen']}15`, color: roleColors[section.data[0]?.role || 'citizen'] }}
                />
              </Box>
              <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
                {section.data.map(user => (
                  <Box
                    key={user._id}
                    sx={{
                      p: 1.5,
                      mb: 1,
                      borderRadius: 2,
                      bgcolor: '#fbfbfb',
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': { bgcolor: '#f5f5f5' }
                    }}
                  >
                    <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: roleColors[user.role], fontSize: '0.9rem' }}>
                      {user.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{user.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{user.email}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Department-wise Cards */}
      <Typography variant="h6" fontWeight={700} mb={3} display="flex" alignItems="center">
        <BusinessIcon sx={{ mr: 1, color: '#2e7d32' }} /> Department-wise Staff Distribution
      </Typography>
      <Grid container spacing={3}>
        {Object.entries(departmentGroups).map(([dept, deptUsers]) => (
          <Grid key={dept} size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: 'white',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.05)',
                minHeight: 250,
                maxHeight: 450,
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight={800} color="#2d3436">
                  {dept}
                </Typography>
                <Chip
                  label={`${deptUsers.length} Staff`}
                  color="success"
                  variant="outlined"
                  size="small"
                  sx={{ fontWeight: 700 }}
                />
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
                {deptUsers.map(user => (
                  <Box
                    key={user._id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1.5,
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: '#f8f9fa'
                    }}
                  >
                    <Box>
                      <Typography variant="body2" fontWeight={700}>{user.name}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                        {user.role}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: roleColors[user.role]
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserAnalysis;