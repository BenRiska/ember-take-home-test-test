import { processAssetsWithDepreciation } from '../asset-processor';
import { calculateStraightLineDepreciation } from '../straight-line-depreciation';
import { calculateReducingBalanceDepreciation } from '../reducing-balance-depreciation';
import { RawAsset } from '../../types';

// Mock the depreciation calculation functions
jest.mock('../straight-line-depreciation');
jest.mock('../reducing-balance-depreciation');

const mockCalculateStraightLineDepreciation = calculateStraightLineDepreciation as jest.MockedFunction<typeof calculateStraightLineDepreciation>;
const mockCalculateReducingBalanceDepreciation = calculateReducingBalanceDepreciation as jest.MockedFunction<typeof calculateReducingBalanceDepreciation>;

describe('processAssetsWithDepreciation', () => {
  const mockAssets: RawAsset[] = [
    {
      assetName: 'Laptop A',
      purchaseDate: '2020-04-15',
      purchaseAmount: 1200,
      depreciationMethod: 'straight-line'
    },
    {
      assetName: 'Forklift',
      purchaseDate: '2020-01-03',
      purchaseAmount: 24000,
      depreciationMethod: 'reducing-balance'
    },
    {
      assetName: 'Printer',
      purchaseDate: '2021-06-01',
      purchaseAmount: 500,
      depreciationMethod: 'straight-line'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock returns
    mockCalculateStraightLineDepreciation.mockReturnValue({
      inYearExpense: 100,
      accumulatedDepreciation: 200,
      netBookValue: 1000
    });

    mockCalculateReducingBalanceDepreciation.mockReturnValue({
      inYearExpense: 500,
      accumulatedDepreciation: 1000,
      netBookValue: 23000
    });
  });

  it('should process all assets and calculate depreciation', () => {
    const result = processAssetsWithDepreciation(mockAssets, '2023-12-31');

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({
      assetName: 'Laptop A',
      purchaseDate: '2020-04-15',
      purchaseAmount: 1200,
      depreciationMethod: 'straight-line',
      depreciation: {
        inYearExpense: 100,
        accumulatedDepreciation: 200,
        netBookValue: 1000
      }
    });
  });

  it('should call correct depreciation function for straight-line assets', () => {
    processAssetsWithDepreciation(mockAssets, '2023-12-31');

    expect(mockCalculateStraightLineDepreciation).toHaveBeenCalledWith(
      1200,
      '2020-04-15',
      '2023-12-31'
    );
    expect(mockCalculateStraightLineDepreciation).toHaveBeenCalledWith(
      500,
      '2021-06-01',
      '2023-12-31'
    );
  });

  it('should call correct depreciation function for reducing-balance assets', () => {
    processAssetsWithDepreciation(mockAssets, '2023-12-31');

    expect(mockCalculateReducingBalanceDepreciation).toHaveBeenCalledWith(
      24000,
      '2020-01-03',
      '2023-12-31'
    );
  });

  it('should filter out assets purchased after calculation date', () => {
    const assetsWithFuturePurchase: RawAsset[] = [
      ...mockAssets,
      {
        assetName: 'Future Asset',
        purchaseDate: '2024-01-01',
        purchaseAmount: 1000,
        depreciationMethod: 'straight-line'
      }
    ];

    const result = processAssetsWithDepreciation(assetsWithFuturePurchase, '2023-12-31');

    expect(result).toHaveLength(3);
    expect(result.find(asset => asset.assetName === 'Future Asset')).toBeUndefined();
  });

  it('should include assets purchased on the calculation date', () => {
    const assetsWithSameDate: RawAsset[] = [
      ...mockAssets,
      {
        assetName: 'Same Date Asset',
        purchaseDate: '2023-12-31',
        purchaseAmount: 1000,
        depreciationMethod: 'straight-line'
      }
    ];

    const result = processAssetsWithDepreciation(assetsWithSameDate, '2023-12-31');

    expect(result).toHaveLength(4);
    expect(result.find(asset => asset.assetName === 'Same Date Asset')).toBeDefined();
  });

  it('should handle empty assets array', () => {
    const result = processAssetsWithDepreciation([], '2023-12-31');

    expect(result).toHaveLength(0);
    expect(mockCalculateStraightLineDepreciation).not.toHaveBeenCalled();
    expect(mockCalculateReducingBalanceDepreciation).not.toHaveBeenCalled();
  });
});
