import React, { useEffect, useReducer, useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
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
import { PrivateRoute } from './PrivateRoute';
import { PrivateRouteAdmin } from './PrivateRouteAdmin';

import HomePage from '../pages/HomePage';

dotenv.config();

const initialState = {
  isUserLoggedIn: false,
  userData: undefined,
};

export const AppRouter = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isUserLoggedIn, userData } = state;

  useEffect(() => {
    const fetchAuthData = async () => {
      const getUser = await post('auth')
        .then((res) => res.json())
        .catch(() => {
          setLoggedIn(false);
        });

      if (getUser) {
        const { data } = getUser;
        if (data && data.personId) {
          dispatch({
            type: USER_LOGIN,
            payload: data,
          });
          setLoggedIn(true);
        }
      }
    };

    fetchAuthData();
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={{ state, dispatch }}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <PrivateRoute
              path="/client/"
              component={ClientRoutes}
              isUserLoggedIn={isUserLoggedIn}
              userType={userData && userData.tipoUsuario}
            />
            <PrivateRouteAdmin
              path="/admin/"
              component={AdminRoutes}
              isUserLoggedIn={isUserLoggedIn}
              userType={userData && userData.tipoUsuario}
            />
          </Switch>
        </AppContext.Provider>
      </ThemeProvider>
      {loggedIn && <Redirect to={window.location.pathname} />}
    </Router>
  );
};
