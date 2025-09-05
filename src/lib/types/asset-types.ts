export type DepreciationMethod = 'straight-line' | 'reducing-balance';

/**
 * Raw asset data as it comes from JSON (depreciationMethod is a string)
 */
export interface RawAsset {
  assetName: string;
  purchaseDate: string; // ISO date string (YYYY-MM-DD)
  purchaseAmount: number;
  depreciationMethod: string; // Raw string from JSON
}

/**
 * Processed asset data with typed depreciationMethod
 */
export interface Asset {
  assetName: string;
  purchaseDate: string; // ISO date string (YYYY-MM-DD)
  purchaseAmount: number;
  depreciationMethod: DepreciationMethod;
}

export interface DepreciationCalculation {
  inYearExpense: number; // Calculated in-year depreciation expense up to and including the selected date
  accumulatedDepreciation: number; // Calculated accumulated depreciation up to and including the selected date
  netBookValue: number; // Calculated net book value as at the end of the selected date
}

export interface AssetWithDepreciation extends Asset {
  depreciation: DepreciationCalculation;
}

export interface AssetsApiResponse {
  assets: AssetWithDepreciation[];
  calculationDate: string | null;
}
