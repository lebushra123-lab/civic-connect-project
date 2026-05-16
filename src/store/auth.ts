import { create } from 'zustand';

export type Role = 'citizen' | 'head' | 'supervisor' | 'worker' | 'admin';

export interface User {
	id: string;
	name: string;
	email: string;
	role: Role;
	department?: string;
}

interface AuthState {
	user: User | null;
	role: Role | null;
	isAuthenticated: boolean;
	login: (user: User) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	role: null,
	isAuthenticated: false,
	login: (user: User) => set({ user, role: user.role, isAuthenticated: true }),
	logout: () => set({ user: null, role: null, isAuthenticated: false })
}));
