import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Chip
} from '@mui/material';
import backendApi from '../../services/backendApi';

interface Complaint {
  _id: string;
  title: string;
  description: string;
  category: string;
  department: string;
  status: string;
  reporter: string;
  location?: string;
  createdAt: string;
  supervisor?: string;
  worker?: string;
}

interface StatsResponse {
  pending: number;
  inProgress: number;
  resolved: number;
  complaints?: Complaint[];
}

const statusColors: Record<string, string> = {
  'Pending': '#cf572cff',
  'In Progress': '#064584ff',
  'Resolved': '#2e7d32',
  'Work Completed': '#4caf50',
  'Blocked': '#d32f2f',
  'Verified': '#009688'
};

const ComplaintAnalysis: React.FC = () => {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await backendApi.getStats();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  const complaints = Array.isArray(stats.complaints) ? stats.complaints : [];

  const handleClose = () => setSelectedComplaint(null);

  return (
    <Box sx={{ p: 4, bgcolor: '#F5F6FA', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight={700} mb={4}>
        Admin Complaint Analytics
      </Typography>

      {/* Stats Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
          },
          gap: 3,
          mb: 5
        }}
      >
        {[
          { label: 'Pending', value: stats.pending, color: statusColors['Pending'] },
          { label: 'In Progress', value: stats.inProgress, color: statusColors['In Progress'] },
          { label: 'Solved', value: stats.resolved, color: statusColors['Resolved'] }
        ].map((item, index) => (
          <Paper
            key={index}
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: 3,
              bgcolor: 'white',
              '&:hover': { boxShadow: 6 }
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              {item.label}
            </Typography>
            <Typography variant="h4" fontWeight={700} color={item.color}>
              {item.value}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Complaint List Preview */}
      <Typography variant="h6" fontWeight={700} mb={2}>
        Recent Complaints ({complaints.length})
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3
        }}
      >
        {complaints.map(complaint => (
          <Paper
            key={complaint._id}
            onClick={() => setSelectedComplaint(complaint)}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'white',
              boxShadow: 2,
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography fontWeight={700} sx={{ flex: 1 }}>
                {complaint.title}
              </Typography>
              <Chip
                label={complaint.status}
                size="small"
                sx={{
                  bgcolor: statusColors[complaint.status] || '#9e9e9e',
                  color: 'white',
                  fontWeight: 600
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Reporter: {complaint.reporter}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              Category: {complaint.category}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(complaint.createdAt).toLocaleDateString()}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Details Modal */}
      <Dialog
        open={!!selectedComplaint}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, p: 1 }
        }}
      >
        {selectedComplaint && (
          <>
            <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
              Complaint Details
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Title</Typography>
                <Typography variant="body1" fontWeight={500}>{selectedComplaint.title}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Status</Typography>
                  <Chip
                    label={selectedComplaint.status}
                    size="small"
                    sx={{
                      bgcolor: statusColors[selectedComplaint.status] || '#9e9e9e',
                      color: 'white',
                      fontWeight: 600,
                      mt: 0.5
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Category</Typography>
                  <Typography variant="body1">{selectedComplaint.category}</Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Department</Typography>
                <Typography variant="body1">{selectedComplaint.department}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Description</Typography>
                <Typography variant="body1">{selectedComplaint.description || 'No description provided.'}</Typography>
              </Box>

              {selectedComplaint.location && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Location</Typography>
                  <Typography variant="body1">{selectedComplaint.location}</Typography>
                </Box>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Reporter ID</Typography>
                  <Typography variant="caption">{selectedComplaint.reporter}</Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="subtitle2" color="text.secondary">Date Reported</Typography>
                  <Typography variant="caption">
                    {new Date(selectedComplaint.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" sx={{ borderRadius: 2, px: 3 }}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ComplaintAnalysis;
