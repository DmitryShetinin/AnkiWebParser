export const styles = {
  aboutPanel: {
    width: '100%',
    margin: 0,
    boxSizing: 'border-box',
    padding: '2rem',
    backgroundColor: 'var(--surface)',
    color: 'var(--text)',
    borderRadius: '20px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.02)',
    border: '1px solid var(--border)',
    transition: 'background 0.3s, border-color 0.3s',
  },

  sectionHeader: {
   
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    paddingBottom: '1.25rem',
    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
  },

  sectionIcon: {
    fontSize: '2rem',
    background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
    borderRadius: '16px',
    width: '3.5rem',
    height: '3.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    flexShrink: 0,
  },

  sectionTitle: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: 'var(--text)',
    margin: 0,
    background: 'linear-gradient(to right, var(--text), var(--primary))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  sectionSubtitle: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    marginTop: '0.25rem',
    marginBottom: 0,
  },

  descriptionBox: {
    backgroundColor: 'var(--surface)',
    borderRadius: '16px',
    padding: '1.5rem',
    marginBottom: '2rem',
    border: '1px solid rgba(0, 0, 0, 0.04)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
  },

  descriptionText: {
    fontSize: '1.125rem',
    color: 'var(--text)',
    margin: 0,
    lineHeight: '1.6',
  },

  descriptionSecondary: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    margin: '0.75rem 0 0',
    lineHeight: '1.6',
  },

  sectionHeading: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--text)',
    marginBottom: '1rem',
    marginTop: '2rem',
  },

  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },

  featureCard: {
    display: 'flex',
    gap: '1rem',
    padding: '1.25rem',
    backgroundColor: 'var(--surface)',
    border: '1px solid rgba(0, 0, 0, 0.04)',
    borderRadius: '16px',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
  },

  featureIcon: {
    fontSize: '1.75rem',
    flexShrink: 0,
  },

  featureContent: {
    minWidth: 0,
  },

  featureTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text)',
    margin: '0 0 0.4rem',
  },

  featureDescription: {
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
    margin: 0,
  },

  techGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '0.75rem',
    marginBottom: '2rem',
  },

  techCard: {
    backgroundColor: 'var(--surface)',
    border: '1px solid rgba(0, 0, 0, 0.04)',
    borderRadius: '16px',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
  },

  techIcon: {
    fontSize: '1.75rem',
    marginBottom: '0.5rem',
  },

  techName: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--text)',
  },

  techDescription: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    marginTop: '0.25rem',
  },

  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid rgba(0, 0, 0, 0.06)',
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
  },

  footerDescription: {
    marginTop: '0.25rem',
  },

  version: {
    backgroundColor: 'var(--primary)',
    color: '#ffffff',
    padding: '0.375rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
};
