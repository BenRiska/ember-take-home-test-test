/**
 * Reducing balance depreciation calculation
 * Assumes 20% reducing balance rate
 */

import {
  roundToCents
} from '../utils';
import { startOfYear, endOfYear, getYear, parseISO, differenceInDays, isAfter, isBefore } from 'date-fns';

/**
 * Calculate reducing balance depreciation
 * @param purchaseAmount - Original cost of the asset
 * @param purchaseDate - Date the asset was purchased (ISO format)
 * @param calculationDate - Date to calculate depreciation up to (ISO format)
 * @param rate - Reducing balance rate (default: 0.2 for 20%)
 * @returns Object containing inYearExpense, accumulatedDepreciation, and netBookValue
 */
export function calculateReducingBalanceDepreciation(
  purchaseAmount: number,
  purchaseDate: string,
  calculationDate: string,
  rate: number = 0.2
): { inYearExpense: number; accumulatedDepreciation: number; netBookValue: number } {
  // If calculation date is before purchase date, no depreciation
  if (calculationDate < purchaseDate) {
    return {
      inYearExpense: 0,
      accumulatedDepreciation: 0,
      netBookValue: purchaseAmount
    };
  }

  const purchaseDateObj = parseISO(purchaseDate);
  const calculationDateObj = parseISO(calculationDate);

  const purchaseYear = getYear(purchaseDateObj);
  const calculationYear = getYear(calculationDateObj);

  // Create an array of year objects with start, end, and percent
  const yearPeriods = Array.from(
    { length: calculationYear - purchaseYear + 1 },
    (_, index) => {
      const year = purchaseYear + index;
      const yearStart = startOfYear(new Date(year, 0, 1));
      const yearEnd = endOfYear(new Date(year, 0, 1));

      // Determine the actual period for this year
      const periodStart = isAfter(yearStart, purchaseDateObj) ? yearStart : purchaseDateObj;
      const periodEnd = isBefore(calculationDateObj, yearEnd) ? calculationDateObj : yearEnd;

      // Calculate the percent of the year (1st Jan -> 31st Dec is 100%, 1st Jan -> 31st March is 25%, etc.)
      const daysInPeriod = differenceInDays(periodEnd, periodStart) + 1;
      const daysInYear = differenceInDays(yearEnd, yearStart) + 1;
      const percent = daysInPeriod / daysInYear;

      return {
        year,
        start: periodStart,
        end: periodEnd,
        percent
      };
    }
  );

  // Iterate over the year periods using reduce
  const result = yearPeriods.reduce(
    (acc, yearPeriod) => {
      // Calculate 20% depreciation for this year
      const annualDepreciation = acc.currentBookValue * rate;

      // Apply the percent (full year = 100%, partial year = less than 100%)
      const yearDepreciation = annualDepreciation * yearPeriod.percent;

      // Subtract the depreciation from the book value (compound it)
      const newBookValue = acc.currentBookValue - yearDepreciation;
      const newAccumulatedDepreciation = acc.totalAccumulatedDepreciation + yearDepreciation;

      // If this is the calculation year, this is our in-year expense
      const inYearExpense = yearPeriod.year === calculationYear ? yearDepreciation : acc.inYearExpense;

      return {
        currentBookValue: newBookValue,
        totalAccumulatedDepreciation: newAccumulatedDepreciation,
        inYearExpense
      };
    },
    {
      currentBookValue: purchaseAmount,
      totalAccumulatedDepreciation: 0,
      inYearExpense: 0
    }
  );

  const { totalAccumulatedDepreciation, inYearExpense } = result;

  const netBookValue = purchaseAmount - totalAccumulatedDepreciation;

  return {
    inYearExpense: roundToCents(inYearExpense),
    accumulatedDepreciation: roundToCents(totalAccumulatedDepreciation),
    netBookValue: roundToCents(netBookValue)
  };
}
