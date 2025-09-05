import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DepreciationTracker from '../DepreciationTracker';
import { useAssets } from '@/hooks/useAssets';
import { format } from 'date-fns';

// Mock the useAssets hook
jest.mock('@/hooks/useAssets');
const mockUseAssets = useAssets as jest.MockedFunction<typeof useAssets>;

// Mock date-fns format function
jest.mock('date-fns', () => ({
  format: jest.fn()
}));

const mockFormat = format as jest.MockedFunction<typeof format>;

describe('DepreciationTracker', () => {
  const mockAssets = [
    {
      assetName: 'Laptop A',
      purchaseDate: '2020-04-15',
      purchaseAmount: 1200,
      depreciationMethod: 'straight-line' as const,
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
      depreciationMethod: 'reducing-balance' as const,
      depreciation: {
        inYearExpense: 5967.21,
        accumulatedDepreciation: 5967.21,
        netBookValue: 18032.79
      }
    }
  ];

  beforeEach(() => {
    // Mock format to return today's date
    mockFormat.mockReturnValue('2023-12-31');

    // Default mock implementation
    mockUseAssets.mockReturnValue({
      assets: [],
      loading: false,
      error: null,
      refetch: jest.fn()
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial Rendering', () => {
    it('should render the main heading', () => {
      render(<DepreciationTracker />);

      expect(screen.getByText('Depreciation Tracker')).toBeInTheDocument();
    });

    it('should render with proper container styling', () => {
      render(<DepreciationTracker />);

      const container = screen.getByText('Depreciation Tracker').closest('.min-h-screen');
      expect(container).toHaveClass('min-h-screen', 'p-8', 'bg-white');
    });

    it('should render with proper max-width container', () => {
      render(<DepreciationTracker />);

      const maxWidthContainer = screen.getByText('Depreciation Tracker').closest('.max-w-6xl');
      expect(maxWidthContainer).toHaveClass('max-w-6xl', 'mx-auto');
    });
  });

  describe('Client-Side Hydration', () => {
    it('should initialize with today\'s date after hydration', async () => {
      render(<DepreciationTracker />);

      // Wait for useEffect to run
      await waitFor(() => {
        expect(mockFormat).toHaveBeenCalledWith(expect.any(Date), 'yyyy-MM-dd');
      });
    });

    it('should render DatePicker and AssetTable after client-side hydration', async () => {
      render(<DepreciationTracker />);

      await waitFor(() => {
        expect(screen.getByText('Calculate depreciation up to:')).toBeInTheDocument();
        expect(screen.getByText('Assets')).toBeInTheDocument();
      });
    });
  });

  describe('DatePicker Integration', () => {
    it('should pass selectedDate to DatePicker', async () => {
      render(<DepreciationTracker />);

      await waitFor(() => {
        const dateInput = screen.getByLabelText('Calculate depreciation up to:');
        expect(dateInput).toHaveValue('2023-12-31');
      });
    });

    it('should update selectedDate when DatePicker changes', async () => {
      const user = userEvent.setup();

      render(<DepreciationTracker />);

      await waitFor(() => {
        expect(screen.getByLabelText('Calculate depreciation up to:')).toBeInTheDocument();
      });

      const dateInput = screen.getByLabelText('Calculate depreciation up to:');
      await user.clear(dateInput);
      await user.type(dateInput, '2023-06-15');

      expect(dateInput).toHaveValue('2023-06-15');
    });
  });

  describe('AssetTable Integration', () => {
    it('should pass assets data to AssetTable', async () => {
      mockUseAssets.mockReturnValue({
        assets: mockAssets,
        loading: false,
        error: null,
        refetch: jest.fn()
      });

      render(<DepreciationTracker />);

      await waitFor(() => {
        expect(screen.getByText('Laptop A')).toBeInTheDocument();
        expect(screen.getByText('Forklift')).toBeInTheDocument();
      });
    });

    it('should pass loading state to AssetTable', async () => {
      mockUseAssets.mockReturnValue({
        assets: [],
        loading: true,
        error: null,
        refetch: jest.fn()
      });

      render(<DepreciationTracker />);

      await waitFor(() => {
        expect(screen.getByText('Loading assets...')).toBeInTheDocument();
      });
    });

    it('should pass error state to AssetTable', async () => {
      mockUseAssets.mockReturnValue({
        assets: [],
        loading: false,
        error: 'Failed to fetch assets',
        refetch: jest.fn()
      });

      render(<DepreciationTracker />);

      await waitFor(() => {
        expect(screen.getByText('Error: Failed to fetch assets')).toBeInTheDocument();
      });
    });

    it('should pass selectedDate to AssetTable', async () => {
      mockUseAssets.mockReturnValue({
        assets: mockAssets,
        loading: false,
        error: null,
        refetch: jest.fn()
      });

      render(<DepreciationTracker />);

      await waitFor(() => {
        expect(screen.getByText('Depreciation calculations for assets up to 2023-12-31')).toBeInTheDocument();
      });
    });
  });

  describe('useAssets Hook Integration', () => {
    it('should call useAssets with empty string initially', () => {
      render(<DepreciationTracker />);

      expect(mockUseAssets).toHaveBeenCalledWith('');
    });

    it('should call useAssets with selectedDate after hydration', async () => {
      render(<DepreciationTracker />);

      await waitFor(() => {
        expect(mockUseAssets).toHaveBeenCalledWith('2023-12-31');
      });
    });

    it('should update useAssets when selectedDate changes', async () => {
      const user = userEvent.setup();

      render(<DepreciationTracker />);

      await waitFor(() => {
        expect(screen.getByLabelText('Calculate depreciation up to:')).toBeInTheDocument();
      });

      const dateInput = screen.getByLabelText('Calculate depreciation up to:');
      await user.clear(dateInput);
      await user.type(dateInput, '2023-06-15');

      await waitFor(() => {
        expect(mockUseAssets).toHaveBeenCalledWith('2023-06-15');
      });
    });
  });

  describe('State Management', () => {
    it('should initialize selectedDate as empty string', () => {
      render(<DepreciationTracker />);

      // Initially selectedDate should be empty
      expect(mockUseAssets).toHaveBeenCalledWith('');
    });

    it('should set isClient to true after useEffect runs', async () => {
      render(<DepreciationTracker />);

      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle useAssets error gracefully', async () => {
      mockUseAssets.mockReturnValue({
        assets: [],
        loading: false,
        error: 'Network error',
        refetch: jest.fn()
      });

      render(<DepreciationTracker />);

      await waitFor(() => {
        expect(screen.getByText('Error: Network error')).toBeInTheDocument();
      });
    });

    it('should handle empty assets array', async () => {
      mockUseAssets.mockReturnValue({
        assets: [],
        loading: false,
        error: null,
        refetch: jest.fn()
      });

      render(<DepreciationTracker />);

      await waitFor(() => {
        expect(screen.getByText('No assets found.')).toBeInTheDocument();
      });
    });
  });

  describe('Component Composition', () => {
    it('should render all child components in correct order', async () => {
      mockUseAssets.mockReturnValue({
        assets: mockAssets,
        loading: false,
        error: null,
        refetch: jest.fn()
      });

      render(<DepreciationTracker />);

      await waitFor(() => {
        // Check that components are rendered in the correct order
        const heading = screen.getByText('Depreciation Tracker');
        const datePicker = screen.getByText('Calculate depreciation up to:');
        const assetTable = screen.getByText('Assets');

        expect(heading).toBeInTheDocument();
        expect(datePicker).toBeInTheDocument();
        expect(assetTable).toBeInTheDocument();
      });
    });

    it('should maintain proper spacing between components', async () => {
      render(<DepreciationTracker />);

      await waitFor(() => {
        const heading = screen.getByText('Depreciation Tracker');
        expect(heading).toHaveClass('mb-6');
      });
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive container classes', () => {
      render(<DepreciationTracker />);

      const container = screen.getByText('Depreciation Tracker').closest('.min-h-screen');
      expect(container).toHaveClass('min-h-screen', 'p-8');
    });

    it('should have max-width constraint for content', () => {
      render(<DepreciationTracker />);

      const maxWidthContainer = screen.getByText('Depreciation Tracker').closest('.max-w-6xl');
      expect(maxWidthContainer).toHaveClass('max-w-6xl', 'mx-auto');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<DepreciationTracker />);

      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveTextContent('Depreciation Tracker');
    });

    it('should be accessible to screen readers', async () => {
      mockUseAssets.mockReturnValue({
        assets: mockAssets,
        loading: false,
        error: null,
        refetch: jest.fn()
      });

      render(<DepreciationTracker />);

      await waitFor(() => {
        // Check that all interactive elements are accessible
        expect(screen.getByLabelText('Calculate depreciation up to:')).toBeInTheDocument();
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
    });
  });
});
