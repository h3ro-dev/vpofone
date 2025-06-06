import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';
import { BaseComponentProps, Size, Status } from '../types';
import './Textarea.css';

export interface TextareaProps extends BaseComponentProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'style' | 'className' | 'id'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: Size;
  status?: Status;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  minRows?: number;
  maxRows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className,
    label,
    error,
    helperText,
    size = 'md',
    status = 'default',
    fullWidth = false,
    resize = 'vertical',
    minRows = 3,
    maxRows,
    disabled,
    required,
    id,
    ...props 
  }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const textareaStatus = error ? 'error' : status;

    return (
      <div 
        className={clsx(
          'textarea-wrapper',
          fullWidth && 'textarea-wrapper--full-width',
          className
        )}
      >
        {label && (
          <label 
            htmlFor={textareaId} 
            className={clsx(
              'textarea-label',
              required && 'textarea-label--required',
              disabled && 'textarea-label--disabled'
            )}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={clsx(
            'textarea',
            `textarea--${size}`,
            `textarea--${textareaStatus}`,
            `textarea--resize-${resize}`,
            disabled && 'textarea--disabled'
          )}
          disabled={disabled}
          aria-invalid={textareaStatus === 'error'}
          aria-describedby={error || helperText ? `${textareaId}-helper` : undefined}
          rows={minRows}
          style={{
            minHeight: minRows ? `${minRows * 1.5}em` : undefined,
            maxHeight: maxRows ? `${maxRows * 1.5}em` : undefined,
          }}
          {...props}
        />
        {(error || helperText) && (
          <span 
            id={`${textareaId}-helper`}
            className={clsx(
              'textarea-helper',
              error && 'textarea-helper--error'
            )}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';