import { CritiqueOutput } from '../types/debate';
import './DebateView.css';

interface CritiqueCardProps {
  critique: CritiqueOutput;
  title: string;
  accentColor: string;
}

/**
 * Card component displaying an agent's critique of another agent's proposal.
 */
const CritiqueCard = ({ critique, title, accentColor }: CritiqueCardProps) => {
  const getAssessmentStyle = (assessment: string) => {
    switch (assessment.toLowerCase()) {
      case 'strong':
        return { backgroundColor: '#22c55e', color: 'white' };
      case 'moderate':
        return { backgroundColor: '#f59e0b', color: 'white' };
      case 'weak':
        return { backgroundColor: '#ef4444', color: 'white' };
      default:
        return { backgroundColor: '#6b7280', color: 'white' };
    }
  };

  return (
    <div className="critique-card" style={{ borderLeftColor: accentColor }}>
      <div className="critique-header">
        <h4 className="critique-title">{title}</h4>
        <div className="critique-badges">
          <span 
            className="assessment-badge"
            style={getAssessmentStyle(critique.overallAssessment)}
          >
            {critique.overallAssessment}
          </span>
          <span className="provider-badge-small">
            {critique.providerModel}
          </span>
        </div>
      </div>
      
      <div className="critique-content">
        <div className="critique-section strengths">
          <h5>💪 Strengths</h5>
          <p>{critique.strengths}</p>
        </div>
        
        <div className="critique-section weaknesses">
          <h5>⚠️ Weaknesses</h5>
          <p>{critique.weaknesses}</p>
        </div>
        
        <div className="critique-section suggestions">
          <h5>💡 Suggestions</h5>
          <p>{critique.suggestions}</p>
        </div>
      </div>
    </div>
  );
};

export default CritiqueCard;
