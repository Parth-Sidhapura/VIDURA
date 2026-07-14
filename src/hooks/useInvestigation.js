import { useState } from 'react';
import { analyzeCase } from '../services/api';

export const useInvestigation = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeCase(formData);
      setAnalysis(data);
      return data;
    } catch (err) {
      const message = err.response?.data?.detail || err.message || 'Analysis failed. Please check your connection.';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setAnalysis(null);
    setError(null);
  };

  return { analysis, loading, error, analyze, reset };
};
