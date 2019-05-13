import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { useDroppable } from '../../../hooks/draggable';
import { actionTypes } from '../../../store';
import { getColWidth, getRow, getCol } from '../../../utils';
import { WidgetsList } from '../../widgets';
import FadingText from '../../FadingText';
import Layout from '../../Layout';

const style = (theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    background: theme.palette.background.default
  },
  storyTeller: {
    position: 'absolute',
    top: '20%',
    left: '30%',
    transform: 'translate(-50%) translateY(-50%)'
  },
  layoutContainer: {
    position: 'relative',
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    alignContent: 'flex-start'
  },
  gridLayout: {
    minHeight: '100%'
  }
});

const View = ({ classes, match: { params } }) => {
  const view = useSelector(state => state.views[params.id]);
  const layout = useSelector(state => state.layouts[view.layoutId]);
  const dispatch = useDispatch();
  const refLayoutContainer = useRef();

  const handleLayoutChange = (newLayout) => {
    dispatch({ type: actionTypes.UPDATE_LAYOUT, layoutId: view.layoutId, layout: newLayout });
  };

  const handleLayoutDragOver = (event) => {
    const layoutNode = refLayoutContainer.current;
    const { top, left } = layoutNode.getBoundingClientRect();
    const { clientWidth: layoutWidth, scrollLeft, scrollTop } = layoutNode;
    const mouseOffsetX = event.pageX - left + scrollLeft;
    const mouseOffsetY = event.pageY - top + scrollTop;
    const { rowHeight, cols } = view;
    const colWidth = getColWidth({ layoutWidth, cols, margin: view.margin[0] });
    const row = getRow({ offsetY: mouseOffsetY, rowHeight, margin: view.margin[1] });
    const col = getCol({ offsetX: mouseOffsetX, colWidth, margin: view.margin[0] });

    dispatch({ type: actionTypes.SET_PLACEHOLDER, view, row, col });
  };

  const handleLayoutDrop = (event) => {
    const widgetType = event.dataTransfer.getData('text');
    const layoutNode = refLayoutContainer.current;
    const { top, left } = layoutNode.getBoundingClientRect();
    const { clientWidth } = layoutNode;
    const mouseOffsetX = event.pageX - left;
    const mouseOffsetY = event.pageY - top;
    const { rowHeight, cols } = view;
    const dropInCol = Math.floor(mouseOffsetX / (clientWidth / cols));
    const dropInRow = Math.floor(mouseOffsetY / rowHeight);

    dispatch({ type: actionTypes.ADD_WIDGET, layoutId: view.layoutId, widgetType, dropInCol, dropInRow });
  };

  const handleLayoutDragLeave = (event) => {
    dispatch({ type: actionTypes.REMOVE_PLACEHOLDER, layoutId: view.layoutId });
  };

  useDroppable({
    ref: refLayoutContainer,
    onDrop: handleLayoutDrop,
    onDragOver: handleLayoutDragOver,
    onDragLeave: handleLayoutDragLeave
  });


  return <div className={classes.root}>
    <WidgetsList />

    <div ref={refLayoutContainer} className={classes.layoutContainer}>
      <Layout layout={layout}
        cols={view.cols}
        autoSize={true}
        rowHeight={view.rowHeight}
        onLayoutChange={handleLayoutChange}
      />
      <FadingText items={[{text: '<-- Drag widgets to add them to the layout', time: 3000}]} />
    </div>
  </div>;
};

View.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default withStyles(style)(View);