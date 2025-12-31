import { JudgeOutput } from '../types/debate';
import { createSafeHtml } from '../utils/sanitize';
import './DebateView.css';

interface JudgeCardProps {
  judge: JudgeOutput;
}

/**
 * Card component displaying the judge's final synthesis.
 */
const JudgeCard = ({ judge }: JudgeCardProps) => {
  return (
    <div className="judge-card">
      <div className="judge-header">
        <div className="judge-icon">⚖️</div>
        <h3 className="judge-title">Final Synthesis</h3>
        <span className="provider-badge judge-badge">
          {judge.providerModel}
        </span>
      </div>
      
      <div className="judge-content">
        <div className="final-answer">
          <div 
            className="answer-text"
            dangerouslySetInnerHTML={createSafeHtml(judge.finalAnswer)}
          />
        </div>
        
        {judge.actionPlan.length > 0 && (
          <div className="judge-section action-plan">
            <h4>📋 Action Plan</h4>
            <ol>
              {judge.actionPlan.map((action, idx) => (
                <li key={idx}>{action}</li>
              ))}
            </ol>
          </div>
        )}
        
        {judge.tradeoffs.length > 0 && (
          <div className="judge-section tradeoffs">
            <h4>⚖️ Trade-offs Considered</h4>
            <ul>
              {judge.tradeoffs.map((tradeoff, idx) => (
                <li key={idx}>{tradeoff}</li>
              ))}
            </ul>
          </div>
        )}
        
        {judge.risks.length > 0 && (
          <div className="judge-section remaining-risks">
            <h4>🔴 Remaining Risks</h4>
            <ul>
              {judge.risks.map((risk, idx) => (
                <li key={idx}>{risk}</li>
              ))}
            </ul>
          </div>
        )}
        
        {judge.rejectedAndWhy.length > 0 && (
          <div className="judge-section rejected">
            <h4>❌ Rejected Ideas</h4>
            <ul>
              {judge.rejectedAndWhy.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default JudgeCard;
