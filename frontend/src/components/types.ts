import { CSSProperties } from 'react';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'outline' | 'ghost';
export type Status = 'default' | 'error' | 'success' | 'warning';

export interface BaseComponentProps {
  className?: string;
  id?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}