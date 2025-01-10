import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
  AdminEstablishmentPage
} from '@pages';
import { UserProvider } from '@hooks/UserContext/UserContext';

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/forgot-mdp" element={<ForgotMdpPage />} />
        <Route path="/sign-up" element={<SignUpOwnerPage />} />

        <Route path="/admin-dashboard" element={<AdminHomePage />} />
        <Route path="/admin-accounts" element={<AdminAccountPage />} />
        <Route path="/admin-rooms" element={<AdminRoomsPage />} />
        <Route path="/admin-booking" element={<AdminBookingPage />} />
        <Route path="/admin-establishment" element={<AdminEstablishmentPage />} />
        <Route path="/admin-affiliates" element={<AdminOwnerPage />} />

        <Route path="/owner-dashboard" element={<OwnerHomePage />} />
        <Route path="/owner-meals" element={< OwnerMealsPage />} />
        <Route path="/owner-orders" element={<OwnerOrdersPage />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
