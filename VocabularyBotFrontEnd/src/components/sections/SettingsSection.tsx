import React, { useState } from 'react';
import { styles } from './styles/SettingsSection.styles.ts';
import CardPreview from '../CardPreview.tsx';

interface SettingsSectionProps {
  ankiConnected: boolean | null;
  checkingAnki: boolean;
  checkAnkiStatus: (showNotification?: boolean) => Promise<void>;
  saveApiKey: (apiKey: string) => Promise<void>;
  fullWidth?: boolean;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  ankiConnected,
  checkingAnki,
  checkAnkiStatus,
  saveApiKey,
  fullWidth = false,
}) => {
  const [settings, setSettings] = useState({
    username: 'Dmitry',
    email: 'dev@example.com',
    avatar: '',
    synonymsLimit: 10,
    antonymsLimit: 5,
    relatedLimit: 10,
    examplesLimit: 3,
    deckName: 'Merriam Vocabulary',
    modelName: 'MerriamWebsterBasic',
    cardStyle: 'Style 1',
    theme: 'Light',
    apiKey: '',
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (field: string, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleThemeChange = (theme: string) => {
    handleChange('theme', theme);
    const themeValue = theme === 'Dark' ? 'dark' : theme === 'Light' ? 'light' : 'light';
    document.documentElement.dataset.theme = themeValue;
    localStorage.setItem('theme', themeValue);
  };

  return (
    <div style={styles.container(fullWidth)}>
      <h2 style={styles.title}>⚙️ Settings</h2>

      {/* Account Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Account</h3>
        <div style={styles.row}>
          <span style={styles.label}>Username</span>
          <input
            type="text"
            value={settings.username}
            onChange={(e) => handleChange('username', e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Email</span>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => handleChange('email', e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Avatar</span>
          <input
            type="text"
            value={settings.avatar}
            onChange={(e) => handleChange('avatar', e.target.value)}
            placeholder="URL to avatar image"
            style={styles.input}
          />
        </div>
      </div>

      {/* Dictionary Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Dictionary</h3>
        <div style={styles.row}>
          <span style={styles.label}>Synonyms</span>
          <input
            type="number"
            min="0"
            max="50"
            value={settings.synonymsLimit}
            onChange={(e) => handleChange('synonymsLimit', parseInt(e.target.value) || 0)}
            style={styles.numberInput}
          />
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Antonyms</span>
          <input
            type="number"
            min="0"
            max="50"
            value={settings.antonymsLimit}
            onChange={(e) => handleChange('antonymsLimit', parseInt(e.target.value) || 0)}
            style={styles.numberInput}
          />
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Related</span>
          <input
            type="number"
            min="0"
            max="50"
            value={settings.relatedLimit}
            onChange={(e) => handleChange('relatedLimit', parseInt(e.target.value) || 0)}
            style={styles.numberInput}
          />
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Examples</span>
          <input
            type="number"
            min="0"
            max="20"
            value={settings.examplesLimit}
            onChange={(e) => handleChange('examplesLimit', parseInt(e.target.value) || 0)}
            style={styles.numberInput}
          />
        </div>
      </div>

      {/* Anki Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Anki</h3>
        <div style={styles.row}>
          <span style={styles.label}>Deck</span>
          <input
            type="text"
            value={settings.deckName}
            onChange={(e) => handleChange('deckName', e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Model</span>
          <input
            type="text"
            value={settings.modelName}
            onChange={(e) => handleChange('modelName', e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Status</span>
          <span style={styles.statusText(ankiConnected ?? false)}>
            {ankiConnected ? '✅ Connected' : '❌ Not connected'}
          </span>
          <button
            onClick={() => checkAnkiStatus(true)}
            disabled={checkingAnki}
            style={styles.checkButton(checkingAnki)}
          >
            {checkingAnki ? 'Checking...' : 'Check'}
          </button>
        </div>
      </div>

      {/* Appearance Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Appearance</h3>

        <div style={styles.row}>
          <span style={styles.label}>Theme</span>
          <select
            value={settings.theme}
            onChange={(e) => handleThemeChange(e.target.value)}
            style={styles.select}
          >
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
            <option value="System">System</option>
          </select>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Card style</span>
          <select
            value={settings.cardStyle}
            onChange={(e) => handleChange('cardStyle', e.target.value)}
            style={styles.select}
          >
            <option value="Style 1">Classic</option>
            <option value="Style 2">Modern</option>
            <option value="Style 3">Dark</option>
          </select>
        </div>

        <div style={styles.centerContainer}>
          <CardPreview variant={settings.cardStyle} />
        </div>
      </div>

      {/* Save Button */}
      <div style={styles.saveRow}>
        {isSaved && <span style={styles.savedBadge}>✅ Saved!</span>}
        <button
          onClick={handleSave}
          style={styles.saveButton}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
        >
          💾 Save
        </button>
      </div>
    </div>
  );
};

export default SettingsSection;