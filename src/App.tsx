import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Landing from './pages/Landing';
import StaffLogin from './pages/StaffLogin/stafflogin';
import CitizenLogin from './pages/auth/Login';
import Register from './pages/auth/Register';
import AppLayout from './components/layout/AppLayout';
import CitizenDashboard from './pages/citizen/Dashboard';
import SubmitComplaint from './pages/citizen/SubmitComplaint';
import TrackComplaint from './pages/citizen/TrackComplaint';
import History from './pages/citizen/History';
import Profile from './pages/citizen/Profile';
import DeptHeadDashboard from './pages/dept/Dashboard';
import Allocation from './pages/dept/Allocation';
import Reports from './pages/dept/Reports';
import SupervisorPerformance from './pages/dept/SupervisorPerformance';
import SupervisorDashboard from './pages/supervisor/Dashboard';
import SupervisorReports from './pages/supervisor/Reports';
import ComplaintManagement from './pages/supervisor/ComplaintManagement';
import ProgressUpdate from './pages/supervisor/ProgressUpdate';
import Workers from './pages/supervisor/Workers';
import WorkerTaskList from './pages/worker/TaskList';
import WorkOrderDetails from './pages/worker/WorkOrderDetails';
import WorkerUpdateStatus from './pages/worker/UpdateStatus';
import AdminLogin from './pages/admin/AdminLogin';
import UserAnalysis from './pages/admin/UserAnalysis';
import CreateStaff from './pages/admin/CreateStaff';
import AdminDashboard from './pages/admin/Dashboard';
import ComplaintAnalysis from './pages/admin/ComplaintAnalysis';
import StaffManagement from './pages/admin/StaffManagement';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Contact from './pages/public/Contact';



const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />

            {/* Login routes */}
            <Route path="/login" element={<CitizenLogin />} />
            <Route path="/staff-login" element={<StaffLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />

            <Route element={<AppLayout />}>
                {/* Citizen */}
                <Route path="/citizen" element={<ProtectedRoute allowedRoles={["citizen"]} />}>
                    <Route index element={<CitizenDashboard />} />
                    <Route path="submit" element={<SubmitComplaint />} />
                    <Route path="track" element={<TrackComplaint />} />
                    <Route path="history" element={<History />} />
                    <Route path="profile" element={<Profile />} />
                </Route>

                {/* Department Head */}
                <Route path="/department" element={<ProtectedRoute allowedRoles={["head"]} />}>
                    <Route index element={<DeptHeadDashboard />} />
                    <Route path="allocation" element={<Allocation />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="supervisors" element={<SupervisorPerformance />} />
                </Route>

                {/* Supervisor */}
                <Route path="/supervisor" element={<ProtectedRoute allowedRoles={["supervisor"]} />}>
                    <Route index element={<SupervisorDashboard />} />
                    <Route path="manage" element={<ComplaintManagement />} />
                    <Route path="reports" element={<SupervisorReports />} />
                    <Route path="progress" element={<ProgressUpdate />} />
                    <Route path="workers" element={<Workers />} />
                </Route>

                {/* Worker */}
                <Route path="/worker" element={<ProtectedRoute allowedRoles={["worker"]} />}>
                    <Route index element={<WorkerTaskList />} />
                    <Route path="order/:id" element={<WorkOrderDetails />} />
                    <Route path="update" element={<WorkerUpdateStatus />} />
                    {/* Admin */}
                </Route>
                <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]} />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="create-staff" element={<CreateStaff />} />

                    <Route path="analysis" element={<UserAnalysis />} />
                    <Route path="complaints" element={<ComplaintAnalysis />} />
                    <Route path="staff" element={<StaffManagement />} />

                </Route>






            </Route>

            <Route path="*" element={<div style={{ padding: 24 }}>Page not found</div>} />
        </Routes>
    );
};

export default App;