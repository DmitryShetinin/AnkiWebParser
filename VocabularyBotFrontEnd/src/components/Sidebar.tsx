import React from 'react';
import { MenuItem, CSSProperties } from './../components/WordSearch.tsx';

interface SidebarProps {
  menuItems: MenuItem[];
  activeMenu: string;
  setActiveMenu: (id: string) => void;
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, activeMenu, setActiveMenu, collapsed }) => {
  const styles: { [key: string]: CSSProperties } = {
    sidebar: {
      width: '250px',
      backgroundColor: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: collapsed ? '-250px' : '0',
      top: '0',
      bottom: '0',
      zIndex: 999,
      transition: 'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', // ← плавное выезжание с пружиной
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    },
    
    sidebarHeader: {
      paddingBottom: '1.5rem',
      borderBottom: '1px solid var(--border)',
      marginBottom: '1.5rem',
    },
    
    appTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: 'var(--text)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.25rem',
    },
    
    appSubtitle: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)',
      marginLeft: '1.75rem',
    },
    
    menuList: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
    },
    
    menuItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.9375rem',
      color: 'var(--text-secondary)',
      transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)', // ← мягкое ускорение
      textAlign: 'left',
      transform: 'scale(1)', // начальное состояние
      willChange: 'transform, background-color, box-shadow',
    },
    
    // Активный пункт — с плавным появлением
    activeMenuItem: {
      backgroundColor: 'var(--surface)',
      color: 'var(--primary)',
      fontWeight: '500',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '3px solid var(--border)',
      transform: 'scale(1.02)', // лёгкое увеличение активного пункта
    },
    
    menuItemEmoji: {
      fontSize: '1.125rem',
      width: '24px',
      textAlign: 'center',
    },
    
    menuItemText: {
      flex: 1,
    },
    
    menuItemBadge: {
      backgroundColor: 'var(--primary)',
      color: 'white',
      fontSize: '0.75rem',
      padding: '0.125rem 0.5rem',
      borderRadius: '9999px',
      fontWeight: '500',
    },
    
    footer: {
      marginTop: 'auto',
      paddingTop: '1.5rem',
      borderTop: '1px solid var(--border)',
      fontSize: '0.75rem',
      color: 'var(--text-secondary)',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <div style={styles.appTitle}>
          <span>🎴</span>
          Vocabulary Bot
        </div>
        <div style={styles.appSubtitle}>Anki Integration Tool</div>
      </div>
      
      <div style={styles.menuList}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            style={{
              ...styles.menuItem,
              ...(activeMenu === item.id ? styles.activeMenuItem : {}),
            }}
            // Добавим реакцию на нажатие (микро-анимация)
            onMouseDown={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'scale(0.96)';
              el.style.transition = 'transform 0.1s ease';
            }}
            onMouseUp={(e) => {
              const el = e.currentTarget;
              el.style.transform = activeMenu === item.id ? 'scale(1.02)' : 'scale(1)';
              el.style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = activeMenu === item.id ? 'scale(1.02)' : 'scale(1)';
              el.style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }}
          >
            <span style={styles.menuItemEmoji}>{item.emoji}</span>
            <span style={styles.menuItemText}>{item.title}</span>
            {item.badge && item.badge > 0 && (
              <span style={styles.menuItemBadge}>{item.badge}</span>
            )}
          </button>
        ))}
      </div>
      
      <div style={styles.footer}>
        <div>Vocabulary Bot v1.0</div>
        <div style={{ marginTop: '0.25rem' }}>© 2024</div>
      </div>
    </div>
  );
};

export default Sidebar;