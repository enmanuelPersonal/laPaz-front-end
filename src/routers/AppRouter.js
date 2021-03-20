import React, { useEffect, useReducer, useState } from 'react';
import { ThemeProvider, CircularProgress } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import dotenv from 'dotenv';

import { AdminRoutes } from './AdminRoutes';
import { post } from '../helpers/fetch';
import { USER_LOGIN } from '../auth/actions';
import AppContext from '../auth/AuthContext';
import reducer from '../auth/authReducer';
import theme from '../theme';

import { ClientRoutes } from './ClientRoutes';
import { PrivateRouteAdmin } from './PrivateRouteAdmin';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

dotenv.config();

const initialState = {
  isUserLoggedIn: false,
  userData: undefined,
};

export const AppRouter = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isUserLoggedIn, userData } = state;

  useEffect(() => {
    const fetchAuthData = async () => {
      const getUser = await post('auth')
        .then((res) => res.json())
        .catch(() => {
          setLoading(false);
          setLoggedIn(false);
        });

      if (getUser) {
        const { data } = getUser;
        if (data && data.idEntidad) {
          dispatch({
            type: USER_LOGIN,
            payload: data,
          });
          setLoggedIn(true);
        }
      }
      setLoading(false);
    };

    fetchAuthData();
  }, []);

  return (
    <Router>
      {(!loading && (
        <ThemeProvider theme={theme}>
          <AppContext.Provider value={{ state, dispatch }}>
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <PrivateRouteAdmin
                path="/admin/"
                component={AdminRoutes}
                isUserLoggedIn={isUserLoggedIn}
                userType={userData && userData.tipoUsuario}
              />
              <Route
                path="/"
                component={() => (
                  <ClientRoutes
                    isUserLoggedIn={isUserLoggedIn}
                    userType={userData && userData.tipoUsuario}
                  />
                )}
              />
            </Switch>
          </AppContext.Provider>
        </ThemeProvider>
      )) || <CircularProgress />}
      {loggedIn ? <Redirect to="/admin/home" /> : <Redirect to='/login' />}
    </Router>
  );
};
