import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore, Role } from '../store/auth';

interface ProtectedRouteProps {
	allowedRoles: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
	const location = useLocation();
	const { isAuthenticated, role } = useAuthStore();

	/* 🔐 Not logged in */
	if (!isAuthenticated) {
		// staff routes never allow register
		const isStaffRoute = allowedRoles.some(r => r !== 'citizen');
		return (
			<Navigate
				to={isStaffRoute ? '/staff-login' : '/login'}
				state={{ from: location }}
				replace
			/>
		);
	}

	/* 🚫 Logged in but role mismatch */
	if (role && !allowedRoles.includes(role)) {
		const redirect =
			role === 'citizen'
				? '/citizen'
				: role === 'head'
					? '/department'
					: role === 'supervisor'
						? '/supervisor'
						: role === 'worker'
							? '/worker'
							: '/admin/dashboard';

		return <Navigate to={redirect} replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
