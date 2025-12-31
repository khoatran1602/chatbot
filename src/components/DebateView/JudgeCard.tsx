import { JudgeOutput } from '../types/debate';
import { createSafeHtml } from '../utils/sanitize';
import { Gavel, CheckCircle2, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';
import './DebateView.css';

interface JudgeCardProps {
  judge: JudgeOutput;
}

/**
 * Displays the Judge's final verdict.
 */
const JudgeCard = ({ judge }: JudgeCardProps) => {
  return (
    <div className="judge-container">
      {/* Verdict Header */}
      <div className="judge-verdict-title">
        <Gavel size={28} style={{marginRight: '12px', display: 'inline-block', verticalAlign: 'middle'}} />
        Final Synthesis
      </div>
      
      <div className="judge-content">
        <div className="final-answer">
          <div 
            className="answer-text"
            dangerouslySetInnerHTML={createSafeHtml(judge.finalAnswer)}
          />
        </div>
        
        <div className="battle-row" style={{ marginTop: '2rem', gap: '2rem' }}>
           {/* Left Column: Action Plan */}
           {judge.actionPlan.length > 0 && (
            <div className="fighter-column">
              <div className="judge-section action-plan">
                <h4 style={{ display: 'flex', alignItems: 'center', color: '#10b981' }}>
                  <CheckCircle2 size={18} style={{ marginRight: '8px' }} /> 
                  Action Plan
                </h4>
                <ol>
                  {judge.actionPlan.map((action, idx) => (
                    <li key={idx}>{action}</li>
                  ))}
                </ol>
              </div>
            </div>
           )}

           {/* Right Column: Tradeoffs & Risks */}
           <div className="fighter-column">
             {judge.tradeoffs.length > 0 && (
              <div className="judge-section tradeoffs" style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', color: '#3b82f6' }}>
                  <ArrowRight size={18} style={{ marginRight: '8px' }} />
                  Trade-offs
                </h4>
                <ul>
                  {judge.tradeoffs.map((tradeoff, idx) => (
                    <li key={idx}>{tradeoff}</li>
                  ))}
                </ul>
              </div>
             )}
             
             {judge.risks.length > 0 && (
              <div className="judge-section remaining-risks">
                <h4 style={{ display: 'flex', alignItems: 'center', color: '#f59e0b' }}>
                  <AlertTriangle size={18} style={{ marginRight: '8px' }} />
                  Remaining Risks
                </h4>
                <ul>
                  {judge.risks.map((risk, idx) => (
                    <li key={idx}>{risk}</li>
                  ))}
                </ul>
              </div>
             )}
           </div>
        </div>
        
        {judge.rejectedAndWhy.length > 0 && (
          <div className="judge-section rejected" style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', color: '#64748b' }}>
              <XCircle size={18} style={{ marginRight: '8px' }} />
              Rejected Proposals
            </h4>
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
