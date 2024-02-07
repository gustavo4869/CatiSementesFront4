import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { ToastContainer } from 'react-toastify';

import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import './components/css/main.css'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

    return (
          <Layout>
            <NotificationContainer />
            <ToastContainer />
              <Routes>
                  {AppRoutes.map((route, index) => {
                      const { element, ...rest } = route;
                      return <Route key={index} {...rest} element={element} />;
                  })}
              </Routes>
            </Layout>
    );
}

export default App;