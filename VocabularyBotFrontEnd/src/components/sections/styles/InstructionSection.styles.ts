export const styles = {
  instructionPanel: {
    width: '100%',
    margin: 0,
    boxSizing: 'border-box' as const,
    padding: '2rem',
    backgroundColor: 'var(--surface)',
    color: 'var(--text)',
    borderRadius: '20px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.02)',
    border: '1px solid var(--border)',
    transition: 'background 0.3s, border-color 0.3s',
  },

  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: '0 0 24px 0',
    fontSize: '24px',
    fontWeight: '700',
    color: 'var(--text)',
  },

  flowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
    gap: '10px',
    padding: '20px',
    marginBottom: '24px',
    borderRadius: '16px',
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
  },

  flowItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    minWidth: '70px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text)',
  },

  flowIcon: {
    fontSize: '28px',
    lineHeight: '1',
  },

  flowArrow: {
    fontSize: '22px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
  },

  stepContainer: {
    marginBottom: '16px',
    padding: '18px',
    borderRadius: '14px',
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
  },

  stepTitle: {
    margin: '0 0 12px 0',
    fontSize: '18px',
    fontWeight: '700',
    color: 'var(--text)',
  },

  stepContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },

  stepItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    fontSize: '15px',
    lineHeight: '1.5',
    color: 'var(--text-secondary)',
  },

  bullet: {
    flexShrink: 0,
    fontWeight: '700',
    color: 'var(--primary)',
  },

  tipBox: {
    padding: '16px 20px',
    marginTop: '8px',
    borderRadius: '14px',
    backgroundColor: 'rgba(59, 130, 246, 0.04)',
    border: '1px solid rgba(59, 130, 246, 0.15)',
    fontSize: '15px',
    lineHeight: '1.5',
    color: 'var(--text)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.01)',
  },
};
