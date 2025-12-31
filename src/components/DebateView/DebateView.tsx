import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DebateResponse } from '../types/debate';
import AgentCard from './AgentCard';
import CritiqueCard from './CritiqueCard';
import JudgeCard from './JudgeCard';
import { BookOpen, Book, Clock, Key, AlertTriangle, Play, RefreshCw } from 'lucide-react';
import './DebateView.css';

interface DebateViewProps {
  debate: DebateResponse | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * "The Debate Arena" - Main View
 * 
 * Features:
 * - Split stage layout (Left vs Right)
 * - Animated sequence of events
 * - Game-like "VS" aesthetic
 */
const DebateView = ({ debate, isLoading, error }: DebateViewProps) => {
  const [showFullDebate, setShowFullDebate] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when debate updates
  useEffect(() => {
    if (debate && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [debate]);

  // Loading state
  if (isLoading) {
    return (
      <div className="arena-loading">
        <div className="vs-loader">
          <div className="vs-circle">VS</div>
          <div className="orbit-ring"></div>
        </div>
        <h3 className="loading-title">Orchestrating Debate</h3>
        <p className="loading-subtitle">
          Agent A and Agent B are preparing their arguments...
        </p>
        <div className="loading-steps">
          <span className="step active">Drafting</span>
          <span className="step">Critiquing</span>
          <span className="step">Judging</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="arena-error">
        <AlertTriangle className="error-icon" size={48} />
        <h3 className="error-title">Debate System Failure</h3>
        <p className="error-message">{error}</p>
        <button className="retry-button" onClick={() => window.location.reload()}>
          <RefreshCw size={16} /> Retry
        </button>
      </div>
    );
  }

  // No debate yet
  if (!debate) return null;

  // Failed debate
  if (!debate.success) {
    return (
      <div className="arena-error">
        <AlertTriangle className="error-icon" size={48} />
        <h3 className="error-title">Orchestration Error</h3>
        <p className="error-message">{debate.errorMessage || 'Unknown error'}</p>
        <p className="request-id">ID: {debate.requestId}</p>
      </div>
    );
  }

  return (
    <div className="debate-arena">
      {/* Header / Stats Bar */}
      <motion.div 
        className="arena-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="status-badge success">
           Debate Active
        </div>
        
        <div className="arena-stats">
          <span className="stat-item">
            <Clock size={14} /> {(debate.processingTimeMs / 1000).toFixed(1)}s
          </span>
          <span className="stat-item">
            <Key size={14} /> {debate.requestId.substring(0, 8)}
          </span>
        </div>

        <button
          className={`arena-toggle ${showFullDebate ? 'active' : ''}`}
          onClick={() => setShowFullDebate(!showFullDebate)}
        >
          {showFullDebate ? <BookOpen size={16} /> : <Book size={16} />}
          {showFullDebate ? 'Transcript' : 'Summary'}
        </button>
      </motion.div>

      <AnimatePresence>
        {showFullDebate && (
          <motion.div 
            className="arena-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* ROUND 1: Opening Statements */}
            <div className="stage-round">
              <div className="round-label">ROUND 1: OPENING STATEMENTS</div>
              <div className="battle-row">
                {debate.agentADraft && (
                  <motion.div 
                    className="fighter-column left"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <AgentCard
                      agent={debate.agentADraft}
                      role="Agent A"
                      side="left"
                    />
                  </motion.div>
                )}
                
                <div className="vs-divider">VS</div>

                {debate.agentBDraft && (
                  <motion.div 
                    className="fighter-column right"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <AgentCard
                      agent={debate.agentBDraft}
                      role="Agent B"
                      side="right"
                    />
                  </motion.div>
                )}
              </div>
            </div>

            {/* ROUND 2: Cross Examination */}
            <div className="stage-round">
              <div className="round-label">ROUND 2: CROSS EXAMINATION</div>
              <div className="battle-row reverse">
                 {/* Agent A Critiques B (Left side output, referencing right) */}
                {debate.agentACritique && (
                  <motion.div 
                    className="fighter-column left"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <CritiqueCard
                      critique={debate.agentACritique}
                      role="Agent A (Critique)"
                      target="Agent B"
                      side="left"
                    />
                  </motion.div>
                )}

                {/* Agent B Critiques A */}
                {debate.agentBCritique && (
                  <motion.div 
                    className="fighter-column right"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <CritiqueCard
                      critique={debate.agentBCritique}
                      role="Agent B (Critique)"
                      target="Agent A"
                      side="right"
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Verdict (The Judge) */}
      {debate.judgeSynthesis && (
        <motion.div 
          className="arena-verdict"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.0, type: "spring" }}
        >
          <div className="verdict-label">FINAL VERDICT</div>
          <JudgeCard judge={debate.judgeSynthesis} />
        </motion.div>
      )}
      
      <div ref={bottomRef} />
    </div>
  );
};

export default DebateView;
