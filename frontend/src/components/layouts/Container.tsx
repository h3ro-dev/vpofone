import React from 'react';
import clsx from 'clsx';
import { BaseComponentProps } from '../types';
import './Container.css';

export interface ContainerProps extends BaseComponentProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
  centered?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  maxWidth = 'lg',
  padding = true,
  centered = true,
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={clsx(
        'container',
        `container--${maxWidth}`,
        padding && 'container--padded',
        centered && 'container--centered',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Container.displayName = 'Container';