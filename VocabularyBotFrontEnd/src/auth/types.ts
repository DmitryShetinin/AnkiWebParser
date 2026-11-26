export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  username: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresAt: string;
}
