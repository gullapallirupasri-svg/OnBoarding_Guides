import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, FileText, Wand2, BookTemplate, Search,
  TrendingUp, Calendar, Building2, ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import useGuides from '../hooks/useGuides';
import GuideCard from '../components/guides/GuideCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import OnboardingTour from '../components/tour/OnboardingTour';

const Dashboard = () => {
  const { user } = useAuth();
  const { guides, pagination, stats, loading, fetchGuides, fetchStats, deleteGuide, togglePublic } = useGuides();
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  useEffect(() => {
    fetchStats();
    fetchGuides();
  }, [fetchStats, fetchGuides]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchGuides({ search: searchQuery, department: departmentFilter });
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, departmentFilter, fetchGuides]);

  const statCards = [
    {
      label: 'Total Guides',
      value: stats?.totalGuides || 0,
      icon: FileText,
      color: 'from-primary-500 to-indigo-600',
      bg: 'bg-primary-500/10',
    },
    {
      label: 'Departments',
      value: stats?.departmentStats?.length || 0,
      icon: Building2,
      color: 'from-purple-500 to-pink-600',
      bg: 'bg-purple-500/10',
    },
    {
      label: 'This Month',
      value: stats?.recentGuides?.filter(g => {
        const d = new Date(g.createdAt);
        const now = new Date();
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })?.length || 0,
      icon: Calendar,
      color: 'from-green-500 to-emerald-600',
      bg: 'bg-green-500/10',
    },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Onboarding Tour */}
      <OnboardingTour />

      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-1">
          Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
        </h1>
        <p className="text-surface-400">
          {user?.companyName ? `${user.companyName} — ` : ''}Manage your onboarding guides
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8" data-tour="stats">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon size={20} className="text-primary-400" />
              </div>
              <TrendingUp size={16} className="text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-surface-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
      >
        <Link to="/generator" className="glass-card-hover p-5 flex items-center gap-4 group" data-tour="generate">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
            <Wand2 size={22} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white group-hover:text-primary-300 transition-colors">Generate New Guide</h3>
            <p className="text-sm text-surface-500">Create a personalized onboarding guide with AI</p>
          </div>
          <ArrowRight size={18} className="text-surface-600 group-hover:text-primary-400 transition-colors" />
        </Link>

        <Link to="/templates" className="glass-card-hover p-5 flex items-center gap-4 group" data-tour="templates">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <BookTemplate size={22} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white group-hover:text-primary-300 transition-colors">Browse Templates</h3>
            <p className="text-sm text-surface-500">Start from a pre-built template</p>
          </div>
          <ArrowRight size={18} className="text-surface-600 group-hover:text-primary-400 transition-colors" />
        </Link>
      </motion.div>

      {/* Guides List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Your Guides</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
              <input
                type="text"
                placeholder="Search guides..."
                className="input-field !py-2 !pl-9 !pr-4 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="input-field !py-2 !w-auto appearance-none cursor-pointer"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="">All Departments</option>
              {stats?.departmentStats?.map(d => (
                <option key={d._id} value={d._id}>{d._id || 'Unspecified'} ({d.count})</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="py-20">
            <LoadingSpinner text="Loading your guides..." />
          </div>
        ) : guides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guides.map((guide, index) => (
              <GuideCard
                key={guide._id}
                guide={guide}
                index={index}
                onDelete={deleteGuide}
                onTogglePublic={togglePublic}
              />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <Sparkles size={48} className="text-surface-700 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-surface-400 mb-2">No guides yet</h3>
            <p className="text-sm text-surface-600 mb-6">
              Create your first AI-powered onboarding guide
            </p>
            <Link to="/generator" className="btn-primary">
              <Wand2 size={16} className="mr-2 inline" />
              Generate Your First Guide
            </Link>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => fetchGuides({ search: searchQuery, department: departmentFilter, page })}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  pagination.page === page
                    ? 'bg-primary-500 text-white'
                    : 'bg-surface-800 text-surface-400 hover:bg-surface-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
