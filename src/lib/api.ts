const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const STORAGE_KEY = 'ngoconnect_auth';

export type UserRole = 'admin' | 'volunteer' | 'donor';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface AuthPayload {
  token: string;
  user: AuthUser;
}

interface RequestOptions extends RequestInit {
  authToken?: string;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { authToken, headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data as T;
}

export const api = {
  auth: {
    register: (payload: { email: string; password: string; role: UserRole; name?: string }) =>
      request<AuthPayload & { message: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    login: (payload: { email: string; password: string }) =>
      request<AuthPayload & { message: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
  },
  campaigns: {
    list: () => request<any[]>('/campaigns'),
    create: (payload: any, token: string) =>
      request<any>('/campaigns', {
        method: 'POST',
        authToken: token,
        body: JSON.stringify(payload),
      }),
    update: (id: string, payload: any, token: string) =>
      request<any>(`/campaigns/${id}`, {
        method: 'PATCH',
        authToken: token,
        body: JSON.stringify(payload),
      }),
  },
  volunteers: {
    list: () => request<any[]>('/volunteers'),
    create: (payload: any, token?: string) =>
      request<any>('/volunteers', {
        method: 'POST',
        authToken: token,
        body: JSON.stringify(payload),
      }),
    approve: (id: string, token: string) =>
      request<any>(`/volunteers/${id}/approve`, {
        method: 'PATCH',
        authToken: token,
      }),
  },
  donations: {
    list: () => request<any[]>('/donations'),
    create: (payload: any, token?: string) =>
      request<any>('/donations', {
        method: 'POST',
        authToken: token,
        body: JSON.stringify(payload),
      }),
  },
  cases: {
    list: () => request<any[]>('/cases'),
    create: (payload: any, token: string) =>
      request<any>('/cases', {
        method: 'POST',
        authToken: token,
        body: JSON.stringify(payload),
      }),
    updateStatus: (id: string, payload: { status: string }, token: string) =>
      request<any>(`/cases/${id}/status`, {
        method: 'PATCH',
        authToken: token,
        body: JSON.stringify(payload),
      }),
  },
  events: {
    list: () => request<any[]>('/events'),
    create: (payload: any, token: string) =>
      request<any>('/events', {
        method: 'POST',
        authToken: token,
        body: JSON.stringify(payload),
      }),
    join: (id: string, payload: { participantName: string; participantEmail: string }) =>
      request<any>(`/events/${id}/join`, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
  },
  organizations: {
    list: () => request<any[]>('/organizations'),
    create: (payload: any, token: string) =>
      request<any>('/organizations', {
        method: 'POST',
        authToken: token,
        body: JSON.stringify(payload),
      }),
  },
  analytics: {
    overview: () => request<any>('/analytics/overview'),
  },
  notifications: {
    list: (audience?: string) => request<any[]>(`/notifications${audience ? `?audience=${audience}` : ''}`),
  },
  public: {
    overview: () => request<any>('/public/overview'),
    donorReport: (email: string) => request<any>(`/public/donor-report?email=${encodeURIComponent(email)}`),
  },
};

export function saveAuth(auth: AuthPayload) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
}

export function getSavedAuth(): AuthPayload | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthPayload;
  } catch {
    return null;
  }
}

export function clearSavedAuth() {
  localStorage.removeItem(STORAGE_KEY);
}
