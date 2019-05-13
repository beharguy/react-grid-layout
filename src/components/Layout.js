import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import RGL, { WidthProvider } from "react-grid-layout";
import { getWidgetComponentByType, getPlaceHolder } from './widgets';
import { isUndefined } from '../utils';

const ReactGridLayout = WidthProvider(RGL);

const style = {
  gridLayout: {
    position: 'relative',
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    alignContent: 'flex-start'
  }
};

const renderLayoutItem = (widgets) => (layoutItem) => {
  const widget = widgets[layoutItem.i];
  const isPlaceHolder = isUndefined(widget);
  const WidgetComponent = isPlaceHolder ? getPlaceHolder() : getWidgetComponentByType(widget.type);

  if (isPlaceHolder) {
    return <div key={layoutItem.i} data-grid={layoutItem} className="react-grid-placeholder">
      <WidgetComponent />
    </div>;
  }

  return <div key={layoutItem.i} data-grid={layoutItem}>
    <WidgetComponent />
  </div>;
};

const Layout = ({
  classes,
  layout,
  cols = 12,
  rowHeight = 100,
  autoSize = false,
  isDraggable = true,
  isResizable = true,
  onLayoutChange = () => { }
}) => {
  const widgets = useSelector(state => state.widgets);

  return <ReactGridLayout className={classes.gridLayout}
    items={layout.length}
    rowHeight={rowHeight}
    autoSize={autoSize}
    cols={cols}
    isDraggable={isDraggable}
    isResizable={isResizable}
    onLayoutChange={onLayoutChange}
  >
    {layout.map(renderLayoutItem(widgets))}
  </ReactGridLayout>;
};

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  layout: PropTypes.array.isRequired,
  cols: PropTypes.number,
  rowHeight: PropTypes.number,
  autoSize: PropTypes.bool,
  isDraggable: PropTypes.bool,
  isResizable: PropTypes.bool,
  onLayoutChange: PropTypes.func
};

export default withStyles(style)(Layout);