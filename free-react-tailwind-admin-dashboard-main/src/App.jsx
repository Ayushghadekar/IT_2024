import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';

import Calendar from './pages/Calendar';

import ECommerce from './pages/Dashboard/ECommerce';
// import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import LoanForm from './pages/Form/LoanForm'
import Profile from './pages/Profile';

import Login from './pages/login/login'
import Tables from './pages/Tables';
import History from './components/Tables/HistoryTable';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const token = localStorage.getItem('token');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            token === 'true' ?
              (<>

                <ECommerce />
              </>) : (<Login />)
          }
        />
        <Route
          path="/BoardMember"
          element={
            <>
              <Calendar />
            </>
          }
        />
        <Route
          path="/history"
          element={
            <>
              <History />
            </>
          }
        />
            <Route
          path="/profile/:id"
          element={
            <>
              <Profile />
            </>
          }
        />
        <Route
          path="/LoanRequest"
          element={
            <>
              <LoanForm />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <Tables />
            </>
          }
        />

      </Routes>
    </>
  );
}

export default App;
