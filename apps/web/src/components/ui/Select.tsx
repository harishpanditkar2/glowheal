import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

/**
 * Select component with label and error handling
 * 
 * @example
 * <Select
 *   label="Select Service"
 *   options={[
 *     { value: 'dermatology', label: 'Dermatology' },
 *     { value: 'hair-care', label: 'Hair Care' }
 *   ]}
 *   error={errors.service}
 * />
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, placeholder, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-forest-700 mb-2"
          >
            {label}
            {props.required && <span className="text-coral-500 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200',
            'bg-white appearance-none',
            'focus:outline-none focus:ring-2 focus:ring-forest-700 focus:border-transparent',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            {
              'border-mist-300 hover:border-mist-400': !error,
              'border-red-500 focus:ring-red-500': error,
            },
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
          }
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${selectId}-error`} className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${selectId}-helper`} className="mt-2 text-sm text-gray-600">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
