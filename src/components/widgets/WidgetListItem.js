import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDraggable } from '../../hooks/draggable';
import { getWidgetComponentByType } from './index';

const style = {
  widgetListItem: {
    height: 40,
    width: 40,
    margin: '10px auto 30px auto',
    cursor: 'move'
  },
  widgetListItemText: {
    textAlign: 'center'
  }
};

const WidgetListItem = ({ classes, draggable, widgetType }) => {
  const refWidget = useRef();
  const WidgetComponent = getWidgetComponentByType(widgetType);

  useDraggable({ ref: refWidget, value: widgetType, draggable });

  return <div ref={refWidget} className={classes.widgetListItem}>
    <WidgetComponent />

    <div className={classes.widgetListItemText}>
      {widgetType}
    </div>
  </div>;
};

WidgetListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  draggable: PropTypes.bool,
  widgetType: PropTypes.string.isRequired
};

export default withStyles(style)(WidgetListItem);