import React from 'react';
import { CardProps } from '../utils/entity/CommonEntity';

const CardComponent: React.FC<CardProps> = ({ header, title, description, content, footer, className, ...props }) => {
  return (
    <div className={`card shadow-lg rounded-3 p-3 mb-5 bg-white ${className}`}{...props}>
      {header && <div className="card-header border-0 bg-white">{header}</div>}
      <div className="card-body bg-white">
        {title && <h5 className="card-title bg-white">{title}</h5>}
        {description && <div className="card-text bg-white">{description}</div>}
        <div className="card-text bg-white">{content}</div>
      </div>
      {footer && <div className="card-footer border-0 text-muted bg-white">{footer}</div>}
    </div>
  );
};

export default CardComponent;
