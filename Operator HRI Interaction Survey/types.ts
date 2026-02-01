import React from 'react';

export interface SurveyResponse {
  department?: string;
  role?: string;
  years_experience?: string;
  interaction_frequency?: string;
  risk_felt?: string;
  risk_description?: string;
  perception_safety?: number;
  perception_predictability?: number;
  perception_trust?: number;
  productivity_impact?: number;
  stress_unexpected?: number;
  mental_load?: number;
  physical_strain?: number;
  training_received?: string;
  training_quality?: number;
  interface_intuitive?: number;
  interface_safety_confidence?: number;
  robot_complexity?: number;
  assistance_frequency?: number;
  mental_effort_monitoring?: number;
  information_overload?: number;
  robot_failure_frequency?: number;
  troubleshooting_ease?: number;
  hmi_recovery_tools?: number;
  improvements_desired?: string;
  bug_report?: string;
  [key: string]: string | number | undefined;
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