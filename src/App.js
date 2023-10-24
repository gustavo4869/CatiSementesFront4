import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import './components/css/main.css'

const App = () => {

    return (
          <Layout>
            <NotificationContainer />
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