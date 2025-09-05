import { render, screen } from '@testing-library/react';
import { format } from 'date-fns';
import AssetTable from '../AssetTable';
import { AssetWithDepreciation } from '@/lib/types';

// Mock date-fns format function
jest.mock('date-fns', () => ({
  format: jest.fn()
}));

const mockFormat = format as jest.MockedFunction<typeof format>;

describe('AssetTable', () => {
  const mockAssets: AssetWithDepreciation[] = [
    {
      assetName: 'Laptop A',
      purchaseDate: '2020-04-15',
      purchaseAmount: 1200,
      depreciationMethod: 'straight-line',
      depreciation: {
        inYearExpense: 171.52,
        accumulatedDepreciation: 171.52,
        netBookValue: 1028.48
      }
    },
    {
      assetName: 'Forklift',
      purchaseDate: '2020-01-03',
      purchaseAmount: 24000,
      depreciationMethod: 'reducing-balance',
      depreciation: {
        inYearExpense: 5967.21,
        accumulatedDepreciation: 5967.21,
        netBookValue: 18032.79
      }
    }
  ];

  beforeEach(() => {
    mockFormat.mockImplementation((date, formatStr) => {
      if (formatStr === 'MMM dd, yyyy') {
        return 'Dec 31, 2020';
      }
      return 'Apr 15, 2020';
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should show loading message when loading is true', () => {
      render(
        <AssetTable
          assets={[]}
          loading={true}
          error={null}
          selectedDate="2020-12-31"
        />
      );

      expect(screen.getByText('Loading assets...')).toBeInTheDocument();
    });

    it('should not show loading message when loading is false', () => {
      render(
        <AssetTable
          assets={[]}
          loading={false}
          error={null}
          selectedDate="2020-12-31"
        />
      );

      expect(screen.queryByText('Loading assets...')).not.toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should display error message when error is provided', () => {
      const errorMessage = 'Failed to load assets';

      render(
        <AssetTable
          assets={[]}
          loading={false}
          error={errorMessage}
          selectedDate="2020-12-31"
        />
      );

      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });

    it('should not show error message when error is null', () => {
      render(
        <AssetTable
          assets={[]}
          loading={false}
          error={null}
          selectedDate="2020-12-31"
        />
      );

      expect(screen.queryByText(/Error:/)).not.toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('should show "No assets found" when assets array is empty', () => {
      render(
        <AssetTable
          assets={[]}
          loading={false}
          error={null}
          selectedDate="2020-12-31"
        />
      );

      expect(screen.getByText('No assets found.')).toBeInTheDocument();
    });
  });

  describe('Asset Display', () => {
    it('should display the selected date in the header', () => {
      render(
        <AssetTable
          assets={mockAssets}
          loading={false}
          error={null}
          selectedDate="2020-12-31"
        />
      );

      expect(screen.getByText('Depreciation calculations for assets up to Dec 31, 2020')).toBeInTheDocument();
    });

    it('should display all asset information in a table', () => {
      render(
        <AssetTable
          assets={mockAssets}
          loading={false}
          error={null}
          selectedDate="2020-12-31"
        />
      );

      // Check table headers
      expect(screen.getByText('Asset Name')).toBeInTheDocument();
      expect(screen.getByText('Purchase Date')).toBeInTheDocument();
      expect(screen.getByText('Purchase Amount')).toBeInTheDocument();
      expect(screen.getByText('Depreciation Method')).toBeInTheDocument();
      expect(screen.getByText('In-Year Expense')).toBeInTheDocument();
      expect(screen.getByText('Accumulated Depreciation')).toBeInTheDocument();
      expect(screen.getByText('Net Book Value')).toBeInTheDocument();

      // Check asset data
      expect(screen.getByText('Laptop A')).toBeInTheDocument();
      expect(screen.getByText('Forklift')).toBeInTheDocument();
    });

    it('should format purchase amounts with currency and commas', () => {
      render(
        <AssetTable
          assets={mockAssets}
          loading={false}
          error={null}
          selectedDate="2020-12-31"
        />
      );

      expect(screen.getByText('£1,200')).toBeInTheDocument();
      expect(screen.getByText('£24,000')).toBeInTheDocument();
    });

    it('should format depreciation amounts with currency and commas', () => {
      render(
        <AssetTable
          assets={mockAssets}
          loading={false}
          error={null}
          selectedDate="2020-12-31"
        />
      );

      // Check that depreciation amounts appear (they may appear multiple times in different columns)
      expect(screen.getAllByText('£171.52')).toHaveLength(2); // In-Year Expense and Accumulated Depreciation
      expect(screen.getAllByText('£5,967.21')).toHaveLength(2); // In-Year Expense and Accumulated Depreciation
      expect(screen.getByText('£1,028.48')).toBeInTheDocument(); // Net Book Value
      expect(screen.getByText('£18,032.79')).toBeInTheDocument(); // Net Book Value
    });
  });

  describe('Depreciation Method Badges', () => {
    it('should display straight-line method with blue badge', () => {
      render(
        <AssetTable
          assets={[mockAssets[0]]}
          loading={false}
          error={null}
          selectedDate="2020-12-31"
        />
      );

      const badge = screen.getByText('straight line');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('bg-blue-100', 'text-blue-800');
    });

    it('should display reducing-balance method with green badge', () => {
      render(
        <AssetTable
          assets={[mockAssets[1]]}
          loading={false}
          error={null}
          selectedDate="2020-12-31"
        />
      );

      const badge = screen.getByText('reducing balance');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('bg-green-100', 'text-green-800');
    });

    it('should replace hyphens with spaces in depreciation method names', () => {
      render(
        <AssetTable
          assets={mockAssets}
          loading={false}
          error={null}
          selectedDate="2020-12-31"
        />
      );

      expect(screen.getByText('straight line')).toBeInTheDocument();
      expect(screen.getByText('reducing balance')).toBeInTheDocument();
    });
  });

  describe('Table Structure', () => {
    it('should render a proper HTML table structure', () => {
      render(
        <AssetTable
          assets={mockAssets}
          loading={false}
          error={null}
          selectedDate="2020-12-31"
        />
      );

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(table).toHaveClass('min-w-full', 'divide-y', 'divide-gray-200');
    });

    it('should have hover effects on table rows', () => {
      render(
        <AssetTable
          assets={mockAssets}
          loading={false}
          error={null}
          selectedDate="2020-12-31"
        />
      );

      const rows = screen.getAllByRole('row');
      // Skip header row (index 0), check data rows
      expect(rows[1]).toHaveClass('hover:bg-gray-50');
      expect(rows[2]).toHaveClass('hover:bg-gray-50');
    });
  });

  describe('Responsive Design', () => {
    it('should have horizontal scroll for overflow', () => {
      render(
        <AssetTable
          assets={mockAssets}
          loading={false}
          error={null}
          selectedDate="2020-12-31"
        />
      );

      const scrollContainer = screen.getByRole('table').closest('.overflow-x-auto');
      expect(scrollContainer).toBeInTheDocument();
    });
  });
});
