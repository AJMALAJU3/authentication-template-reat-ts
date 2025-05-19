import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Mail, ArrowLeft } from 'lucide-react';

import AuthLayout from '@/components/auth/AuthLayout';
import AuthCard from '@/components/auth/AuthCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from '@/hooks/useForm';
import { ForgotPasswordRequest } from '@/types/auth';

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { forgotPassword, isLoading, error, clearError } = useAuth();
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const initialValues: ForgotPasswordRequest = {
    email: '',
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm({
    initialValues,
    schema: forgotPasswordSchema,
    onSubmit: async (values) => {
      await forgotPassword(values);
      setIsSubmitted(true);
    },
  });

  // Clear auth errors when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  return (
    <AuthLayout title="Reset your password" subtitle="Enter your email to receive a password reset link">
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
                If your email address exists in our database, you will receive a password recovery link at your email address.
              </p>
            </div>
            <Button 
              variant="primary" 
              fullWidth
              onClick={() => navigate('/login')}
            >
              Return to login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              required
              autoFocus
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading || isSubmitting}
            >
              Send Reset Link
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

export default ForgotPasswordPage;