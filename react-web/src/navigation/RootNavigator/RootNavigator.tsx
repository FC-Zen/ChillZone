import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  ForgotMdpPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from '@pages';
import { ROUTE } from '@enums';

export const RootNavigator = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE.LOGIN_SCREEN} element={<LoginPage />} />
        <Route path={ROUTE.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={ROUTE.FORGOT_MDP} element={<ForgotMdpPage />} />
        <Route path={ROUTE.RESET_PASSWORD} element={<ResetPasswordPage />} />
      </Routes>
    </Router>
  );
};

export default RootNavigator;
