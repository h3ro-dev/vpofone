import React, { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { BaseComponentProps, Size } from '../types';
import './Radio.css';

export interface RadioProps extends BaseComponentProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'style' | 'className' | 'id'> {
  label?: string;
  size?: Size;
  error?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ 
    className,
    label,
    size = 'md',
    error = false,
    disabled,
    id,
    ...props 
  }, ref) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <label 
        htmlFor={radioId}
        className={clsx(
          'radio-wrapper',
          disabled && 'radio-wrapper--disabled',
          className
        )}
      >
        <input
          ref={ref}
          id={radioId}
          type="radio"
          className={clsx(
            'radio',
            `radio--${size}`,
            error && 'radio--error'
          )}
          disabled={disabled}
          aria-invalid={error}
          {...props}
        />
        <span className="radio-box">
          <span className="radio-dot" />
        </span>
        {label && (
          <span className={clsx(
            'radio-label',
            `radio-label--${size}`
          )}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

// Radio Group Component
export interface RadioGroupProps extends BaseComponentProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  size?: Size;
  error?: boolean;
  direction?: 'horizontal' | 'vertical';
  disabled?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  className,
  name,
  value,
  onChange,
  options,
  size = 'md',
  error = false,
  direction = 'vertical',
  disabled = false,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div 
      className={clsx(
        'radio-group',
        `radio-group--${direction}`,
        className
      )}
      role="radiogroup"
      {...props}
    >
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={handleChange}
          label={option.label}
          disabled={disabled || option.disabled}
          size={size}
          error={error}
        />
      ))}
    </div>
  );
};

RadioGroup.displayName = 'RadioGroup';