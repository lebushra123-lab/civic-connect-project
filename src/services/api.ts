import { getToken } from './backendApi';

export type ComplaintStatus = 'Pending' | 'In Progress' | 'Work Completed' | 'Blocked' | 'Verified' | 'Resolved';

export interface Complaint {
	id: string;
	citizenId: string;
	department: string;
	category: string;
	description: string;
	location: string;
	status: ComplaintStatus;
	createdAt: string;
	updatedAt: string;
	assignedDepartment?: string;
	supervisor?: string;
	worker?: string;
	title?: string;
	workerNote?: string;
	supervisorNote?: string;
	imageUrl?: string;
}

export interface Notification {
	_id: string;
	userId: string;
	message: string;
	type: string;
	read: boolean;
	relatedId?: string;
	createdAt: string;
}

const API_PREFIX = '/api';

function mapComplaint(doc: any): Complaint {
	return {
		id: doc._id,
		citizenId: doc.reporter,
		department: doc.department || 'General',
		category: doc.category,
		description: doc.description,
		location: doc.location,
		status: doc.status as ComplaintStatus,
		createdAt: doc.createdAt,
		updatedAt: doc.updatedAt,
		assignedDepartment: doc.department,
		supervisor: doc.supervisor,
		worker: doc.worker,
		title: doc.title,
		workerNote: doc.workerNote,
		supervisorNote: doc.supervisorNote,
		imageUrl: doc.imageUrl
	};
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
	const token = getToken();
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		...options.headers as Record<string, string>,
	};
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	const res = await fetch(`${API_PREFIX}${endpoint}`, { ...options, headers });
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || `API Error: ${res.statusText}`);
	}
	return res.json();
}

export async function createComplaint(input: Partial<Complaint>): Promise<Complaint> {
	const body = {
		...input,
		reporter: input.citizenId
	};
	const res = await fetchAPI('/complaints', {
		method: 'POST',
		body: JSON.stringify(body)
	});
	return mapComplaint(res);
}

export async function listCitizenComplaints(citizenId: string): Promise<Complaint[]> {
	const res = await fetchAPI(`/complaints?reporter=${citizenId}`);
	return res.map(mapComplaint);
}

export async function getComplaintById(id: string): Promise<Complaint | undefined> {
	try {
		const res = await fetchAPI(`/complaints/${id}`);
		return mapComplaint(res);
	} catch {
		return undefined;
	}
}

export async function updateComplaintStatus(id: string, updates: { status: ComplaintStatus; workerNote?: string; supervisorNote?: string }): Promise<Complaint | undefined> {
	const res = await fetchAPI(`/complaints/${id}`, {
		method: 'PUT',
		body: JSON.stringify(updates)
	});
	return mapComplaint(res);
}

export async function listDepartmentComplaints(department: string): Promise<Complaint[]> {
	const res = await fetchAPI(`/complaints?department=${department}`);
	return res.map(mapComplaint);
}

export async function assignSupervisor(complaintId: string, supervisor: string): Promise<Complaint | undefined> {
	const res = await fetchAPI(`/complaints/${complaintId}`, {
		method: 'PUT',
		body: JSON.stringify({ supervisor, status: 'In Progress' })
	});
	return mapComplaint(res);
}

export async function listSupervisorComplaints(supervisor: string): Promise<Complaint[]> {
	const res = await fetchAPI(`/complaints?supervisor=${supervisor}`);
	return res.map(mapComplaint);
}

export async function assignWorker(complaintId: string, worker: string): Promise<Complaint | undefined> {
	const res = await fetchAPI(`/complaints/${complaintId}`, {
		method: 'PUT',
		body: JSON.stringify({ worker, status: 'In Progress' })
	});
	return mapComplaint(res);
}

export async function listWorkerTasks(worker: string): Promise<Complaint[]> {
	const res = await fetchAPI(`/complaints?worker=${worker}`);
	return res.map(mapComplaint);
}

export async function getNotifications(): Promise<Notification[]> {
	return fetchAPI('/notifications');
}

export async function markNotificationAsRead(id: string): Promise<Notification> {
	return fetchAPI(`/notifications/${id}/read`, { method: 'PUT' });
}

export async function markAllNotificationsAsRead(): Promise<void> {
	return fetchAPI('/notifications/read-all', { method: 'PUT' });
}
