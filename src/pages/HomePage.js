import React from 'react';
//STYLES
import { makeStyles, withStyles } from '@material-ui/core/styles';
//CORE
import {
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Grid,
  Container,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  CardActions,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

//ICONS
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import WatchLaterRoundedIcon from '@material-ui/icons/WatchLaterRounded';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

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

const HomePage = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <img src="images/logoletras.jpg" height="52px" alt="logo_empresa" />
            <div>
              <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                color="primary"
                onClick={handleClick}
                className={classes.optCentral}
              >
                SERVICIOS
              </Button>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <StyledMenuItem>
                  <ListItemIcon className={classes.buttonsAppBar}>
                    <LocalFloristIcon
                      fontSize="small"
                      className={classes.iconSubmenu}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Arreglos Florales" />
                </StyledMenuItem>
                <StyledMenuItem>
                  <ListItemIcon className={classes.buttonsAppBar}>
                    <WatchLaterRoundedIcon
                      fontSize="small"
                      className={classes.iconSubmenu}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Pre-arreglos" />
                </StyledMenuItem>
                <StyledMenuItem>
                  <ListItemIcon className={classes.buttonsAppBar}>
                    <SupervisedUserCircleRoundedIcon
                      fontSize="small"
                      className={classes.iconSubmenu}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Velatorios" />
                </StyledMenuItem>
                <StyledMenuItem>
                  <ListItemIcon className={classes.buttonsAppBar}>
                    <FaceRoundedIcon
                      fontSize="small"
                      className={classes.iconSubmenu}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Exhumación" />
                </StyledMenuItem>
              </StyledMenu>

              <Button color="inherit" className={classes.buttonsAppBar}>
                Planes
              </Button>
              <Button color="inherit" className={classes.buttonsAppBar}>
                Contáctenos
              </Button>
              <Button color="inherit" className={classes.buttonsAppBar}>
                Nosotros
              </Button>
              <Button
                color="inherit"
                className={classes.buttonsAppBar}
                onClick={() => history.push('/profile')}
              >
                Mi Perfil
              </Button>
            </div>
            <Box flexWrap="wrap">
              <Button color="inherit" className={classes.buttonsAppBar}>
                Iniciar sesión
              </Button>

              <Button color="inherit" className={classes.buttonsAppBar}>
                Registrarse
              </Button>
              <IconButton
                className={classes.buttonsAppBar}
                aria-label="shoppingcart"
                color="inherit"
              >
                <ShoppingCartIcon />
              </IconButton>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box className={classes.hero}>
        <Box>Conoce nuestros planes</Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          Arreglos Florales
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.Card} elevation={4}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="160"
                  image="/images/kisspng-condolences-flower-delivery-funeral-floristry-5af66bed4a6590.0820597915260989253047.png"
                  style={{ objectFit: 'contain' }}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom component="h2">
                    Corona de Anturios
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <IconButton
                  className={classes.buttonsAppBar}
                  aria-label="shoppingcart"
                  color="inherit"
                >
                  <AddShoppingCartIcon />
                </IconButton>
                <Typography
                  align="right"
                  gutterBottom
                  color="##c0ca33"
                  variant="h5"
                  component="h1"
                >
                  $ 5,500
                </Typography>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.Card} elevation={4}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="160"
                  image="/images/kisspng-condolences-flower-delivery-funeral-floristry-5af66bed4a6590.0820597915260989253047.png"
                  style={{ objectFit: 'contain' }}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom component="h2">
                    Corona De Crisantemos Y Rosas
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <IconButton
                  className={classes.buttonsAppBar}
                  aria-label="shoppingcart"
                  color="inherit"
                >
                  <AddShoppingCartIcon />
                </IconButton>
                <Typography
                  align="right"
                  gutterBottom
                  color="##c0ca33"
                  variant="h5"
                  component="h1"
                >
                  $ 5,500
                </Typography>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.Card} elevation={3}>
              <CardActionArea>
                <CardMedia
                  className="classes.media"
                  component="img"
                  alt="Contemplative Reptile"
                  height="160"
                  image="/images/kisspng-condolences-flower-delivery-funeral-floristry-5af66bed4a6590.0820597915260989253047.png"
                  style={{ objectFit: 'contain' }}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom component="h2">
                    Corona Circular de Rosas y Claveles
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <IconButton
                  className={classes.buttonsAppBar}
                  aria-label="shoppingcart"
                  color="inherit"
                >
                  <AddShoppingCartIcon />
                </IconButton>
                <Typography
                  align="right"
                  gutterBottom
                  color="##c0ca33"
                  variant="h5"
                  component="h1"
                >
                  $ 5,500
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.Card} elevation={4}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="160"
                  image="/images/kisspng-condolences-flower-delivery-funeral-floristry-5af66bed4a6590.0820597915260989253047.png"
                  style={{ objectFit: 'contain' }}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom component="h2">
                    Corona de Anturios
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <IconButton
                  className={classes.buttonsAppBar}
                  aria-label="shoppingcart"
                  color="inherit"
                >
                  <AddShoppingCartIcon />
                </IconButton>
                <Typography
                  align="right"
                  gutterBottom
                  color="##c0ca33"
                  variant="h5"
                  component="h1"
                >
                  $ 5,500
                </Typography>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.Card} elevation={4}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="160"
                  image="/images/kisspng-condolences-flower-delivery-funeral-floristry-5af66bed4a6590.0820597915260989253047.png"
                  style={{ objectFit: 'contain' }}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom component="h2">
                    Corona De Crisantemos Y Rosas
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <IconButton
                  className={classes.buttonsAppBar}
                  aria-label="shoppingcart"
                  color="inherit"
                >
                  <AddShoppingCartIcon />
                </IconButton>
                <Typography
                  align="right"
                  gutterBottom
                  color="##c0ca33"
                  variant="h5"
                  component="h1"
                >
                  $ 5,500
                </Typography>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.Card} elevation={3}>
              <CardActionArea>
                <CardMedia
                  className="classes.media"
                  component="img"
                  alt="Contemplative Reptile"
                  height="160"
                  image="/images/kisspng-condolences-flower-delivery-funeral-floristry-5af66bed4a6590.0820597915260989253047.png"
                  style={{ objectFit: 'contain' }}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    component="h2"
                    className={classes.typography}
                  >
                    Corona Circular de Rosas y Claveles
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <IconButton
                  className={classes.buttonsAppBar}
                  aria-label="shoppingcart"
                  color="inherit"
                >
                  <AddShoppingCartIcon />
                </IconButton>
                <Typography
                  align="right"
                  gutterBottom
                  color="##c0ca33"
                  variant="h5"
                  component="h1"
                >
                  $ 5,500
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
