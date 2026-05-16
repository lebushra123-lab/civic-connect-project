import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createComplaint, getComplaintById, listCitizenComplaints, Complaint, listDepartmentComplaints, assignSupervisor, listSupervisorComplaints, assignWorker, listWorkerTasks, updateComplaintStatus } from '../services/api';

export function useCitizenComplaints(citizenId: string) {
	return useQuery({ queryKey: ['complaints', 'citizen', citizenId], queryFn: () => listCitizenComplaints(citizenId) });
}

export function useDepartmentComplaints(department: string) {
	return useQuery({ queryKey: ['complaints', 'dept', department], queryFn: () => listDepartmentComplaints(department) });
}

export function useSupervisorComplaints(supervisor: string) {
	return useQuery({ queryKey: ['complaints', 'supervisor', supervisor], queryFn: () => listSupervisorComplaints(supervisor) });
}

export function useWorkerTasks(worker: string) {
	return useQuery({ queryKey: ['complaints', 'worker', worker], queryFn: () => listWorkerTasks(worker) });
}

export function useCreateComplaint() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: createComplaint,
		onSuccess: (data) => {
			qc.invalidateQueries({ queryKey: ['complaints', 'citizen', data.citizenId] });
		}
	});
}

export function useAssignSupervisor() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, supervisor }: { id: string; supervisor: string }) => assignSupervisor(id, supervisor),
		onSuccess: (data) => {
			if (data) {
				qc.invalidateQueries({ queryKey: ['complaints', 'dept', data.department] });
			}
		}
	});
}

export function useAssignWorker() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, worker }: { id: string; worker: string }) => assignWorker(id, worker),
		onSuccess: (data) => {
			if (data) {
				qc.invalidateQueries({ queryKey: ['complaints', 'supervisor', data.supervisor] });
				qc.invalidateQueries({ queryKey: ['complaints', 'worker', data.worker] });
			}
		}
	});
}

export function useUpdateStatus() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, status, workerNote, supervisorNote }: { id: string; status: Complaint['status']; workerNote?: string; supervisorNote?: string }) => updateComplaintStatus(id, { status, workerNote, supervisorNote }),
		onSuccess: (data) => {
			if (data) {
				qc.invalidateQueries();
			}
		}
	});
}

export function useComplaint(id?: string) {
	return useQuery({ queryKey: ['complaint', id], queryFn: () => getComplaintById(id as string), enabled: !!id });
}
