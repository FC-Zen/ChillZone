import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  ForgotMdpPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  SignUpOwnerPage,
  AdminAccountPage,
  AdminRoomsPage,
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
        <Route path={ROUTE.ADMIN_ACCOUNTS} element={<AdminAccountPage />} />
        <Route path={ROUTE.ADMIN_ROOMS} element={<AdminRoomsPage />} />
      </Routes>
    </Router>
  );
};

export default RootNavigator;
