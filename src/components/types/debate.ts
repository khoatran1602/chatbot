/**
 * Types for multi-agent debate feature.
 */

export interface AgentOutput {
  proposal: string;
  assumptions: string[];
  risks: string[];
  shortRationale: string;
  providerModel: string;
}

export interface CritiqueOutput {
  strengths: string;
  weaknesses: string;
  suggestions: string;
  overallAssessment: 'strong' | 'moderate' | 'weak' | 'unknown';
  providerModel: string;
}

export interface JudgeOutput {
  finalAnswer: string;
  actionPlan: string[];
  tradeoffs: string[];
  risks: string[];
  rejectedAndWhy: string[];
  providerModel: string;
}

export interface DebateRequest {
  question: string;
  context?: string;
  agentAProvider?: 'openai' | 'gemini';
  agentBProvider?: 'openai' | 'gemini';
  judgeProvider?: 'openai' | 'gemini';
}

export interface DebateResponse {
  requestId: string;
  question: string;
  agentADraft: AgentOutput | null;
  agentBDraft: AgentOutput | null;
  agentACritique: CritiqueOutput | null;
  agentBCritique: CritiqueOutput | null;
  judgeSynthesis: JudgeOutput | null;
  processingTimeMs: number;
  completedAt: string;
  success: boolean;
  errorMessage?: string;
}

export interface ProviderStatus {
  openai: boolean;
  gemini: boolean;
}
