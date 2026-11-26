import React, { useState } from 'react';
import { styles } from '../../components/sections/styles/RegistrationSection.styles.ts';
import { useAuth } from '../../auth/AuthProvider.tsx';

const RegistrationSection: React.FC = () => {
  const { login, register } = useAuth();

  // Состояние формы
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Сброс формы при переключении
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setEmail('');
    setPassword('');
    setMessage(null);
  };

  // Логин
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login({ email, password });

      // Очистка формы
      setEmail('');
      setPassword('');
    } catch (error: any) {
      let errorMessage = 'Ошибка входа. Проверьте email и пароль.';
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.data?.title || errorMessage;
        if (error.response.data?.errors) {
          const details = Object.values(error.response.data.errors).flat().join(' ');
          errorMessage = details || errorMessage;
        }
      } else if (error.request) {
        errorMessage = 'Сервер не отвечает. Проверьте подключение.';
      } else {
        errorMessage = error.message;
      }

      setMessage({ type: 'error', text: `❌ ${errorMessage}` });
    } finally {
      setIsLoading(false);
    }
  };

  // Регистрация
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register({ username, email, password });
      setMessage({
        type: 'success',
        text: '✅ Регистрация прошла успешно. Теперь войдите в аккаунт.',
      });
      setIsLogin(true);

      // Очистка формы
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      let errorMessage = 'Ошибка регистрации. Попробуйте позже.';
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.data?.title || errorMessage;
        if (error.response.data?.errors) {
          const details = Object.values(error.response.data.errors).flat().join(' ');
          errorMessage = details || errorMessage;
        }
      } else if (error.request) {
        errorMessage = 'Сервер не отвечает. Проверьте подключение.';
      } else {
        errorMessage = error.message;
      }

      setMessage({ type: 'error', text: `❌ ${errorMessage}` });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = isLogin ? handleLogin : handleRegister;

  return (
    <div style={styles.registrationPanel}>
      <h2 style={styles.sectionTitle}>
        {isLogin ? '🔐 Вход' : '👤 Регистрация'}
      </h2>

      <form onSubmit={handleSubmit} style={styles.formContainer}>
        {message && (
          <p style={{ color: message.type === 'success' ? '#16a34a' : '#dc2626' }}>
            {message.text}
          </p>
        )}
        {/* Поле username — только для регистрации */}
        {!isLogin && (
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Имя пользователя</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Введите имя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        )}

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            style={styles.input}
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Пароль</label>
          <input
            type="password"
            style={styles.input}
            placeholder={isLogin ? 'Введите пароль' : 'Минимум 8 символов'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
            minLength={isLogin ? 1 : 8}
          />
        </div>

        <button
          type="submit"
          style={{
            ...styles.registerButton,
            opacity: isLoading ? 0.7 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
          disabled={isLoading}
        >
          {isLoading ? '⏳ Загрузка...' : isLogin ? '🚀 Войти' : '🚀 Зарегистрироваться'}
        </button>

        <p style={styles.footerText}>
          {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <button
            type="button"
            style={{ ...styles.link, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            onClick={toggleMode}
          >
            {isLogin ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegistrationSection;
