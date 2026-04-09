import { useState, useCallback } from 'react';
import { guidesAPI } from '../services/api';
import toast from 'react-hot-toast';

const useGuides = () => {
  const [guides, setGuides] = useState([]);
  const [pagination, setPagination] = useState({});
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchGuides = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const res = await guidesAPI.getAll(params);
      setGuides(res.data.guides);
      setPagination(res.data.pagination);
    } catch (error) {
      toast.error('Failed to fetch guides.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const res = await guidesAPI.getStats();
      setStats(res.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  }, []);

  const deleteGuide = useCallback(async (id) => {
    try {
      await guidesAPI.delete(id);
      setGuides((prev) => prev.filter((g) => g._id !== id));
      toast.success('Guide deleted successfully.');
      return true;
    } catch (error) {
      toast.error('Failed to delete guide.');
      return false;
    }
  }, []);

  const togglePublic = useCallback(async (id) => {
    try {
      const res = await guidesAPI.togglePublic(id);
      setGuides((prev) =>
        prev.map((g) => (g._id === id ? { ...g, isPublic: res.data.guide.isPublic } : g))
      );
      toast.success(res.data.message);
      return res.data.guide;
    } catch (error) {
      toast.error('Failed to update guide visibility.');
      return null;
    }
  }, []);

  const updateGuide = useCallback(async (id, data) => {
    try {
      const res = await guidesAPI.update(id, data);
      setGuides((prev) =>
        prev.map((g) => (g._id === id ? { ...g, ...res.data.guide } : g))
      );
      toast.success('Guide updated successfully.');
      return true;
    } catch (error) {
      toast.error('Failed to update guide.');
      return false;
    }
  }, []);

  return {
    guides,
    pagination,
    stats,
    loading,
    fetchGuides,
    fetchStats,
    deleteGuide,
    togglePublic,
    updateGuide,
  };
};

export default useGuides;
