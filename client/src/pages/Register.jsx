import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 shadow-xl shadow-primary-500/20 overflow-hidden">
            <img src="/onboard logo.jpeg" alt="OnboardAI Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="text-surface-400 text-sm mt-1">Get started with OnboardAI for free</p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-8">
          <RegisterForm onSuccess={() => navigate('/dashboard')} />
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
