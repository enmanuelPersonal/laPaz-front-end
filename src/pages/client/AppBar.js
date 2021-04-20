import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  IconButton,
  Toolbar,
  AppBar,
  Grid,
  MenuItem,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import WatchLaterRoundedIcon from '@material-ui/icons/WatchLaterRounded';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 40,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'center',
    color: '#000',
  },
  //my styles
  appBar: {
    background: '#FFF',
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonsAppBar: {
    color: '#000',
    alignSelf: 'center',
    '&:hover': {
      color: '#BD8B20',
    },
  },

  iconSubmenu: {
    color: '#000',
  },
  hero: {
    backgroundImage:
      'url(https://cdn.pixabay.com/photo/2016/09/27/02/11/cemetery-1697469_1280.jpg)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: 550,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: '5rem',
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
  },
  blogTitle: {
    fontWeight: 200,
    fontSize: 25,
    paddingBottom: theme.spacing(3),
  },
  Card: {
    maxWidth: 350,
    marginBottom: theme.spacing(2),
  },
  typography: {
    fontWeight: 500,
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #5F125C',
    backgroundColor: '#ffff',
    color: '#000',
    alignSelf: 'center',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: '#fff',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: '#BD8B20',
      },
    },
  },
}))(MenuItem);

export const Menu = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return <div></div>;
};
