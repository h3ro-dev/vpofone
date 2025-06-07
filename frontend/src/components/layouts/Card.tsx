import React from 'react';
import clsx from 'clsx';
import { BaseComponentProps, Size } from '../types';
import './Card.css';

export interface CardProps extends BaseComponentProps {
  children: React.ReactNode;
  padding?: Size | 'none';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  border?: boolean;
  clickable?: boolean;
  as?: keyof JSX.IntrinsicElements;
  onClick?: (event: React.MouseEvent) => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  shadow = 'md',
  hover = false,
  border = true,
  clickable = false,
  as: Component = 'div',
  onClick,
  ...props
}) => {
  return (
    <Component
      className={clsx(
        'card',
        `card--padding-${padding}`,
        `card--shadow-${shadow}`,
        border && 'card--border',
        (hover || clickable || onClick) && 'card--hoverable',
        (clickable || onClick) && 'card--clickable',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};

Card.displayName = 'Card';

// Card Header Component
export interface CardHeaderProps extends BaseComponentProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={clsx('card-header', className)}
      {...props}
    >
      {children}
    </Component>
  );
};

CardHeader.displayName = 'CardHeader';

// Card Body Component
export interface CardBodyProps extends BaseComponentProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className,
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={clsx('card-body', className)}
      {...props}
    >
      {children}
    </Component>
  );
};

CardBody.displayName = 'CardBody';

// Card Footer Component
export interface CardFooterProps extends BaseComponentProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={clsx('card-footer', className)}
      {...props}
    >
      {children}
    </Component>
  );
};

CardFooter.displayName = 'CardFooter';