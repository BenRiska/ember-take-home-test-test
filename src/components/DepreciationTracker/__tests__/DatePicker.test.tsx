import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatePicker from '../DatePicker';

describe('DatePicker', () => {
  const mockOnDateChange = jest.fn();

  beforeEach(() => {
    mockOnDateChange.mockClear();
  });

  describe('Rendering', () => {
    it('should render with a label and date input', () => {
      render(
        <DatePicker
          selectedDate="2020-12-31"
          onDateChange={mockOnDateChange}
        />
      );

      expect(screen.getByText('Calculate depreciation up to:')).toBeInTheDocument();
      expect(screen.getByLabelText('Calculate depreciation up to:')).toBeInTheDocument();
    });

    it('should display the selected date in the input', () => {
      render(
        <DatePicker
          selectedDate="2020-12-31"
          onDateChange={mockOnDateChange}
        />
      );

      const dateInput = screen.getByDisplayValue('2020-12-31');
      expect(dateInput).toBeInTheDocument();
    });

    it('should have proper accessibility attributes', () => {
      render(
        <DatePicker
          selectedDate="2020-12-31"
          onDateChange={mockOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText('Calculate depreciation up to:');
      expect(dateInput).toHaveAttribute('id', 'date-picker');
      expect(dateInput).toHaveAttribute('type', 'date');
    });
  });

  describe('Styling', () => {
    it('should have proper CSS classes for styling', () => {
      render(
        <DatePicker
          selectedDate="2020-12-31"
          onDateChange={mockOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText('Calculate depreciation up to:');
      expect(dateInput).toHaveClass(
        'px-4',
        'py-2',
        'border',
        'border-gray-300',
        'rounded-md',
        'shadow-sm',
        'focus:ring-2',
        'focus:ring-blue-500',
        'focus:border-blue-500',
        'bg-white'
      );
    });

    it('should have proper container styling', () => {
      render(
        <DatePicker
          selectedDate="2020-12-31"
          onDateChange={mockOnDateChange}
        />
      );

      const container = screen.getByText('Calculate depreciation up to:').closest('div');
      expect(container).toHaveClass('mb-8');
    });

    it('should have proper label styling', () => {
      render(
        <DatePicker
          selectedDate="2020-12-31"
          onDateChange={mockOnDateChange}
        />
      );

      const label = screen.getByText('Calculate depreciation up to:');
      expect(label).toHaveClass(
        'block',
        'text-sm',
        'font-medium',
        'text-gray-700',
        'mb-2'
      );
    });
  });

  describe('User Interactions', () => {
    it('should call onDateChange when user selects a new date', () => {
      render(
        <DatePicker
          selectedDate="2020-12-31"
          onDateChange={mockOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText('Calculate depreciation up to:');

      fireEvent.change(dateInput, { target: { value: '2021-01-15' } });

      expect(mockOnDateChange).toHaveBeenCalledWith('2021-01-15');
    });

    it('should call onDateChange when user changes date via browser date picker', () => {
      render(
        <DatePicker
          selectedDate="2020-12-31"
          onDateChange={mockOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText('Calculate depreciation up to:');

      fireEvent.change(dateInput, { target: { value: '2021-06-30' } });

      expect(mockOnDateChange).toHaveBeenCalledWith('2021-06-30');
      expect(mockOnDateChange).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple date changes', () => {
      render(
        <DatePicker
          selectedDate="2020-12-31"
          onDateChange={mockOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText('Calculate depreciation up to:');

      fireEvent.change(dateInput, { target: { value: '2021-01-01' } });
      fireEvent.change(dateInput, { target: { value: '2021-06-15' } });
      fireEvent.change(dateInput, { target: { value: '2021-12-31' } });

      expect(mockOnDateChange).toHaveBeenCalledTimes(3);
      expect(mockOnDateChange).toHaveBeenNthCalledWith(1, '2021-01-01');
      expect(mockOnDateChange).toHaveBeenNthCalledWith(2, '2021-06-15');
      expect(mockOnDateChange).toHaveBeenNthCalledWith(3, '2021-12-31');
    });
  });

  describe('Date Format Handling', () => {
    it('should handle empty date string', () => {
      render(
        <DatePicker
          selectedDate=""
          onDateChange={mockOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText('Calculate depreciation up to:');
      expect(dateInput).toHaveValue('');
    });

    it('should handle various date formats correctly', () => {
      const testDates = [
        '2020-01-01',
        '2020-12-31',
        '2021-06-15',
        '2024-02-29' // Leap year (2024 is a leap year)
      ];

      testDates.forEach(date => {
        const { unmount } = render(
          <DatePicker
            selectedDate={date}
            onDateChange={mockOnDateChange}
          />
        );

        const dateInput = screen.getByLabelText('Calculate depreciation up to:');
        expect(dateInput).toHaveValue(date);

        unmount();
      });
    });
  });

  describe('Focus and Accessibility', () => {
    it('should be focusable', () => {
      render(
        <DatePicker
          selectedDate="2020-12-31"
          onDateChange={mockOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText('Calculate depreciation up to:');
      dateInput.focus();

      expect(dateInput).toHaveFocus();
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();

      render(
        <DatePicker
          selectedDate="2020-12-31"
          onDateChange={mockOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText('Calculate depreciation up to:');

      await user.tab();
      expect(dateInput).toHaveFocus();
    });

    it('should have proper label association', () => {
      render(
        <DatePicker
          selectedDate="2020-12-31"
          onDateChange={mockOnDateChange}
        />
      );

      const label = screen.getByText('Calculate depreciation up to:');
      const dateInput = screen.getByLabelText('Calculate depreciation up to:');

      expect(label).toHaveAttribute('for', 'date-picker');
      expect(dateInput).toHaveAttribute('id', 'date-picker');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined onDateChange gracefully', () => {
      // This test ensures the component doesn't crash if onDateChange is undefined
      // In real usage, this shouldn't happen due to TypeScript, but good to test
      expect(() => {
        render(
          <DatePicker
            selectedDate="2020-12-31"
            onDateChange={undefined as unknown as (date: string) => void}
          />
        );
      }).not.toThrow();
    });

    it('should handle very old dates', () => {
      render(
        <DatePicker
          selectedDate="1900-01-01"
          onDateChange={mockOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText('Calculate depreciation up to:');
      expect(dateInput).toHaveValue('1900-01-01');
    });

    it('should handle future dates', () => {
      render(
        <DatePicker
          selectedDate="2030-12-31"
          onDateChange={mockOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText('Calculate depreciation up to:');
      expect(dateInput).toHaveValue('2030-12-31');
    });
  });

  describe('Component Integration', () => {
    it('should update when selectedDate prop changes', () => {
      const { rerender } = render(
        <DatePicker
          selectedDate="2020-12-31"
          onDateChange={mockOnDateChange}
        />
      );

      expect(screen.getByDisplayValue('2020-12-31')).toBeInTheDocument();

      rerender(
        <DatePicker
          selectedDate="2021-06-15"
          onDateChange={mockOnDateChange}
        />
      );

      expect(screen.getByDisplayValue('2021-06-15')).toBeInTheDocument();
      expect(screen.queryByDisplayValue('2020-12-31')).not.toBeInTheDocument();
    });

    it('should maintain focus when selectedDate prop changes', () => {
      const { rerender } = render(
        <DatePicker
          selectedDate="2020-12-31"
          onDateChange={mockOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText('Calculate depreciation up to:');
      dateInput.focus();
      expect(dateInput).toHaveFocus();

      rerender(
        <DatePicker
          selectedDate="2021-06-15"
          onDateChange={mockOnDateChange}
        />
      );

      expect(dateInput).toHaveFocus();
    });
  });
});
