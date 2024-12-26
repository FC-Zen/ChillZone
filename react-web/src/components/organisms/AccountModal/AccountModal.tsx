import React from 'react';

type AccountModalprops = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export const AccountModal = ({
  isOpen,
  onClose,
  title,
  children,
}: AccountModalprops) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          <button style={styles.closeButton} onClick={onClose}>
            ✖
          </button>
        </div>
        <div style={styles.body}>{children}</div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#FFF',
    borderRadius: '8px',
    width: '500px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #DDD',
    paddingBottom: '10px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  body: {
    marginTop: '20px',
  },
};
