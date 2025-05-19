import { LoginRequest, RegisterRequest, AuthResponse, ForgotPasswordRequest, ResetPasswordRequest } from '@/types/auth';

// Mock API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://source.unsplash.com/100x100/?portrait'
};

// Mock token
const mockToken = 'mock-jwt-token';

/**
 * Login user
 */
export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  // Simulate API call
  await delay(1000);
  
  // In a real app, this would be an actual API call
  if (credentials.email === 'error@example.com') {
    throw new Error('Invalid credentials');
  }

  // Return mock response
  return {
    user: mockUser,
    token: mockToken
  };
};

/**
 * Register user
 */
export const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
  // Simulate API call
  await delay(1000);
  
  // In a real app, this would be an actual API call
  if (userData.email === 'exists@example.com') {
    throw new Error('User already exists');
  }

  // Return mock response
  return {
    user: {
      ...mockUser,
      name: userData.name,
      email: userData.email
    },
    token: mockToken
  };
};

/**
 * Forgot password
 */
export const forgotPassword = async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
  // Simulate API call
  await delay(1000);
  
  // In a real app, this would be an actual API call
  if (data.email === 'nonexistent@example.com') {
    throw new Error('User not found');
  }

  // Return mock response
  return {
    message: 'Password reset email sent'
  };
};

/**
 * Reset password
 */
export const resetPassword = async (data: ResetPasswordRequest): Promise<{ message: string }> => {
  // Simulate API call
  await delay(1000);
  
  // In a real app, this would be an actual API call
  if (data.token === 'invalid-token') {
    throw new Error('Invalid or expired token');
  }

  // Return mock response
  return {
    message: 'Password has been reset successfully'
  };
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  // Simulate API call
  await delay(500);
  
  // In a real app, this might invalidate the token on the server
  return;
};