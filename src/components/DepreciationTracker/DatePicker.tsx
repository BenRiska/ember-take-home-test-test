import { DatePickerProps } from '@/lib/types';

// pure function for simplicity
export default function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  return (
    <div className="mb-8">
      <label htmlFor="date-picker" className="block text-sm font-medium text-gray-700 mb-2">
        Calculate depreciation up to:
      </label>
      <input
        id="date-picker"
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      />
    </div>
  );
}
