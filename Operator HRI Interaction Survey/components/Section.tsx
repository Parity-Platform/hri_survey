import React from 'react';
import { SectionProps } from '../types';

export const Section: React.FC<SectionProps> = ({ title, description, children }) => {
  return (
    <div className="mb-10">
      <div className="mb-6 border-b border-slate-200 pb-2">
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        {description && (
          <p className="text-slate-600 mt-1">{description}</p>
        )}
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};