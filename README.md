# Depreciation Tracker

A web application that calculates depreciation for assets using both straight-line and reducing balance methods. The app displays a hardcoded list of assets and calculates depreciation figures up to a user-selected date.

## What This App Does

The Depreciation Tracker helps accountants and business owners understand how their assets depreciate over time. It supports two common depreciation methods:

1. **Straight-line depreciation**: Assets lose the same amount of value each year over a 5-year useful life
2. **Reducing balance depreciation**: A fixed 25% rate is applied to the remaining value each year

## Features

- **Date Selection**: Choose any date to calculate depreciation up to that point
- **Asset Display**: Shows asset name, purchase date, purchase amount, and depreciation method
- **Calculations**: Provides in-year depreciation expense, accumulated depreciation, and net book value
- **Daily Pro-rata**: Calculations are performed on a daily basis for precise results
- **Multiple Methods**: Support for both straight-line and reducing balance depreciation

## How to Run the App

### Prerequisites
- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Installation & Setup
1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to `http://localhost:3000` (or the port shown in your terminal)

## How to Use the App

1. **Select a Date**: Use the date picker to choose the date up to which you want to calculate depreciation
2. **View Results**: The app will automatically display:
   - Asset details (name, purchase date, purchase amount, depreciation method)
   - In-year depreciation expense for the selected period
   - Accumulated depreciation from purchase date to selected date
   - Net book value as of the selected date

## How Depreciation Calculations Work

### Straight-line Depreciation (5-year useful life)

1. **End Date Calculation**: `endDate = purchaseDate + 5 years - 1 day`
2. **Daily Depreciation**: `dailyDepreciation = purchaseAmount / (endDate - purchaseDate + 1 day)`
3. **Period Calculation**: 
   - Start: Later of purchase date or current year start
   - End: Sooner of end date, current year end, or user-selected date
4. **In-year Expense**: `Number of days in period × dailyDepreciation`

### Reducing Balance Depreciation (25% annual rate)

1. **Opening Net Book Value**: 
   - Purchase year: `purchaseAmount`
   - Subsequent years: Previous year's closing net book value
2. **Annual Depreciation**: `annualDepreciation = openingNetBookValue × 0.25`
3. **Period Calculation**: Same as straight-line method
4. **In-year Expense**: `annualDepreciation × (Number of days in period / Number of days in current year)`

### Key Calculation Rules

- **Daily Pro-rata**: All calculations are performed on a daily basis for precision
- **Rounding**: Results are rounded to 2 decimal places for display only
- **Future Assets**: Assets not yet purchased show full value with zero depreciation
- **Calendar Year Basis**: Uses actual days in the calendar year for calculations

## Running Tests

To run the automated tests:
```bash
npm test
```

## Technical Details

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest with React Testing Library
- **Architecture**: App Router with modern React patterns
- **Precision**: decimal.js for accurate financial calculations and consistency across the app

## Assumptions & Notes

- Assets are hardcoded (no database required)
- Calculations use calendar days, not business days
- Leap years are handled automatically
- All monetary values are in the same currency (GBP in examples)
- The app prioritizes calculation accuracy over UI complexity

## Future Enhancements

- Support for additional depreciation methods
- Asset management (add/edit/delete assets)
- Export functionality for reports
- Historical depreciation tracking
- Multiple currency support
- Tax implications and calculations

## Development Notes

This application was built as a take-home exercise demonstrating:
- Financial calculation accuracy
- React/Next.js development skills
- Test-driven development approach
- Clean, maintainable code structure

The focus is on correctness and test coverage rather than complex UI features, ensuring the depreciation calculations are mathematically sound and reliable.
