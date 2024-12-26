import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  ForgotMdpPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  SignUpOwnerPage,
  AdminAccountPage,
} from '@pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/forgot-mdp" element={<ForgotMdpPage />} />
        <Route path="/sign-up" element={<SignUpOwnerPage />} />
        <Route path="/AdminAccount" element={<AdminAccountPage />} />
      </Routes>
    </Router>
  );
}

export default App;
