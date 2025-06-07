import React, { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { BaseComponentProps, Size } from '../types';
import './Checkbox.css';

export interface CheckboxProps extends BaseComponentProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'style' | 'className' | 'id'> {
  label?: string;
  size?: Size;
  indeterminate?: boolean;
  error?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    className,
    label,
    size = 'md',
    indeterminate = false,
    error = false,
    disabled,
    id,
    ...props 
  }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    React.useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.indeterminate = indeterminate;
      }
    }, [indeterminate, ref]);

    return (
      <label 
        htmlFor={checkboxId}
        className={clsx(
          'checkbox-wrapper',
          disabled && 'checkbox-wrapper--disabled',
          className
        )}
      >
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className={clsx(
            'checkbox',
            `checkbox--${size}`,
            error && 'checkbox--error'
          )}
          disabled={disabled}
          aria-invalid={error}
          {...props}
        />
        <span className="checkbox-box">
          <svg 
            className="checkbox-icon checkbox-icon--check" 
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M10 3L4.5 8.5L2 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <svg 
            className="checkbox-icon checkbox-icon--indeterminate" 
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M2 6H10" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </span>
        {label && (
          <span className={clsx(
            'checkbox-label',
            `checkbox-label--${size}`
          )}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';