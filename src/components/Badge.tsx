import React from 'react';
import { BadgeProps } from '../utils/entity/CommonEntity';

const Badge: React.FC<BadgeProps> = ({ label, icon, color, className, ...props }) => {
  return (
    <span
      className={`badge bg-${color} align-items-center ${className}`}
      style={{ fontSize: '0.75rem' }}
      {...props}
    >
      {icon && <span className="me-1">{icon}</span>}
      {label}
    </span>
  );
};

export default Badge;

