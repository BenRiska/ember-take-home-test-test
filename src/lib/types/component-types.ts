import { AssetWithDepreciation } from './asset-types';

// DatePicker component props
export interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

// AssetTable component props
export interface AssetTableProps {
  assets: AssetWithDepreciation[];
  loading: boolean;
  error: string | null;
  selectedDate: string;
}

// Future component props can be added here
// Example:
// export interface DepreciationRowProps {
//   asset: Asset;
//   selectedDate: string;
//   calculations: DepreciationCalculation;
// }
