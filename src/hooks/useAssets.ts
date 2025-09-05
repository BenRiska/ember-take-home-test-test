import { useState, useEffect } from 'react';
import { Asset } from '@/lib/types';

interface UseAssetsReturn {
  assets: Asset[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useAssets(): UseAssetsReturn {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/assets');
      if (!response.ok) {
        throw new Error('Failed to fetch assets');
      }

      const data = await response.json();
      setAssets(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error fetching assets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return {
    assets,
    loading,
    error,
    refetch: fetchAssets,
  };
}
