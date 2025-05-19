import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { Lock, ArrowLeft } from 'lucide-react';

import AuthLayout from '@/components/auth/AuthLayout';
import AuthCard from '@/components/auth/AuthCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useForm } from '@/hooks/useForm';
import { ResetPasswordRequest } from '@/types/auth';
import { resetPassword } from '@/services/auth';

// Validation schema
const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Please confirm your password'),
  token: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  // Get token from URL query params
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token') || '';

  const initialValues: ResetPasswordRequest = {
    password: '',
    confirmPassword: '',
    token,
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm({
    initialValues,
    schema: resetPasswordSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setError(null);
        await resetPassword(values);
        setIsSubmitted(true);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Redirect if no token provided
  useEffect(() => {
    if (!token) {
      navigate('/forgot-password');
    }
  }, [token, navigate]);

  return (
    <AuthLayout title="Set a new password" subtitle="Create a strong password for your account">
      <AuthCard>
        {error && (
          <div className="mb-4 p-3 rounded bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        {isSubmitted ? (
          <div className="space-y-4">
            <div className="p-4 rounded-md bg-green-50 text-green-700">
              <p className="text-center">
                Your password has been reset successfully!
              </p>
            </div>
            <Button 
              variant="primary" 
              fullWidth
              onClick={() => navigate('/login')}
            >
              Sign in with new password
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="New Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              required
              autoFocus
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={values.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              required
            />

            <input type="hidden" name="token" value={token} />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading || isSubmitting}
            >
              Reset Password
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default ResetPasswordPage;