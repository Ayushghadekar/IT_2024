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
            token==='true'?
           ( <>
            
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>):(<Login/>)
          }
        />
        <Route
          path="/BoardMember"
          element={
            <>
              <PageTitle title="Board Member | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/LoanRequest"
          element={
            <>
              <PageTitle title="LoanRequest | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <LoanForm />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        
      </Routes>
    </>
  );
}

export default App;
