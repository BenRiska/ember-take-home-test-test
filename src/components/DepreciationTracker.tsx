'use client';

import { useState } from 'react';
import { useAssets } from '@/hooks/useAssets';

export default function DepreciationTracker() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const { assets, loading, error } = useAssets();

  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Depreciation Tracker</h1>
        <div className="mb-8">
          <label htmlFor="date-picker" className="block text-sm font-medium text-gray-700 mb-2">
            Calculate depreciation up to:
          </label>
          <input
            id="date-picker"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          />
        </div>
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Assets</h2>

          {loading && (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading assets...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <p className="text-red-800">Error: {error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <p className="text-gray-600 mb-4">
                {selectedDate
                  ? `Depreciation calculations for assets up to ${selectedDate}`
                  : 'Select a date to view depreciation calculations'
                }
              </p>

              {assets.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Asset Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Purchase Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Purchase Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Depreciation Method
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {assets.map((asset, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {asset.assetName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {asset.purchaseDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            £{asset.purchaseAmount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${asset.depreciationMethod === 'straight-line'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                              }`}>
                              {asset.depreciationMethod.replace('-', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No assets found.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
