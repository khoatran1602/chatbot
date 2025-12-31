import { CritiqueOutput } from '../types/debate';
import { Target, MessageSquare } from 'lucide-react';
import './DebateView.css';

interface CritiqueCardProps {
  critique: CritiqueOutput;
  role: string;
  target: string;
  side: 'left' | 'right';
}

/**
 * Displays an agent's critique as a "Chat Bubble" in the Arena.
 */
const CritiqueCard = ({ critique, role, target, side }: CritiqueCardProps) => {
  const isPositive = critique.overallAssessment.toLowerCase() === 'strong';
  const isNegative = critique.overallAssessment.toLowerCase() === 'weak';
  
  const getAssessmentColor = (asst: string) => {
    switch (asst.toLowerCase()) {
      case 'strong': return '#10b981'; // Green
      case 'moderate': return '#f59e0b'; // Amber
      case 'weak': return '#ef4444'; // Red
      default: return '#64748b';
    }
  };

  const badgeColor = getAssessmentColor(critique.overallAssessment);

  return (
    <div className={`arena-card ${side}`}>
      {/* Header */}
      <div className="card-header">
        <div className="agent-identity">
          <MessageSquare size={18} color="#94a3b8" />
          <div>
            <div className="agent-name">{role}</div>
            <div className="critique-target">
              Targeting: <strong>{target}</strong>
            </div>
          </div>
        </div>
        
        <div 
          className="status-badge" 
          style={{ 
            borderColor: badgeColor, 
            color: badgeColor,
            background: `${badgeColor}15`
          }}
        >
          <Target size={12} style={{marginRight: '4px'}}/>
          {critique.overallAssessment}
        </div>
      </div>
      
      {/* Content */}
      <div className="card-body">
        <div className="critique-section strengths">
          <h5>✅ Strengths Acknowledged</h5>
          <p>{critique.strengths}</p>
        </div>
        
        <div className="critique-section weaknesses">
          <h5>⚠️ Vulnerabilities Exposed</h5>
          <p>{critique.weaknesses}</p>
        </div>
        
        <div className="critique-section suggestions">
          <h5>💡 Strategic Pivot</h5>
          <p>{critique.suggestions}</p>
        </div>
      </div>
    </div>
  );
};

export default CritiqueCard;
