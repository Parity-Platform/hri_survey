import React from 'react';
import { LikertQuestionProps, LikertOption } from '../types';

export const LikertQuestion: React.FC<LikertQuestionProps> = ({ 
  id, 
  question, 
  value, 
  onChange, 
  required = false,
  labels
}) => {
  const defaultLabels = [
    'Strongly Disagree',
    'Disagree',
    'Neutral',
    'Agree',
    'Strongly Agree'
  ];

  const currentLabels = labels && labels.length === 5 ? labels : defaultLabels;

  const options = currentLabels.map((label, index) => ({
    value: index + 1,
    label: label
  }));

  return (
    <div className="mb-8 p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <label className="block text-lg font-medium text-slate-800 mb-4">
        {question} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
        {options.map((option) => (
          <label 
            key={option.value} 
            className={`
              flex-1 flex sm:flex-col items-center p-3 rounded cursor-pointer border transition-colors select-none
              ${value === option.value 
                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                : 'bg-slate-50 border-transparent hover:bg-slate-100'}
            `}
          >
            <input
              type="radio"
              name={id}
              value={option.value}
              checked={value === option.value}
              onClick={() => {
                if (value === option.value) {
                  onChange(id, undefined);
                } else {
                  onChange(id, option.value);
                }
              }}
              onChange={() => {}} // Controlled component requirement
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 mb-0 sm:mb-2 order-1 sm:order-none"
              required={required && value === undefined}
            />
            <span className="text-sm text-center ml-2 sm:ml-0">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};