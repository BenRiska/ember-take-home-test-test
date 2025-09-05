'use client';

import { useState, useEffect } from 'react';
import { useAssets } from '@/hooks/useAssets';
import { format } from 'date-fns';
import DatePicker from './DatePicker';
import AssetTable from './AssetTable';


export default function DepreciationTracker() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setSelectedDate(format(new Date(), 'yyyy-MM-dd'));
    setIsClient(true);
  }, []);

  const { assets, loading, error } = useAssets(selectedDate || '');

  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Depreciation Tracker</h1>

        <DatePicker
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        {!isClient ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : (
          <AssetTable
            assets={assets}
            loading={loading}
            error={error}
            selectedDate={selectedDate}
          />
        )}
      </div>
    </div>
  );
}
