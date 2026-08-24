import React from 'react';
import { styles } from '../../components/sections/styles/RegistrationSection.styles.ts';

const RegistrationSection: React.FC = () => {
  return (
    <div style={styles.registrationPanel}>
      <h2 style={styles.sectionTitle}>👤 Регистрация</h2>

      <div style={styles.formContainer}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Имя пользователя</label>
          <input
            type="text"
            style={styles.input}
            placeholder="Введите имя"
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            style={styles.input}
            placeholder="email@example.com"
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Пароль</label>
          <input
            type="password"
            style={styles.input}
            placeholder="Минимум 8 символов"
          />
        </div>

        <button style={styles.registerButton}>
          🚀 Зарегистрироваться
        </button>

        <p style={styles.footerText}>
          Уже есть аккаунт?{' '}
          <a href="#" style={styles.link}>
            Войти
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationSection;