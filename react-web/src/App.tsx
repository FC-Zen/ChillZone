import DashboardLayout from '@templates/DashboardLayout';
import Dashboard from '@pages/Dashboard';
import '@translations/i18n';

function App() {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
}

export default App;