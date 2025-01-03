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
  AdminBookingPage
} from '@pages';
import { ROUTE } from '@enums';

export const RootNavigator = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE.LOGIN} element={<LoginPage />} />
        <Route path={ROUTE.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={ROUTE.FORGOT_MDP} element={<ForgotMdpPage />} />
        <Route path={ROUTE.RESET_PASSWORD} element={<ResetPasswordPage />} />
        <Route path={ROUTE.SIGNUP_OWNER} element={<SignUpOwnerPage />} />
        
        <Route path={ROUTE.ADMIN_DASHBOARD} element={<AdminHomePage />} />
        <Route path={ROUTE.ADMIN_ACCOUNTS} element={<AdminAccountPage />} />
        <Route path={ROUTE.ADMIN_ROOMS} element={<AdminRoomsPage />} />
        <Route path={ROUTE.ADMIN_BOOKING} element={<AdminBookingPage />} />

        <Route path={ROUTE.OWNER_DASHBOARD} element={<OwnerHomePage />} />
      </Routes>
    </Router>
  );
};

export default RootNavigator;
