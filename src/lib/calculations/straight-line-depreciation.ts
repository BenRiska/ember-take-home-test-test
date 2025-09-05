/**
 * Straight-line depreciation calculation
 * Assumes 5-year useful life for all assets
 */

import {
  roundToCents
} from '../utils';
import { addYears, subDays, format, startOfYear, endOfYear, differenceInDays, parseISO, isAfter, isBefore } from 'date-fns';

/**
 * Calculate straight-line depreciation
 * @param purchaseAmount - Original cost of the asset
 * @param purchaseDate - Date the asset was purchased (ISO format)
 * @param calculationDate - Date to calculate depreciation up to (ISO format)
 * @param usefulLifeYears - Useful life of the asset in years (default: 5)
 * @returns Object containing inYearExpense, accumulatedDepreciation, and netBookValue
 */
export function calculateStraightLineDepreciation(
  purchaseAmount: number,
  purchaseDate: string,
  calculationDate: string,
  usefulLifeYears: number = 5
): { inYearExpense: number; accumulatedDepreciation: number; netBookValue: number } {

  // If calculation date is before purchase date, no depreciation
  if (calculationDate < purchaseDate) {
    return {
      inYearExpense: 0,
      accumulatedDepreciation: 0,
      netBookValue: purchaseAmount
    };
  }

  // Work out end date of useful life: purchaseDate + usefulLifeYears - 1 day
  const purchaseDateObj = parseISO(purchaseDate);
  const endDateObj = subDays(addYears(purchaseDateObj, usefulLifeYears), 1);
  const endDate = format(endDateObj, 'yyyy-MM-dd');

  // Work out daily depreciation: purchaseAmount / (endDate - purchaseDate + 1 day)
  const totalUsefulDays = differenceInDays(parseISO(endDate), parseISO(purchaseDate)) + 1;
  const dailyDepreciation = purchaseAmount / totalUsefulDays;

  // Calculate total accumulated depreciation from purchase date to calculation date
  const totalDaysFromPurchase = differenceInDays(parseISO(calculationDate), parseISO(purchaseDate)) + 1;
  const accumulatedDepreciation = Math.min(totalDaysFromPurchase * dailyDepreciation, purchaseAmount);

  // Calculate in-year expense
  // Period starts on purchaseDate or current year start, whichever is later
  // Period ends on endDate, current year end, or calculation date, whichever is sooner
  const calculationDateObj = parseISO(calculationDate);
  const calculationYearStart = startOfYear(calculationDateObj);
  const calculationYearEnd = endOfYear(calculationDateObj);

  const periodStart = isAfter(calculationYearStart, parseISO(purchaseDate))
    ? format(calculationYearStart, 'yyyy-MM-dd')
    : purchaseDate;

  // Period ends on endDate, current year end, or calculation date, whichever is sooner
  const endDateObj2 = parseISO(endDate);
  const yearEndObj = parseISO(format(calculationYearEnd, 'yyyy-MM-dd'));
  const calculationDateObj2 = parseISO(calculationDate);

  let periodEnd: string;
  if (isBefore(calculationDateObj2, endDateObj2) && isBefore(calculationDateObj2, yearEndObj)) {
    periodEnd = calculationDate;
  } else if (isBefore(endDateObj2, yearEndObj)) {
    periodEnd = endDate;
  } else {
    periodEnd = format(calculationYearEnd, 'yyyy-MM-dd');
  }

  const daysInPeriod = differenceInDays(parseISO(periodEnd), parseISO(periodStart)) + 1;
  const inYearExpense = Math.max(0, daysInPeriod * dailyDepreciation);

  const netBookValue = purchaseAmount - accumulatedDepreciation;

  return {
    inYearExpense: roundToCents(inYearExpense),
    accumulatedDepreciation: roundToCents(accumulatedDepreciation),
    netBookValue: roundToCents(netBookValue)
  };
}
