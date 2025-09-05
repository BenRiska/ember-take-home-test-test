import { defineFeature, loadFeature } from 'jest-cucumber';
import {
  processAssetsWithDepreciation
} from '@/lib/calculations';
import { RawAsset, AssetWithDepreciation } from '@/lib/types';
import { ExpectedDepreciationResult, RawTableRow } from '../types/feature-data';

const feature = loadFeature('./src/tests/depreciation.feature');

defineFeature(feature, (test) => {
  let assets: RawAsset[] = [];
  let calculationDate: string;
  let results: AssetWithDepreciation[];

  test('Calculating depreciation test 1', ({ given, when, then }) => {

    given('I have the following assets:', (table: RawTableRow[]) => {
      assets = table.map((row: RawTableRow): RawAsset => ({
        assetName: row.assetName,
        purchaseDate: row.purchaseDate,
        purchaseAmount: parseFloat(row.purchaseAmount),
        depreciationMethod: row.depreciationMethod
      }));
    });

    when('I run a netbook value report with 2020-12-31 as the end date', () => {
      calculationDate = '2020-12-31';
      results = processAssetsWithDepreciation(assets, calculationDate);
    });

    then('the system should show me the following information:', (table: RawTableRow[]) => {
      const expectedResults: ExpectedDepreciationResult[] = table.map((row: RawTableRow): ExpectedDepreciationResult => ({
        Asset: row.Asset,
        Cost: parseFloat(row.Cost),
        'Accumulated Depreciation': parseFloat(row['Accumulated Depreciation']),
        'In Year Depreciation': parseFloat(row['In Year Depreciation']),
        'Net Book Value': parseFloat(row['Net Book Value'])
      }));

      expectedResults.forEach((expectedRow: ExpectedDepreciationResult) => {
        const result = results.find(r => r.assetName === expectedRow.Asset);
        expect(result).toBeDefined();

        if (result) {
          expect(result.purchaseAmount).toBe(expectedRow.Cost);
          expect(result.depreciation.accumulatedDepreciation).toBe(expectedRow['Accumulated Depreciation']);
          expect(result.depreciation.inYearExpense).toBe(expectedRow['In Year Depreciation']);
          expect(result.depreciation.netBookValue).toBe(expectedRow['Net Book Value']);
        }
      });
    });
  });

  test('Calculating depreciation test 2', ({ given, when, then }) => {

    given('I have the following assets:', (table: RawTableRow[]) => {
      assets = table.map((row: RawTableRow): RawAsset => ({
        assetName: row.assetName,
        purchaseDate: row.purchaseDate,
        purchaseAmount: parseFloat(row.purchaseAmount),
        depreciationMethod: row.depreciationMethod
      }));
    });

    when('I run a netbook value report with 2022-06-30 as the end date', () => {
      calculationDate = '2022-06-30';
      results = processAssetsWithDepreciation(assets, calculationDate);
    });

    then('the system should show me the following information:', (table: RawTableRow[]) => {
      const expectedResults: ExpectedDepreciationResult[] = table.map((row: RawTableRow): ExpectedDepreciationResult => ({
        Asset: row.Asset,
        Cost: parseFloat(row.Cost),
        'Accumulated Depreciation': parseFloat(row['Accumulated Depreciation']),
        'In Year Depreciation': parseFloat(row['In Year Depreciation']),
        'Net Book Value': parseFloat(row['Net Book Value'])
      }));

      expectedResults.forEach((expectedRow: ExpectedDepreciationResult) => {
        const result = results.find(r => r.assetName === expectedRow.Asset);
        expect(result).toBeDefined();

        if (result) {
          expect(result.purchaseAmount).toBe(expectedRow.Cost);
          expect(result.depreciation.accumulatedDepreciation).toBe(expectedRow['Accumulated Depreciation']);
          expect(result.depreciation.inYearExpense).toBe(expectedRow['In Year Depreciation']);
          expect(result.depreciation.netBookValue).toBe(expectedRow['Net Book Value']);
        }
      });
    });
  });

  test('Calculating depreciation test 3', ({ given, when, then }) => {

    given('I have the following assets:', (table: RawTableRow[]) => {
      assets = table.map((row: RawTableRow): RawAsset => ({
        assetName: row.assetName,
        purchaseDate: row.purchaseDate,
        purchaseAmount: parseFloat(row.purchaseAmount),
        depreciationMethod: row.depreciationMethod
      }));
    });

    when('I run a netbook value report with 2025-08-31 as the end date', () => {
      calculationDate = '2025-08-31';
      results = processAssetsWithDepreciation(assets, calculationDate);
    });

    then('the system should show me the following information:', (table: RawTableRow[]) => {
      const expectedResults: ExpectedDepreciationResult[] = table.map((row: RawTableRow): ExpectedDepreciationResult => ({
        Asset: row.Asset,
        Cost: parseFloat(row.Cost),
        'Accumulated Depreciation': parseFloat(row['Accumulated Depreciation']),
        'In Year Depreciation': parseFloat(row['In Year Depreciation']),
        'Net Book Value': parseFloat(row['Net Book Value'])
      }));

      expectedResults.forEach((expectedRow: ExpectedDepreciationResult) => {
        const result = results.find(r => r.assetName === expectedRow.Asset);
        expect(result).toBeDefined();

        if (result) {
          expect(result.purchaseAmount).toBe(expectedRow.Cost);
          expect(result.depreciation.accumulatedDepreciation).toBe(expectedRow['Accumulated Depreciation']);
          expect(result.depreciation.inYearExpense).toBe(expectedRow['In Year Depreciation']);
          expect(result.depreciation.netBookValue).toBe(expectedRow['Net Book Value']);
        }
      });
    });
  });
});
