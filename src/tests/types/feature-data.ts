/**
 * TypeScript interfaces for data structures from Gherkin feature files
 */

/**
 * Asset data structure from the Background table in the feature file
 */
export interface FeatureAsset {
  assetName: string;
  purchaseDate: string;
  purchaseAmount: number;
  depreciationMethod: string;
}

/**
 * Expected result data structure from the Then table in the feature file
 */
export interface ExpectedDepreciationResult {
  Asset: string;
  Cost: number;
  'Accumulated Depreciation': number;
  'In Year Depreciation': number;
  'Net Book Value': number;
}

/**
 * Raw table row from Gherkin table (before parsing)
 */
export interface RawTableRow {
  [key: string]: string;
}
