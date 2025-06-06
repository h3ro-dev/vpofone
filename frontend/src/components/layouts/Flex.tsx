import React from 'react';
import clsx from 'clsx';
import { BaseComponentProps, Size } from '../types';
import './Flex.css';

export interface FlexProps extends BaseComponentProps {
  children: React.ReactNode;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  gap?: Size | 'none';
  inline?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export const Flex: React.FC<FlexProps> = ({
  children,
  className,
  direction = 'row',
  wrap = 'nowrap',
  justify = 'start',
  align = 'stretch',
  gap,
  inline = false,
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={clsx(
        'flex',
        inline && 'flex--inline',
        `flex--${direction}`,
        `flex--${wrap}`,
        `flex--justify-${justify}`,
        `flex--align-${align}`,
        gap && `flex--gap-${gap}`,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Flex.displayName = 'Flex';