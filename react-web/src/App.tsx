import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {
  LoginPage,
  ForgotMdpPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  SignUpOwnerPage,
  AdminAccountPage,
  AdminRoomsPage,
  AdminHomePage,
  OwnerHomePage,
  AdminBookingPage,
  OwnerOrdersPage,
  OwnerMealsPage,
  AdminOwnerPage,
  AdminEstablishmentPage,
  SuperAdminPage,
  OwnerMenusPage,
  SuperUsersAdminPage
} from '@pages';
import { UserProvider } from '@hooks/UserContext/UserContext';
import { ProtectedRoute } from '@navigation';

function App() {

  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Routes publiques */}
          <Route element={<ProtectedRoute allowedRoles={['None']} />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/forgot-mdp" element={<ForgotMdpPage />} />
            <Route path="/sign-up" element={<SignUpOwnerPage />} />
          </Route>

          {/* Routes protégées par rôles */}
          <Route element={<ProtectedRoute allowedRoles={['Administrateur', 'Super-Administrateur']} />}>
            <Route path="/admin-dashboard" element={<AdminHomePage />} />
            <Route path="/admin-accounts" element={<AdminAccountPage />} />
            <Route path="/admin-rooms" element={<AdminRoomsPage />} />
            <Route path="/admin-booking" element={<AdminBookingPage />} />
            <Route path="/admin-establishment" element={<AdminEstablishmentPage />} />
            <Route path="/admin-affiliates" element={<AdminOwnerPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['Restaurateur', 'Super-Administrateur']} />}>
            <Route path="/owner-dashboard" element={<OwnerHomePage />} />
            <Route path="/owner-meals" element={<OwnerMealsPage />} />
            <Route path="/owner-menus" element={<OwnerMenusPage />} />
            <Route path="/owner-orders" element={<OwnerOrdersPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['Super-Administrateur']} />}>
            <Route path="/super-admin" element={<SuperAdminPage />} />
            <Route path="/super-admin-users" element={<SuperUsersAdminPage />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
