import { calculateStraightLineDepreciation } from '../straight-line-depreciation';

describe('calculateStraightLineDepreciation', () => {
  it('should return zero depreciation if calculation date is before purchase date', () => {
    const result = calculateStraightLineDepreciation(
      1000,
      '2023-01-01',
      '2022-12-31'
    );

    expect(result).toEqual({
      inYearExpense: 0,
      accumulatedDepreciation: 0,
      netBookValue: 1000
    });
  });

  it('should calculate depreciation for a full year', () => {
    const result = calculateStraightLineDepreciation(
      1000,
      '2020-01-01',
      '2020-12-31'
    );

    expect(result.inYearExpense).toBe(200.33);
    expect(result.accumulatedDepreciation).toBe(200.33);
    expect(result.netBookValue).toBe(799.67);
  });

  it('should calculate depreciation for partial year', () => {
    const result = calculateStraightLineDepreciation(
      1000,
      '2020-06-01',
      '2020-12-31'
    );

    expect(result.inYearExpense).toBe(117.2);
    expect(result.accumulatedDepreciation).toBe(117.2);
    expect(result.netBookValue).toBe(882.8);
  });

  it('should handle assets that have fully depreciated', () => {
    const result = calculateStraightLineDepreciation(
      1000,
      '2015-01-01',
      '2023-12-31'
    );

    expect(result.inYearExpense).toBe(0);
    expect(result.accumulatedDepreciation).toBe(1000);
    expect(result.netBookValue).toBe(0);
  });

  it('should use custom useful life when provided', () => {
    const result = calculateStraightLineDepreciation(
      1000,
      '2020-01-01',
      '2021-12-31',
      2 // 2 year useful life
    );

    expect(result.inYearExpense).toBe(499.32);
    expect(result.accumulatedDepreciation).toBe(1000);
    expect(result.netBookValue).toBe(0);
  });

  it('should return rounded values', () => {
    const result = calculateStraightLineDepreciation(
      1200,
      '2020-04-15',
      '2020-12-31'
    );

    expect(result.inYearExpense).toBe(171.52);
    expect(result.accumulatedDepreciation).toBe(171.52);
    expect(result.netBookValue).toBe(1028.48);
  });
});
