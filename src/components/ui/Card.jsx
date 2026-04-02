import React from 'react';
import { cn } from '../../lib/utils';
import PropTypes from 'prop-types';

export const Card = ({ children, className, ...props }) => (
  <div
    className={cn(
      'bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const CardHeader = ({ children, className, ...props }) => (
  <div className={cn('px-6 py-4 border-b border-[var(--border)]', className)} {...props}>
    {children}
  </div>
);

CardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const CardContent = ({ children, className, ...props }) => (
  <div className={cn('px-6 py-4', className)} {...props}>{children}</div>
);

CardContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const CardTitle = ({ children, className, ...props }) => (
  <h3 className={cn('text-lg font-semibold text-[var(--text-primary)]', className)} {...props}>
    {children}
  </h3>
);

CardTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
