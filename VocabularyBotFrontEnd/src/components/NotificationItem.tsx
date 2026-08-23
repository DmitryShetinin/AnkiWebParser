// components/NotificationItem.tsx
import React from 'react';

interface NotificationItemProps {
  word: string;
  type: 'success' | 'error' | 'info';
  time: string;
  message: string;
  details?: string[];
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  word, 
  type, 
  time, 
  message, 
  details = [] 
}) => {
  const getContainerStyle = () => {
    const base = {
      borderRadius: '0.5rem',
      padding: '0.75rem',
      marginBottom: '0.5rem',
      borderLeft: '4px solid',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    };

    switch (type) {
      case 'success':
        return {
          ...base,
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          borderLeftColor: '#10b981',
        };
      case 'error':
        return {
          ...base,
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          borderLeftColor: '#ef4444',
        };
      default:
        return {
          ...base,
          backgroundColor: 'rgba(59, 130, 246, 0.15)',
          borderLeftColor: 'var(--primary)',
        };
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      default: return 'var(--primary)';
    }
  };

  const getTimeColor = () => {
    switch (type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      default: return 'var(--primary)';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅ ';
      case 'error': return '❌ ';
      case 'info': return 'ℹ️ ';
      default: return '';
    }
  };

  return (
    <div style={getContainerStyle()}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{
            fontSize: '1rem',
            fontWeight: 'bold',
            color: getTextColor(),
            marginBottom: '0.25rem',
          }}>
            {getIcon()}
            {word}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            marginBottom: '0.5rem',
          }}>
            {time}
          </div>
        </div>
      </div>
      
      <div style={{
        fontSize: '0.875rem',
        color: 'var(--text)',
        marginBottom: details.length > 0 ? '0.25rem' : '0',
      }}>
        {message}
      </div>
      
      {details.length > 0 && (
        <div style={{
          marginTop: '0.5rem',
          paddingTop: '0.5rem',
          borderTop: `1px solid var(--border)`,
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          maxHeight: '150px',
          overflowY: 'auto',
        }}>
          {details.map((detail, idx) => (
            <div key={idx} style={{ marginBottom: '0.25rem' }}>
              • {detail}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationItem;