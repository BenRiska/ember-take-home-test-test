import { roundToCents } from '../number-utils';

describe('roundToCents', () => {
  it('should round to 2 decimal places', () => {
    expect(roundToCents(1.234)).toBe(1.23);
    expect(roundToCents(1.235)).toBe(1.24);
    expect(roundToCents(1.236)).toBe(1.24);
  });

  it('should handle numbers already at 2 decimal places', () => {
    expect(roundToCents(1.23)).toBe(1.23);
    expect(roundToCents(0.00)).toBe(0);
    expect(roundToCents(100.00)).toBe(100);
  });

  it('should handle financial calculations', () => {
    expect(roundToCents(1200.555)).toBe(1200.56);
    expect(roundToCents(171.516)).toBe(171.52);
    expect(roundToCents(5967.205)).toBe(5967.2);
  });

  it('should handle edge cases', () => {
    expect(roundToCents(0)).toBe(0);
    expect(roundToCents(0.004)).toBe(0);
    expect(roundToCents(0.005)).toBe(0.01);
    expect(roundToCents(-1.234)).toBe(-1.23);
  });

  it('should handle floating point precision issues', () => {
    expect(roundToCents(0.1 + 0.2)).toBe(0.3);
    expect(roundToCents(0.3 - 0.1)).toBe(0.2);
  });
});
