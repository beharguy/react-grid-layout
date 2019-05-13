import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../../Layout';

const style = (theme) => ({
  viewsGridItem: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
});

const ViewGridItem = ({ classes, view }) => {
  const layout = useSelector(state => state.layouts[view.layoutId]);

  return <div className={classes.viewsGridItem}>
    <Layout layout={layout}
      cols={view.cols} 
      rowHeight={20}
      isDraggable={false}
      isResizable={false}
    />
  </div>;
};

ViewGridItem.propTypes = {
  classes: PropTypes.object.isRequired,
  view: PropTypes.object.isRequired
};

export default withStyles(style)(ViewGridItem);