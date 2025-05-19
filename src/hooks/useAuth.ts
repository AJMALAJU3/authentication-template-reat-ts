import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
// import { login, register, logout, forgotPassword, clearError } from '@/features/auth/authSlice';
import { login, register, logout, forgotPassword, clearError } from '@/features/auth/authSlice'
import { LoginRequest, RegisterRequest, ForgotPasswordRequest } from '@/types/auth';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login: (credentials: LoginRequest) => dispatch(login(credentials)),
    register: (userData: RegisterRequest) => dispatch(register(userData)),
    forgotPassword: (data: ForgotPasswordRequest) => dispatch(forgotPassword(data)),
    logout: () => dispatch(logout()),
    clearError: () => dispatch(clearError()),
  };
};