export type DepreciationMethod = 'straight-line' | 'reducing-balance';

export interface Asset {
  assetName: string;
  purchaseDate: string; // ISO date string (YYYY-MM-DD)
  purchaseAmount: number;
  depreciationMethod: DepreciationMethod;
}

export interface DepreciationCalculation {
  inYearExpense: number;
  accumulatedDepreciation: number;
  netBookValue: number;
}

export interface AssetWithDepreciation extends Asset {
  depreciation: DepreciationCalculation;
}
