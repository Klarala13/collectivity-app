import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user) => set({ user }),

  setToken: async (token) => {
    await AsyncStorage.setItem('authToken', token);
    set({ token, isAuthenticated: true });
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      // TODO: Replace with actual API call
      // For now, simulate login
      console.log('Login attempt:', email);
      
      // Simulated response
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: email,
      };
      const mockToken = 'mock-jwt-token-12345';

      await AsyncStorage.setItem('authToken', mockToken);
      set({ 
        user: mockUser, 
        token: mockToken, 
        isAuthenticated: true,
        isLoading: false 
      });
    } catch (error) {
      console.error('Login error:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true });
    try {
      // TODO: Replace with actual API call
      console.log('Register attempt:', name, email);
      
      // Simulated response
      const mockUser = {
        id: 1,
        name: name,
        email: email,
      };
      const mockToken = 'mock-jwt-token-12345';

      await AsyncStorage.setItem('authToken', mockToken);
      set({ 
        user: mockUser, 
        token: mockToken, 
        isAuthenticated: true,
        isLoading: false 
      });
    } catch (error) {
      console.error('Register error:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('authToken');
    set({ 
      user: null, 
      token: null, 
      isAuthenticated: false 
    });
  },

  loadToken: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        // TODO: Validate token with backend
        // For now, just set it as authenticated
        set({ 
          token, 
          isAuthenticated: true 
        });
      }
    } catch (error) {
      console.error('Error loading token:', error);
    }
  },
}));
