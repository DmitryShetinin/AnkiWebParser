import React from 'react';

const RegistrationSection: React.FC = () => {
  const styles = {
    registrationPanel: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      padding: '2rem',
      marginTop: '1.5rem'
    },
    
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '1.5rem',
      paddingBottom: '0.75rem',
      borderBottom: '1px solid #f3f4f6'
    }
  };

  return (
    <div style={styles.registrationPanel}>
      <h2 style={styles.sectionTitle}>👤 Регистрация</h2>
      
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
            Имя пользователя
          </label>
          <input 
            type="text" 
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem'
            }}
            placeholder="Введите имя"
          />
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: '-block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
            Email
          </label>
          <input 
            type="email" 
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem'
            }}
            placeholder="email@example.com"
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
            Пароль
          </label>
          <input 
            type="password" 
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem'
            }}
            placeholder="Минимум 8 символов"
          />
        </div>
        
        <button
          style={{
            width: '100%',
            backgroundColor: '#10b981',
            color: 'white',
            padding: '0.875rem',
            borderRadius: '0.5rem',
            border: 'none',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          🚀 Зарегистрироваться
        </button>
        
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
          Уже есть аккаунт? <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Войти</a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationSection;