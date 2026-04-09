import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users, BarChart3, CheckCircle2, Clock, Circle,
  Search, Eye, TrendingUp, Building2, Briefcase, Filter
} from 'lucide-react';
import { guidesAPI } from '../services/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [overview, setOverview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await guidesAPI.getManagerOverview();
        setOverview(res.data.overview);
      } catch (error) {
        console.error('Failed to load manager overview:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, []);

  const filtered = overview.filter((guide) => {
    const matchesSearch =
      !searchQuery ||
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.assignedTo?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'complete' && guide.progress.percentage === 100) ||
      (statusFilter === 'in_progress' && guide.progress.percentage > 0 && guide.progress.percentage < 100) ||
      (statusFilter === 'not_started' && guide.progress.percentage === 0);

    return matchesSearch && matchesStatus;
  });

  const totalTasks = overview.reduce((sum, g) => sum + g.progress.total, 0);
  const totalCompleted = overview.reduce((sum, g) => sum + g.progress.completed, 0);
  const totalInProgress = overview.reduce((sum, g) => sum + g.progress.inProgress, 0);
  const overallPercentage = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner text="Loading manager dashboard..." />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-1">
          <Users size={28} className="inline mr-2 text-primary-400" />
          Manager Dashboard
        </h1>
        <p className="text-surface-400">
          Track onboarding progress across all new hires
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: 'Total Guides',
            value: overview.length,
            icon: BarChart3,
            color: 'from-primary-500 to-indigo-600',
            bg: 'bg-primary-500/10',
          },
          {
            label: 'Total Tasks',
            value: totalTasks,
            icon: CheckCircle2,
            color: 'from-green-500 to-emerald-600',
            bg: 'bg-green-500/10',
          },
          {
            label: 'In Progress',
            value: totalInProgress,
            icon: Clock,
            color: 'from-yellow-500 to-amber-600',
            bg: 'bg-yellow-500/10',
          },
          {
            label: 'Overall Progress',
            value: `${overallPercentage}%`,
            icon: TrendingUp,
            color: 'from-purple-500 to-pink-600',
            bg: 'bg-purple-500/10',
          },
        ].map((stat, index) => (
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
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-surface-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
          <input
            type="text"
            placeholder="Search by title, role, or assignee..."
            className="input-field !py-2 !pl-9 !pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter size={14} className="text-surface-500" />
          {['all', 'not_started', 'in_progress', 'complete'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                statusFilter === status
                  ? 'bg-primary-500/15 text-primary-300 border border-primary-500/30'
                  : 'text-surface-500 hover:text-surface-300 hover:bg-surface-800'
              }`}
            >
              {status === 'all' ? 'All' : status === 'not_started' ? 'Not Started' : status === 'in_progress' ? 'In Progress' : 'Complete'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Guides Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card overflow-hidden"
      >
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <BarChart3 size={48} className="text-surface-700 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-surface-400 mb-2">No guides found</h3>
            <p className="text-sm text-surface-600">
              {overview.length === 0
                ? 'Generate some guides first, then generate checklists to track progress here.'
                : 'No guides match your filters.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-700/50 bg-surface-800/30">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider">Guide</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider">Assigned To</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider">Progress</th>
                  <th className="px-5 py-3.5 text-center text-xs font-semibold text-surface-400 uppercase tracking-wider">Tasks</th>
                  <th className="px-5 py-3.5 text-center text-xs font-semibold text-surface-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-800/50">
                {filtered.map((guide, idx) => (
                  <motion.tr
                    key={guide._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="hover:bg-surface-800/20 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-white">{guide.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {guide.role && (
                            <span className="flex items-center gap-1 text-xs text-surface-500">
                              <Briefcase size={10} /> {guide.role}
                            </span>
                          )}
                          {guide.department && (
                            <span className="flex items-center gap-1 text-xs text-surface-500">
                              <Building2 size={10} /> {guide.department}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-surface-300">
                        {guide.assignedTo || '—'}
                      </span>
                    </td>
                    <td className="px-5 py-4 min-w-[200px]">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-surface-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              guide.progress.percentage === 100
                                ? 'bg-green-500'
                                : guide.progress.percentage > 50
                                ? 'bg-primary-500'
                                : guide.progress.percentage > 0
                                ? 'bg-yellow-500'
                                : 'bg-surface-700'
                            }`}
                            style={{ width: `${guide.progress.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-surface-400 w-10 text-right">
                          {guide.progress.percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="flex items-center gap-1 text-xs">
                          <Circle size={8} className="text-surface-500" />
                          {guide.progress.notStarted}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-yellow-400">
                          <Clock size={8} />
                          {guide.progress.inProgress}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-green-400">
                          <CheckCircle2 size={8} />
                          {guide.progress.completed}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => navigate(`/guide/${guide._id}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary-400 bg-primary-500/10 rounded-lg hover:bg-primary-500/20 transition-colors"
                      >
                        <Eye size={13} /> View
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ManagerDashboard;
