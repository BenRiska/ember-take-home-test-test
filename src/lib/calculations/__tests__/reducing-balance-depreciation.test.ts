import { calculateReducingBalanceDepreciation } from '../reducing-balance-depreciation';

describe('calculateReducingBalanceDepreciation', () => {
  it('should return zero depreciation if calculation date is before purchase date', () => {
    const result = calculateReducingBalanceDepreciation(
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
    const result = calculateReducingBalanceDepreciation(
      1000,
      '2020-01-01',
      '2020-12-31'
    );

    expect(result.inYearExpense).toBe(200);
    expect(result.accumulatedDepreciation).toBe(200);
    expect(result.netBookValue).toBe(800);
  });

  it('should calculate depreciation for partial year', () => {
    const result = calculateReducingBalanceDepreciation(
      1000,
      '2020-06-01',
      '2020-12-31'
    );

    expect(result.inYearExpense).toBe(116.94);
    expect(result.accumulatedDepreciation).toBe(116.94);
    expect(result.netBookValue).toBe(883.06);
  });

  it('should compound depreciation over multiple years', () => {
    const result = calculateReducingBalanceDepreciation(
      1000,
      '2020-01-01',
      '2021-12-31'
    );

    expect(result.inYearExpense).toBe(160);
    expect(result.accumulatedDepreciation).toBe(360);
    expect(result.netBookValue).toBe(640);
  });

  it('should use custom rate when provided', () => {
    const result = calculateReducingBalanceDepreciation(
      1000,
      '2020-01-01',
      '2020-12-31',
      0.1 // 10% rate
    );

    expect(result.inYearExpense).toBe(100);
    expect(result.accumulatedDepreciation).toBe(100);
    expect(result.netBookValue).toBe(900);
  });

  it('should return rounded values', () => {
    const result = calculateReducingBalanceDepreciation(
      1200,
      '2020-04-15',
      '2020-12-31'
    );

    expect(result.inYearExpense).toBe(171.15);
    expect(result.accumulatedDepreciation).toBe(171.15);
    expect(result.netBookValue).toBe(1028.85);
  });
});
