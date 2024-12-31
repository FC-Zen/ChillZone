import { colors } from '@theme';

export const styles: { [key: string]: React.CSSProperties } = {
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F4F5F7',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  title: {
    fontSize: '24px',
    color: colors.black,
    margin: 0,
  },
  bold: {
    fontWeight: '600',
  },
  part: {
    fontSize: '16px',
    color: '#333',
    margin: 0,
    fontWeight: '600',
  },
  organizationContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
  },
  organization: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
  },
  profileCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2E2A85',
    borderRadius: '10px',
    padding: '15px 20px',
    gap: '15px',
    color: colors.white,
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    margin: 0,
  },
  role: {
    fontWeight: '400',
  },
  email: {
    fontSize: '12px',
    color: '#E0E0E0',
    margin: 0,
  },
  organizationRight: {
    fontSize: '12px',
    margin: 0,
  },
  logoutIcon: {
    cursor: 'pointer',
  },
};
