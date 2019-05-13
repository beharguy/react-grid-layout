import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { actionTypes } from '../../../store';

const style = (theme) => ({
  header: {
    flexGrow: 1
  }
});

const Header = withStyles(style)(({ classes }) => {
  const dispatch = useDispatch();
  const addView = () => dispatch({ type: actionTypes.ADD_VIEW, name: '' });

  return <Fragment>
    <div className={classes.header} >
      <h2>Layouts</h2>
    </div >

    <IconButton color="inherit" onClick={addView}>
      <AddIcon />
    </IconButton>

  </Fragment>;
});

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Header);