import React from 'react';

export interface SurveyResponse {
  department?: string;
  operation_size?: string;
  employees_interacting?: string;
  adoption_reasons?: string;
  impact_productivity?: number;
  impact_safety?: number;
  impact_quality?: number;
  impact_satisfaction?: number;
  impact_cost?: number;
  supervisor_responsibility_changes?: string[];
  team_adaptation_rating?: number;
  critical_support_needed?: string[];
  integration_improvements?: string[];
  [key: string]: string | number | string[] | undefined;
}

export enum LikertOption {
  StronglyDisagree = 1,
  Disagree = 2,
  Neutral = 3,
  Agree = 4,
  StronglyAgree = 5,
}

export interface LikertQuestionProps {
  id: string;
  question: string;
  value: number | undefined;
  onChange: (id: string, value: number | undefined) => void;
  required?: boolean;
  labels?: string[];
}

export interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}