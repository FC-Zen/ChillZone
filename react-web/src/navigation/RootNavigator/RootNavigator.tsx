import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage } from '@pages';
import { ROUTE } from '@enums';

export const RootNavigator = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE.LOGIN_SCREEN} element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default RootNavigator;
