import React from 'react';
import clsx from 'clsx';
import { BaseComponentProps, Size } from '../types';
import './Stack.css';

export interface StackProps extends BaseComponentProps {
  children: React.ReactNode;
  spacing?: Size | 'none';
  direction?: 'vertical' | 'horizontal';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  divider?: boolean;
  wrap?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export const Stack: React.FC<StackProps> = ({
  children,
  className,
  spacing = 'md',
  direction = 'vertical',
  align = 'stretch',
  justify = 'start',
  divider = false,
  wrap = false,
  as: Component = 'div',
  ...props
}) => {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <Component
      className={clsx(
        'stack',
        `stack--${direction}`,
        `stack--spacing-${spacing}`,
        `stack--align-${align}`,
        `stack--justify-${justify}`,
        wrap && 'stack--wrap',
        divider && 'stack--divider',
        className
      )}
      {...props}
    >
      {divider ? (
        childrenArray.map((child, index) => (
          <React.Fragment key={index}>
            {index > 0 && <div className="stack-divider" />}
            <div className="stack-item">{child}</div>
          </React.Fragment>
        ))
      ) : (
        children
      )}
    </Component>
  );
};

Stack.displayName = 'Stack';