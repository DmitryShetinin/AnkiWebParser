import { apiClient } from '../api/client.ts';
import { LoginRequest, LoginResponse, RegisterRequest, User } from './types.ts';

export const authApi = {
  async login(request: LoginRequest): Promise<LoginResponse> {
    const { data } = await apiClient.post<LoginResponse>('/api/auth/login', request);
    return data;
  },

  async register(request: RegisterRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/api/auth/register', request);
    return data;
  },

  async getMe(): Promise<User> {
    const { data } = await apiClient.get<User>('/api/auth/me');
    return data;
  },
};
