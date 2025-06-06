import React, { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { BaseComponentProps, Size, Status } from '../types';
import './Input.css';

export interface InputProps extends BaseComponentProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'style' | 'className' | 'id'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: Size;
  status?: Status;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    label,
    error,
    helperText,
    size = 'md',
    status = 'default',
    fullWidth = false,
    leftIcon,
    rightIcon,
    disabled,
    required,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const inputStatus = error ? 'error' : status;

    return (
      <div 
        className={clsx(
          'input-wrapper',
          fullWidth && 'input-wrapper--full-width',
          className
        )}
      >
        {label && (
          <label 
            htmlFor={inputId} 
            className={clsx(
              'input-label',
              required && 'input-label--required',
              disabled && 'input-label--disabled'
            )}
          >
            {label}
          </label>
        )}
        <div className="input-container">
          {leftIcon && (
            <span className="input-icon input-icon--left">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'input',
              `input--${size}`,
              `input--${inputStatus}`,
              leftIcon && 'input--with-left-icon',
              rightIcon && 'input--with-right-icon',
              disabled && 'input--disabled'
            )}
            disabled={disabled}
            aria-invalid={inputStatus === 'error'}
            aria-describedby={error || helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {rightIcon && (
            <span className="input-icon input-icon--right">
              {rightIcon}
            </span>
          )}
        </div>
        {(error || helperText) && (
          <span 
            id={`${inputId}-helper`}
            className={clsx(
              'input-helper',
              error && 'input-helper--error'
            )}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';