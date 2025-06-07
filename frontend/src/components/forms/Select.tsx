import React, { forwardRef, SelectHTMLAttributes } from 'react';
import clsx from 'clsx';
import { BaseComponentProps, Size, Status } from '../types';
import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends BaseComponentProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'style' | 'className' | 'id'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: Size;
  status?: Status;
  fullWidth?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className,
    label,
    error,
    helperText,
    size = 'md',
    status = 'default',
    fullWidth = false,
    options,
    placeholder,
    disabled,
    required,
    id,
    value,
    ...props 
  }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const selectStatus = error ? 'error' : status;

    return (
      <div 
        className={clsx(
          'select-wrapper',
          fullWidth && 'select-wrapper--full-width',
          className
        )}
      >
        {label && (
          <label 
            htmlFor={selectId} 
            className={clsx(
              'select-label',
              required && 'select-label--required',
              disabled && 'select-label--disabled'
            )}
          >
            {label}
          </label>
        )}
        <div className="select-container">
          <select
            ref={ref}
            id={selectId}
            className={clsx(
              'select',
              `select--${size}`,
              `select--${selectStatus}`,
              disabled && 'select--disabled',
              !value && placeholder && 'select--placeholder'
            )}
            disabled={disabled}
            aria-invalid={selectStatus === 'error'}
            aria-describedby={error || helperText ? `${selectId}-helper` : undefined}
            value={value}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <span className="select-icon">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M5 7.5L10 12.5L15 7.5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        {(error || helperText) && (
          <span 
            id={`${selectId}-helper`}
            className={clsx(
              'select-helper',
              error && 'select-helper--error'
            )}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';