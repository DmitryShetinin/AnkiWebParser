import React from 'react';
import { styles } from './styles/InstructionSection.styles.ts';

const InstructionSection: React.FC = () => {
    const instructions = [
        {
            title: '🔍 1. Добавление слова',
            content: [
                '✏️ Введите английское слово в поле поиска.',
                '⏎ Нажмите Enter или кнопку «Найти и добавить».',
                '🔄 Дождитесь завершения обработки.'
            ]
        },
        {
            title: '📚 2. Обработка слова',
            content: [
                'Сервис получает данные из словаря.',
                '📖 Значение и часть речи.',
                '💬 Примеры употребления.',
                '🔄 Синонимы и антонимы.',
                '🔗 Связанные слова.'
            ]
        },
        {
            title: '🃏 3. Создание карточки',
            content: [
                'Для каждого значения слова создаётся отдельная карточка.',
                'Карточка автоматически отправляется в вашу колоду Anki.',
                '🎨 Форматирование текста сохраняется в карточке.'
            ]
        },
        {
            title: '♻️ 4. Без дубликатов',
            content: [
                'Повторное добавление уже существующей карточки не создаёт дубликат.',
                '💡 Поэтому не нужно вручную проверять, добавляли ли вы слово раньше.'
            ]
        },
        {
            title: '📖 5. Несколько значений',
            content: [
                'Одно слово может иметь несколько значений.',
                'Каждое значение создаётся как отдельная карточка.',
                'Например, одно слово с тремя значениями → три карточки в Anki.'
            ]
        },
        {
            title: 'ℹ️ 6. Не все данные доступны',
            content: [
                'Некоторые слова могут не иметь синонимов, антонимов или примеров.',
                'Это зависит от данных, которые предоставляет словарь.',
                'Сервис не придумывает отсутствующие данные.'
            ]
        },
        {
            title: '⚙️ 7. Настройки',
            content: [
                'Можно настроить количество синонимов в карточке.',
                'Можно настроить количество антонимов.',
                'Можно настроить количество связанных слов.',
                'Можно настроить количество примеров.',
                'Также доступны настройки колоды Anki и внешнего вида карточек.'
            ]
        }
    ];

    return (
        <div style={styles.instructionPanel}>
            <h2 style={styles.sectionTitle}>
                <span>📖</span>
                Как это работает
            </h2>

            <div style={styles.flowContainer}>
                <div style={styles.flowItem}>
                    <span style={styles.flowIcon}>🔤</span>
                    <span>Слово</span>
                </div>

                <span style={styles.flowArrow}>→</span>

                <div style={styles.flowItem}>
                    <span style={styles.flowIcon}>📚</span>
                    <span>Словарь</span>
                </div>

                <span style={styles.flowArrow}>→</span>

                <div style={styles.flowItem}>
                    <span style={styles.flowIcon}>🧠</span>
                    <span>Данные</span>
                </div>

                <span style={styles.flowArrow}>→</span>

                <div style={styles.flowItem}>
                    <span style={styles.flowIcon}>🃏</span>
                    <span>Карточка</span>
                </div>

                <span style={styles.flowArrow}>→</span>

                <div style={styles.flowItem}>
                    <span style={styles.flowIcon}>🎴</span>
                    <span>Anki</span>
                </div>
            </div>

            {instructions.map((step, index) => (
                <div
                    key={index}
                    style={styles.stepContainer}
                >
                    <h3 style={styles.stepTitle}>
                        {step.title}
                    </h3>

                    <div style={styles.stepContent}>
                        {step.content.map((item, itemIndex) => (
                            <div
                                key={itemIndex}
                                style={styles.stepItem}
                            >
                                <span style={styles.bullet}>•</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div style={styles.tipBox}>
                <strong>💡 Совет:</strong>{' '}
                Добавляйте слова небольшими порциями и регулярно
                повторяйте карточки в Anki. Главное — регулярное
                повторение, а не количество добавленных слов.
            </div>
        </div>
    );
};

export default InstructionSection;