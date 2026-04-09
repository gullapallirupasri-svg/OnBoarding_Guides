import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Building2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RegisterForm = ({ onSuccess }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', companyName: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    else if (formData.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
    if (!formData.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email format';
    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const result = await register(formData.name, formData.email, formData.password, formData.companyName);
    if (result.success && onSuccess) onSuccess();
    setLoading(false);
  };

  const update = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        id="register-name"
        label="Full Name"
        type="text"
        placeholder="John Doe"
        icon={User}
        value={formData.name}
        onChange={(e) => update('name', e.target.value)}
        error={errors.name}
      />

      <Input
        id="register-email"
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        icon={Mail}
        value={formData.email}
        onChange={(e) => update('email', e.target.value)}
        error={errors.email}
      />

      <Input
        id="register-company"
        label="Company Name (Optional)"
        type="text"
        placeholder="Acme Inc."
        icon={Building2}
        value={formData.companyName}
        onChange={(e) => update('companyName', e.target.value)}
      />

      <div>
        <label className="input-label" htmlFor="register-password">Password</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
            <Lock size={18} />
          </div>
          <input
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Min. 6 characters"
            className={`input-field pl-10 pr-10 ${errors.password ? 'border-red-500/50' : ''}`}
            value={formData.password}
            onChange={(e) => update('password', e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>}
      </div>

      <Input
        id="register-confirm"
        label="Confirm Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Repeat your password"
        icon={Lock}
        value={formData.confirmPassword}
        onChange={(e) => update('confirmPassword', e.target.value)}
        error={errors.confirmPassword}
      />

      <Button type="submit" loading={loading} className="w-full">
        Create Account
      </Button>

      <p className="text-center text-sm text-surface-500">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
          Sign In
        </Link>
      </p>
    </motion.form>
  );
};

export default RegisterForm;
