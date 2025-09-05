import { useState, useEffect } from 'react';
import { AssetWithDepreciation, AssetsApiResponse } from '@/lib/types';

interface UseAssetsReturn {
  assets: AssetWithDepreciation[];
  loading: boolean;
  error: string | null;
  refetch: (date: string) => void;
}

export function useAssets(selectedDate: string): UseAssetsReturn {
  const [assets, setAssets] = useState<AssetWithDepreciation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssets = async (date: string) => {
    try {
      setLoading(true);
      setError(null);

      const url = new URL('/api/assets', window.location.origin);
      url.searchParams.set('date', date);

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error('Failed to fetch assets');
      }

      const data: AssetsApiResponse = await response.json();
      setAssets(data.assets);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error fetching assets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAssets(selectedDate);
    }
  }, [selectedDate]);

  return {
    assets,
    loading,
    error,
    refetch: fetchAssets,
  };
}
