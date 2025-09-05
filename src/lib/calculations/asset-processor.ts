/**
 * Asset processing utilities
 * Handles filtering and processing of assets with depreciation calculations
 */

import { RawAsset, AssetWithDepreciation, DepreciationMethod } from '../types';
import { calculateStraightLineDepreciation } from './straight-line-depreciation';
import { calculateReducingBalanceDepreciation } from './reducing-balance-depreciation';

/**
 * Process an array of raw assets and calculate depreciation for each
 * Filters out assets purchased after the calculation date
 * @param assets - Array of raw assets from JSON to process
 * @param calculationDate - Date to calculate depreciation up to (ISO format)
 * @returns Array of assets with calculated depreciation (only assets purchased on or before calculation date)
 */
export function processAssetsWithDepreciation(
  assets: RawAsset[],
  calculationDate: string
): AssetWithDepreciation[] {
  return assets
    .filter((asset) => asset.purchaseDate <= calculationDate) // Only include assets purchased on or before calculation date
    .map((asset) => {
      const depreciationMethod = asset.depreciationMethod as DepreciationMethod;
      let depreciation;

      if (depreciationMethod === 'straight-line') {
        depreciation = calculateStraightLineDepreciation(
          asset.purchaseAmount,
          asset.purchaseDate,
          calculationDate
        );
      } else {
        depreciation = calculateReducingBalanceDepreciation(
          asset.purchaseAmount,
          asset.purchaseDate,
          calculationDate
        );
      }

      return {
        assetName: asset.assetName,
        purchaseDate: asset.purchaseDate,
        purchaseAmount: asset.purchaseAmount,
        depreciationMethod: depreciationMethod,
        depreciation
      };
    });
}
