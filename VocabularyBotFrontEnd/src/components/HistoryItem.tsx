import React from 'react';

interface HistoryItemProps {
  word: string;
  phonetic?: string;
  definition?: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
  status: 'success' | 'error' | 'warning';
  timestamp: Date;
  addedToAnki: boolean;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  word,
  phonetic,
  definition,
  example,
  synonyms,
  antonyms,
  status,
  timestamp,
  addedToAnki,
}) => {
  const getContainerStyle = () => {
    const base = {
      padding: '1rem',
      marginBottom: '0.75rem',
      borderRadius: '8px',
      borderLeft: '4px solid',
      backgroundColor: 'var(--surface)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      transition: 'all 0.2s ease',
    };
    if (status === 'error') return { ...base, borderLeftColor: '#ef4444' };
    if (addedToAnki) return { ...base, borderLeftColor: '#10b981' };
    return { ...base, borderLeftColor: 'var(--primary)' };
  };

  const getStatusIcon = () => {
    if (status === 'error') return '❌';
    if (addedToAnki) return '✅';
    return '🔍';
  };

  const getStatusText = () => {
    if (status === 'error') return 'Слово не найдено';
    if (addedToAnki) return 'Добавлено в Anki';
    return 'Найдено';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div style={getContainerStyle()}>
      {/* Верхняя строка: слово и статус */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.25rem' }}>{getStatusIcon()}</span>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'var(--text)', margin: 0 }}>
              {word}
            </h3>
            {phonetic && (
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                /{phonetic}/
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem', marginBottom: 0 }}>
            {getStatusText()}
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {formatTime(timestamp)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {formatDate(timestamp)}
          </div>
        </div>
      </div>

      {/* Контент ТОЛЬКО если слово найдено */}
      {status !== 'error' && (
        <div style={{ marginTop: '0.75rem' }}>
          {definition && (
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: '600', color: 'var(--text)', fontSize: '0.875rem' }}>
                Значение:
              </span>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', marginBottom: 0 }}>
                {definition}
              </p>
            </div>
          )}

          {example && (
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: '600', color: 'var(--text)', fontSize: '0.875rem' }}>
                Пример:
              </span>
              <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.25rem', marginBottom: 0 }}>
                "{example}"
              </p>
            </div>
          )}

          {/* Синонимы и антонимы */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            {synonyms && synonyms.length > 0 && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                backgroundColor: 'var(--surface)',
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                border: '1px solid var(--border)',
              }}>
                <span>🔄</span>
                <span>{synonyms.slice(0, 3).join(', ')}</span>
                {synonyms.length > 3 && (
                  <span style={{ color: 'var(--primary)' }}>+{synonyms.length - 3}</span>
                )}
              </span>
            )}

            {antonyms && antonyms.length > 0 && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                backgroundColor: 'var(--surface)',
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                border: '1px solid var(--border)',
              }}>
                <span>⚡</span>
                <span>{antonyms.slice(0, 2).join(', ')}</span>
                {antonyms.length > 2 && (
                  <span style={{ color: 'var(--primary)' }}>+{antonyms.length - 2}</span>
                )}
              </span>
            )}

            {(synonyms?.length || antonyms?.length) && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                backgroundColor: 'var(--surface)',
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                border: '1px solid var(--border)',
              }}>
                <span>🔗</span>
                <span>Однокоренные</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Разделитель */}
      <div style={{ borderTop: '1px solid var(--border)', marginTop: '0.75rem', paddingTop: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            Статус: <span style={{ fontWeight: '500', color: 'var(--text)' }}>{getStatusText()}</span>
          </span>
          <span style={{ color: 'var(--text-secondary)' }}>
            {addedToAnki ? '✅ Готово' : '⏳ В процессе'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;