import React from 'react';
import { Link } from 'react-router-dom';
import { Fingerprint } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title, 
  subtitle = "Welcome back" 
}) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center justify-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white mb-4 transition-transform hover:scale-105">
                <Fingerprint size={24} />
              </div>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
            <p className="mt-2 text-gray-600">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>

      {/* Right Side - Image (hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" 
           style={{ 
             backgroundImage: `url('https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
           }}>
        <div className="h-full w-full bg-black bg-opacity-20 backdrop-blur-sm flex flex-col justify-center items-center p-12">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Secure &amp; Beautiful Authentication</h2>
            <p className="text-white text-opacity-90">A modern authentication system with a focus on user experience and security.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;