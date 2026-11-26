import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getToken, removeToken, saveToken } from '../api/client.ts';
import { authApi } from './authApi.ts';
import { LoginRequest, RegisterRequest, User } from './types.ts';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (request: LoginRequest) => Promise<User>;
  register: (request: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
  }, []);

  const restoreUser = useCallback(async () => {
    const currentUser = await authApi.getMe();
    setUser(currentUser);
    return currentUser;
  }, []);

  useEffect(() => {
    if (!getToken()) {
      setIsLoading(false);
      return;
    }

    restoreUser()
      .catch(logout)
      .finally(() => setIsLoading(false));
  }, [logout, restoreUser]);

  const login = useCallback(async (request: LoginRequest) => {
    const response = await authApi.login(request);
    saveToken(response.accessToken);
    localStorage.setItem('expiresAt', response.expiresAt);

    try {
      return await restoreUser();
    } catch (error) {
      logout();
      throw error;
    }
  }, [logout, restoreUser]);

  const register = useCallback(async (request: RegisterRequest) => {
    await authApi.register(request);
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    register,
    logout,
  }), [isLoading, login, logout, register, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
};
