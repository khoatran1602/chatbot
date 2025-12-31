import { AgentOutput } from '../types/debate';
import { createSafeHtml } from '../utils/sanitize';
import { Bot, User } from 'lucide-react';
import './DebateView.css';

interface AgentCardProps {
  agent: AgentOutput;
  role: string;
  side: 'left' | 'right';
}

/**
 * Displays an agent's proposal as a "Chat Bubble" in the Arena.
 */
const AgentCard = ({ agent, role, side }: AgentCardProps) => {
  const avatarClass = side === 'left' ? 'A' : 'B';
  
  // Parse providerModel (e.g. "openai/gpt-4")
  const [provider, model] = agent.providerModel.split('/');
  const providerDisplay = provider ? provider.toUpperCase() : 'UNKNOWN';
  const modelDisplay = model || agent.providerModel;
  
  return (
    <div className={`arena-card ${side}`}>
      {/* Identity Header */}
      <div className="card-header">
        <div className="agent-identity">
          <div className={`agent-avatar ${avatarClass}`}>
            {side === 'left' ? 'A' : 'B'}
          </div>
          <div>
            <div className="agent-name">{role}</div>
            <span className="agent-model">
              {providerDisplay} / {modelDisplay}
            </span>
          </div>
        </div>
        {side === 'left' ? <Bot size={20} color="#3b82f6" /> : <User size={20} color="#8b5cf6" />}
      </div>

      {/* Content Body */}
      <div className="card-body">
        {/* Proposal */}
        <div className="proposal-section">
          <h5>Core Proposal</h5>
          <div 
            className="proposal-text"
            dangerouslySetInnerHTML={createSafeHtml(agent.proposal)} 
          />
        </div>

        {/* Assumptions/Risks */}
        {(agent.assumptions.length > 0 || agent.risks.length > 0) && (
          <div className="analysis-grid">
            {agent.assumptions.length > 0 && (
              <div className="list-section">
                <h5>Key Assumptions</h5>
                <ul>
                  {agent.assumptions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {agent.risks.length > 0 && (
              <div className="list-section risks">
                <h5>Potential Risks</h5>
                <ul>
                  {agent.risks.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {agent.shortRationale && (
          <div className="rationale-section">
            <h5>Rationale</h5>
            <p className="rationale-text">{agent.shortRationale}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentCard;
