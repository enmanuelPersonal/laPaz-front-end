import React from 'react';
import {
  Card,
  Typography,
  makeStyles,
  Container,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    // backgroundColor: '#F6F7F6',
    width: '100%',
    [theme.breakpoints.down(1766)]: {
      marginLeft: 250,
    },
  },
  pageHeader: {
    padding: theme.spacing(4),
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  pageIcon: {
    display: 'inline-block',
    padding: theme.spacing(2),
    color: '#630F5C',
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
    '& .MuiTypography-subtitle2': {
      opacity: '0.6',
    },
  },
}));

const PageHeader = ({ title, subTitle, icon }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>{icon}</Card>
        <div className={classes.pageTitle}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTitle}
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export default PageHeader;
