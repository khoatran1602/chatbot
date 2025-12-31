import { useState } from 'react';
import { DebateResponse } from '../types/debate';
import AgentCard from './AgentCard';
import CritiqueCard from './CritiqueCard';
import JudgeCard from './JudgeCard';
import './DebateView.css';

interface DebateViewProps {
  debate: DebateResponse | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Main component for displaying multi-agent debate results.
 * Always shows final answer; toggle reveals full debate transcript.
 */
const DebateView = ({ debate, isLoading, error }: DebateViewProps) => {
  const [showFullDebate, setShowFullDebate] = useState(false);

  // Loading state
  if (isLoading) {
    return (
      <div className="debate-loading">
        <div className="loading-spinner" />
        <p className="loading-text">AI agents are debating your question...</p>
        <p className="loading-text" style={{ fontSize: '0.8rem', opacity: 0.7 }}>
          This may take 30-60 seconds
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="debate-error">
        <h3 className="error-title">⚠️ Debate Failed</h3>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  // No debate yet
  if (!debate) {
    return null;
  }

  // Failed debate
  if (!debate.success) {
    return (
      <div className="debate-error">
        <h3 className="error-title">⚠️ Debate Error</h3>
        <p className="error-message">{debate.errorMessage || 'An unknown error occurred'}</p>
        <p className="error-message" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Request ID: {debate.requestId}
        </p>
      </div>
    );
  }

  return (
    <div className="debate-container">
      {/* Controls */}
      <div className="debate-controls">
        <button
          className={`toggle-button ${showFullDebate ? 'active' : ''}`}
          onClick={() => setShowFullDebate(!showFullDebate)}
        >
          <span className="toggle-icon">{showFullDebate ? '📖' : '📕'}</span>
          {showFullDebate ? 'Hide Debate' : 'Show Debate'}
        </button>
        
        <span className="processing-info">
          ⏱️ {(debate.processingTimeMs / 1000).toFixed(1)}s • 
          🔑 Request: {debate.requestId.substring(0, 8)}...
        </span>
      </div>

      {/* Final Answer (Always Visible) */}
      {debate.judgeSynthesis && (
        <JudgeCard judge={debate.judgeSynthesis} />
      )}

      {/* Full Debate Transcript (Toggle) */}
      {showFullDebate && (
        <>
          {/* Phase 1: Drafts */}
          <div className="debate-phase">
            <div className="phase-header">
              <span className="phase-number">1</span>
              <h3 className="phase-title">Initial Proposals</h3>
            </div>
            <div className="phase-content">
              {debate.agentADraft && (
                <AgentCard
                  agent={debate.agentADraft}
                  title="Agent A — Pragmatic Analyst"
                  accentColor="#3b82f6"
                />
              )}
              {debate.agentBDraft && (
                <AgentCard
                  agent={debate.agentBDraft}
                  title="Agent B — Creative Innovator"
                  accentColor="#8b5cf6"
                />
              )}
            </div>
          </div>

          {/* Phase 2: Critiques */}
          <div className="debate-phase">
            <div className="phase-header">
              <span className="phase-number">2</span>
              <h3 className="phase-title">Cross-Critiques</h3>
            </div>
            <div className="phase-content">
              {debate.agentACritique && (
                <CritiqueCard
                  critique={debate.agentACritique}
                  title="Agent A critiques Agent B"
                  accentColor="#3b82f6"
                />
              )}
              {debate.agentBCritique && (
                <CritiqueCard
                  critique={debate.agentBCritique}
                  title="Agent B critiques Agent A"
                  accentColor="#8b5cf6"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DebateView;
