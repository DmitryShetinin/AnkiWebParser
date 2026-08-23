// ProgramSection.styles.ts

// Базовые объекты стилей
export const styles = {
  // ← ЕДИНЫЙ КОНТЕЙНЕР ДЛЯ ВСЕГО
  container: {
    width: '90%',
    padding: '2rem',
    borderRadius: '12px',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: 'var(--text)',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: 'var(--text-secondary)',
    marginBottom: '1rem',
  },
  searchPanel: {
    width: '95%',
    backgroundColor: 'var(--surface)',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    padding: '2rem',
  },
  searchContainer: {
    display: 'flex',
    gap: '0.75rem',
  },
  input: {
    flex: '1',
    padding: '0.875rem 1rem',
    border: '1px solid var(--border)',
    borderRadius: '0.5rem',
    outline: 'none',
    fontSize: '1rem',
    backgroundColor: 'var(--surface)',
    color: 'var(--text)',
    transition: 'border-color 0.2s ease',
  },
  hint: {
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: 'var(--surface)',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    color: 'var(--primary)',
    borderLeft: '3px solid var(--primary)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  notificationsPanel: {
    backgroundColor: 'var(--surface)',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    marginTop: '1.5rem',
  },
  panelHeader: {
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid var(--border)',
    backgroundColor: 'var(--surface)',
  },
  panelTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: 'var(--text)',
  },
  clearButton: {
    color: '#ef4444',
    fontSize: '0.875rem',
    backgroundColor: 'transparent',
    border: '1px solid #fee2e2',
    cursor: 'pointer',
    padding: '0.375rem 0.75rem',
    borderRadius: '0.375rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  notificationsList: {
    padding: '1.5rem',
    height: '400px',
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const,
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '3rem 0',
    color: 'var(--text-secondary)',
  },
  statusButton: {
    backgroundColor: 'var(--primary)',
    color: 'white',
    padding: '0.625rem 1.25rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    marginBottom: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.2s ease',
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  legendContainer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    gap: '1.5rem',
    marginTop: '2rem',
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  serverInfo: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: 'var(--surface)',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    textAlign: 'center' as const,
    border: '1px solid var(--border)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
};

// Функции для динамических стилей
export const getSearchButtonStyle = (disabled: boolean) => ({
  backgroundColor: 'var(--primary)',
  color: 'white',
  padding: '0.875rem 1.75rem',
  borderRadius: '0.5rem',
  fontWeight: '500',
  fontSize: '1rem',
  opacity: disabled ? 0.5 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
  minWidth: '140px',
  border: 'none',
  transition: 'background-color 0.2s ease',
});

export const getStatusBadgeStyle = (connected: boolean) => ({
  display: 'inline-block',
  padding: '0.375rem 0.875rem',
  borderRadius: '0.375rem',
  backgroundColor: connected ? '#d1fae5' : '#fee2e2',
  color: connected ? '#065f46' : '#991b1b',
  fontSize: '0.875rem',
  fontWeight: 500,
  border: `1px solid ${connected ? '#a7f3d0' : '#fecaca'}`,
});

export const getColorBoxStyle = (color: string, borderColor: string) => ({
  width: '16px',
  height: '16px',
  backgroundColor: color,
  border: `1px solid ${borderColor}`,
  borderRadius: '4px',
});