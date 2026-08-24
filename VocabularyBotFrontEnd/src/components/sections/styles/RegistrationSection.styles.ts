// src/components/sections/styles/RegistrationSection.styles.ts

export const styles = {
  registrationPanel: {
    width: '90%',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: 'var(--surface)',
    color: 'var(--text)',
    borderRadius: '20px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.02)',
    border: '1px solid var(--border)',
    transition: 'background 0.3s, border-color 0.3s',
  },

  sectionTitle: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: 'var(--text)',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid var(--border)',
    letterSpacing: '-0.025em',
  },

  formContainer: {
    maxWidth: '400px',
    margin: '0 auto',
  },

  fieldGroup: {
    marginBottom: '1rem',
  },

  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: 'var(--text-secondary)',
    fontSize: '0.875rem',
  },

  input: {
    width: '100%',
    padding: '0.7rem 0.9rem',
    border: '1px solid var(--input-border)',
    borderRadius: '12px',
    fontSize: '0.95rem',
    backgroundColor: 'var(--surface)',
    color: 'var(--text)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
    boxSizing: 'border-box' as const,
    '&:focus': {
      borderColor: 'var(--primary)',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.15)',
    },
  },

  registerButton: {
    width: '100%',
    backgroundColor: 'var(--primary)',
    color: 'white',
    padding: '0.85rem',
    borderRadius: '12px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s ease, transform 0.1s ease',
    '&:hover': {
      backgroundColor: 'var(--primary-hover)',
    },
    '&:active': {
      transform: 'scale(0.98)',
    },
  },

  footerText: {
    textAlign: 'center' as const,
    marginTop: '1.25rem',
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
  },

  link: {
    color: 'var(--primary)',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: 'var(--primary-hover)',
      textDecoration: 'underline',
    },
  },
};