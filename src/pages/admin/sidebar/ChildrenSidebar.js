import React from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { routesChilds as routes } from '../../../utils/rutas.js';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
    color: '#000000',
  },
  iconColor: {
    color: '#227FFC',
  },
}));

export const ChildrenSidebar = ({ parent, open }) => {
  const classes = useStyles();

  return (
    <Collapse key={parent} in={open} timeout="auto" unmountOnExit>
      {routes[parent]?.map(({ label, Icon, path }, i) => {
        return (
          <ListItem
            className={classes.nested}
            component={Link}
            key={`${parent}/${label}/${i}`}
            to={path}
          >
            <ListItemIcon>
              <Icon style={{ color: '#630F5C' }} />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        );
      })}
    </Collapse>
  );
};
