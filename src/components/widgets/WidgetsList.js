import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { getWidgetTypes } from './index';
import WidgetListItem from './WidgetListItem';

const style = (theme) => ({
  widgetsList: {
    width: 100,
    overflowX: 'hidden',
    overflowY: 'auto',
    alignItems: 'center',
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${theme.palette.divider}`
  }
});

const renderWidget = (draggable) => (widgetType) => {
  return <WidgetListItem key={widgetType} widgetType={widgetType} draggable={draggable} />
};

const WidgetsList = ({ classes, draggable = true }) => {
  const widgetsTypes = getWidgetTypes();

  return <List className={classes.widgetsList}>
    {widgetsTypes.map(renderWidget(draggable))}
  </List>
};

WidgetsList.propTypes = {
  classes: PropTypes.object.isRequired,
  draggable: PropTypes.bool
};

export default withStyles(style)(WidgetsList);