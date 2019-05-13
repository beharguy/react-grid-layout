import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import routes from './routes';
import { Provider } from 'react-redux';
import store from './store';
import 'typeface-roboto';
import 'react-grid-layout/css/styles.css';

const style = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

const renderRouteHeader = ({ path, exact, header }) => {
  return <Route key={path} path={path} exact={exact} component={header} />;
};
const renderRouteMain = ({ path, exact, main }) => {
  return <Route key={path} path={path} exact={exact} component={main} />;
};

const App = ({ classes }) => {
  return (
    <Provider store={store}>
      <Fragment>

        <Router>

          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>

              {routes.map(renderRouteHeader)}
            </Toolbar>
          </AppBar>

          {routes.map(renderRouteMain)}

        </Router>

      </Fragment>
    </Provider>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(App);
