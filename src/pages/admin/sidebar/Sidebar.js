import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ExpandLess, ExpandMore } from '../../../components/Icons.js';

import { ChildrenSidebar } from './ChildrenSidebar';

import { post } from '../../../helpers/fetch';
import { RESET_STATES, USER_LOGOUT } from '../../../auth/actions';
import { routes } from '../../../utils/rutas.js';
import AppContext from '../../../auth/AuthContext';
import { drawerWidth } from '../../../utils/consts.js';
import logo from '../../../img/logoletras.JPG';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: {
    height: '50px',

    padding: theme.spacing(4),
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const { dispatch } = useContext(AppContext);
  const [child, setChild] = useState({});
  const [isRedirect, setIsRedirect] = useState(false);
  const [ruta, setRuta] = useState('');

  const handleClick = (path, value, children) => {
    let name = value.toLowerCase();

    if (path) {
      setRuta(path);
      setIsRedirect(true);
      return;
    }

    if (!children) {
      return;
    }
    setIsRedirect(false);
    setChild((prev) => Object.assign({ ...prev }, { [name]: !prev[name] }));
  };

  const handleLogout = () => {
    post('/auth/logout').then(() => {
      dispatch({ type: USER_LOGOUT });
      dispatch({ type: RESET_STATES });
      localStorage.removeItem('LaPaz_auth_token');
    });
    setRuta('/login');
    setIsRedirect(true);
  };

  return (
    <React.Fragment>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
          {' '}
          <img src={logo} height="52px" alt="logo_empresa" />
        </div>

        <Divider />

        <List>
          {routes.map(({ Component, label, path, children }, i) => {
            const getValueChild = child[label.toLocaleLowerCase()];

            return (
              <React.Fragment key={`${label}/${i + i * 2}`}>
                <ListItem
                  button
                  key={`${label}/${i}`}
                  onClick={() => handleClick(path, label, children)}
                  {...(/\/login/.test(path) && {
                    button: true,
                    onClick: handleLogout,
                  })}
                >
                  <ListItemIcon>
                    <Component style={{ color: '#630F5C' }} />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                  {children &&
                    (getValueChild ? <ExpandLess /> : <ExpandMore />)}
                </ListItem>
                {children && (
                  <Collapse in={getValueChild} timeout="auto" unmountOnExit>
                    <ChildrenSidebar
                      parent={label.toLocaleLowerCase()}
                      open={getValueChild}
                    />
                  </Collapse>
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Drawer>
      {isRedirect && <Redirect to={ruta} />}
    </React.Fragment>
  );
};

export default Sidebar;
