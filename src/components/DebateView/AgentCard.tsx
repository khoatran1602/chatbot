import { AgentOutput } from '../types/debate';
import { createSafeHtml } from '../utils/sanitize';
import './DebateView.css';

interface AgentCardProps {
  agent: AgentOutput;
  title: string;
  accentColor: string;
}

/**
 * Card component displaying an AI agent's proposal.
 */
const AgentCard = ({ agent, title, accentColor }: AgentCardProps) => {
  return (
    <div className="agent-card" style={{ borderLeftColor: accentColor }}>
      <div className="agent-header">
        <h4 className="agent-title">{title}</h4>
        <span className="provider-badge" style={{ backgroundColor: accentColor }}>
          {agent.providerModel}
        </span>
      </div>
      
      <div className="agent-content">
        <div className="proposal-section">
          <h5>Proposal</h5>
          <div 
            className="proposal-text"
            dangerouslySetInnerHTML={createSafeHtml(agent.proposal)}
          />
        </div>
        
        {agent.assumptions.length > 0 && (
          <div className="list-section">
            <h5>Assumptions</h5>
            <ul>
              {agent.assumptions.map((assumption, idx) => (
                <li key={idx}>{assumption}</li>
              ))}
            </ul>
          </div>
        )}
        
        {agent.risks.length > 0 && (
          <div className="list-section risks">
            <h5>Risks Identified</h5>
            <ul>
              {agent.risks.map((risk, idx) => (
                <li key={idx}>{risk}</li>
              ))}
            </ul>
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
