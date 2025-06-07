import React from 'react';
import clsx from 'clsx';
import { BaseComponentProps, Size } from '../types';
import './Grid.css';

export interface GridProps extends BaseComponentProps {
  children: React.ReactNode;
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: Size | 'none';
  rowGap?: Size | 'none';
  columnGap?: Size | 'none';
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
  as?: keyof JSX.IntrinsicElements;
}

export const Grid: React.FC<GridProps> = ({
  children,
  className,
  columns = 1,
  gap,
  rowGap,
  columnGap,
  alignItems = 'stretch',
  justifyItems = 'stretch',
  as: Component = 'div',
  style,
  ...props
}) => {
  const gridStyle: React.CSSProperties & Record<string, any> = {
    ...style,
  };

  // Handle responsive columns
  if (typeof columns === 'object') {
    const { sm, md, lg, xl } = columns;
    gridStyle['--grid-columns-base'] = '1';
    if (sm) gridStyle['--grid-columns-sm'] = sm.toString();
    if (md) gridStyle['--grid-columns-md'] = md.toString();
    if (lg) gridStyle['--grid-columns-lg'] = lg.toString();
    if (xl) gridStyle['--grid-columns-xl'] = xl.toString();
  } else {
    gridStyle['--grid-columns'] = columns.toString();
  }

  return (
    <Component
      className={clsx(
        'grid',
        typeof columns === 'object' && 'grid--responsive',
        gap && `grid--gap-${gap}`,
        rowGap && `grid--row-gap-${rowGap}`,
        columnGap && `grid--column-gap-${columnGap}`,
        `grid--align-${alignItems}`,
        `grid--justify-${justifyItems}`,
        className
      )}
      style={gridStyle}
      {...props}
    >
      {children}
    </Component>
  );
};

Grid.displayName = 'Grid';

// Grid Item Component
export interface GridItemProps extends BaseComponentProps {
  children: React.ReactNode;
  span?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  start?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  end?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  as?: keyof JSX.IntrinsicElements;
}

export const GridItem: React.FC<GridItemProps> = ({
  children,
  className,
  span,
  start,
  end,
  as: Component = 'div',
  style,
  ...props
}) => {
  const itemStyle: React.CSSProperties & Record<string, any> = {
    ...style,
  };

  // Handle responsive span
  if (span) {
    if (typeof span === 'object') {
      const { sm, md, lg, xl } = span;
      if (sm) itemStyle['--grid-span-sm'] = sm.toString();
      if (md) itemStyle['--grid-span-md'] = md.toString();
      if (lg) itemStyle['--grid-span-lg'] = lg.toString();
      if (xl) itemStyle['--grid-span-xl'] = xl.toString();
    } else {
      itemStyle.gridColumn = `span ${span}`;
    }
  }

  // Handle responsive start
  if (start) {
    if (typeof start === 'object') {
      const { sm, md, lg, xl } = start;
      if (sm) itemStyle['--grid-start-sm'] = sm.toString();
      if (md) itemStyle['--grid-start-md'] = md.toString();
      if (lg) itemStyle['--grid-start-lg'] = lg.toString();
      if (xl) itemStyle['--grid-start-xl'] = xl.toString();
    } else {
      itemStyle.gridColumnStart = start;
    }
  }

  // Handle responsive end
  if (end) {
    if (typeof end === 'object') {
      const { sm, md, lg, xl } = end;
      if (sm) itemStyle['--grid-end-sm'] = sm.toString();
      if (md) itemStyle['--grid-end-md'] = md.toString();
      if (lg) itemStyle['--grid-end-lg'] = lg.toString();
      if (xl) itemStyle['--grid-end-xl'] = xl.toString();
    } else {
      itemStyle.gridColumnEnd = end;
    }
  }

  return (
    <Component
      className={clsx(
        'grid-item',
        (span && typeof span === 'object') && 'grid-item--responsive-span',
        (start && typeof start === 'object') && 'grid-item--responsive-start',
        (end && typeof end === 'object') && 'grid-item--responsive-end',
        className
      )}
      style={itemStyle}
      {...props}
    >
      {children}
    </Component>
  );
};

GridItem.displayName = 'GridItem';