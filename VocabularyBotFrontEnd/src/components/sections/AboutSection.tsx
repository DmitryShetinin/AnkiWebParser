import React from 'react';
import { styles } from './styles/AboutSection.styles.ts';

const AboutSection: React.FC = () => {
    const features = [
        {
       
            title: 'Поиск слов',
            description:
                'Введите английское слово и получите информацию о его значении и употреблении.'
        },
        {
   
            title: 'Подробная информация',
            description:
                'Карточка может содержать значение, часть речи, примеры, синонимы, антонимы и связанные слова.'
        },
        {
        
            title: 'Интеграция с Anki',
            description:
                'Готовые карточки автоматически отправляются в выбранную колоду Anki.'
        },
        {
      
            title: 'Без дубликатов',
            description:
                'Повторное добавление уже существующей карточки не создаёт новую копию.'
        },
        {
      
            title: 'Настройки',
            description:
                'Можно настроить количество данных в карточках, параметры Anki и внешний вид карточек.'
        }
    ];

    const technologies = [
        {
            name: 'React',
            icon: '⚛️',
            description: 'Frontend'
        },
        {
            name: 'TypeScript',
            icon: '📘',
            description: 'Frontend'
        },
        {
            name: '.NET',
            icon: '🖥️',
            description: 'Backend'
        },
        {
            name: 'PostgreSQL',
            icon: '🐘',
            description: 'Database'
        },
        {
            name: 'AnkiConnect',
            icon: '🔗',
            description: 'Anki integration'
        },
        {
            name: 'Merriam-Webster',
            icon: '📚',
            description: 'Dictionary API'
        }
    ];

    return (
        <div style={styles.aboutPanel}>

            {/* Header */}
            <div style={styles.sectionHeader}>
                <div style={styles.sectionIcon}>
                    📖
                </div>

                <div>
                    <h2 style={styles.sectionTitle}>
                        О Vocabulary Bot
                    </h2>

                    <p style={styles.sectionSubtitle}>
                        Автоматическое создание карточек для изучения английского
                    </p>
                </div>
            </div>

            {/* Description */}
            <div style={styles.descriptionBox}>
                <p style={styles.descriptionText}>
                    <strong>Vocabulary Bot</strong> помогает быстро превращать
                    английские слова в готовые карточки Anki.
                </p>

                <p style={styles.descriptionSecondary}>
                    Вы вводите слово → сервис получает данные из словаря →
                    формирует карточку → отправляет её в Anki.
                </p>
            </div>

            {/* Features */}
            <h3 style={styles.sectionHeading}>
                ✨ Возможности
            </h3>

            <div style={styles.featureGrid}>
                {features.map((feature, index) => (
                    <div
                        key={index}
                        style={styles.featureCard}
                    >
                        <div style={styles.featureIcon}>
                            {feature.icon}
                        </div>

                        <div style={styles.featureContent}>
                            <h4 style={styles.featureTitle}>
                                {feature.title}
                            </h4>

                            <p style={styles.featureDescription}>
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Technologies */}
            <h3 style={styles.sectionHeading}>
                🛠️ Технологии
            </h3>

            <div style={styles.techGrid}>
                {technologies.map((technology, index) => (
                    <div
                        key={index}
                        style={styles.techCard}
                    >
                        <div style={styles.techIcon}>
                            {technology.icon}
                        </div>

                        <div style={styles.techName}>
                            {technology.name}
                        </div>

                        <div style={styles.techDescription}>
                            {technology.description}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div style={styles.footer}>
                <div>
                    <strong>Vocabulary Bot</strong>
                    <div style={styles.footerDescription}>
                        Инструмент для изучения английского языка
                    </div>
                </div>

                <div style={styles.version}>
                    v1.0.0
                </div>
            </div>

        </div>
    );
};

export default AboutSection;