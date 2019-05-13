import actionTypes from './actionTypes';
import { incViewId, incLayoutId, incItemId, createView, createLayout, createLayoutItem, createPlaceHolder, createWidget, findPlaceHolder, moveElement, replacePlaceHolder, removePlaceHolderFromLayout } from '../utils';

const addView = (state, { name = '' }) => {
  const { views, layouts, newViewId, newLayoutId } = state;
  const newView = createView({ id: newViewId, name, layoutId: newLayoutId });
  const newLayout = createLayout();

  return {
    ...state,
    views: views.concat(newView),
    layouts: { ...layouts, [newLayoutId]: newLayout },
    newViewId: incViewId(newViewId),
    newLayoutId: incLayoutId(newLayoutId)
  };
};

const updateLayout = (state, { layoutId, layout }) => {
  const { layouts } = state;
  return {
    ...state,
    layouts: {
      ...layouts,
      [layoutId]: layout
    }
  };
};

const addWidget = (state, { layoutId, widgetType, dropInCol, dropInRow }) => {
  const { layouts, widgets, newItemId } = state;
  const layout = layouts[layoutId];
  const placeHolder = findPlaceHolder(layout);

  if (!placeHolder) {
    return state;
  }

  const newWidget = createWidget({ type: widgetType });
  const newLayoutItem = createLayoutItem({ i: newItemId, x: placeHolder.x, y: placeHolder.y, w: 1, h: 1 });
  const modifiedLayout = replacePlaceHolder({ layout, withLayoutItem: newLayoutItem });

  return {
    ...state,
    layouts: {
      ...layouts,
      [layoutId]: modifiedLayout
    },
    widgets: {
      ...widgets,
      [newItemId]: newWidget
    },
    currentLayoutWithoutChanges: undefined,
    newItemId: incItemId(newItemId)
  };
};

const setPlaceHolder = (state, { view, row, col }) => {
  const { currentLayoutWithoutChanges, layouts } = state;
  const { layoutId, cols } = view;
  const oldPlaceHolder = findPlaceHolder(layouts[layoutId]);

  if (oldPlaceHolder && oldPlaceHolder.x === col && oldPlaceHolder.y === row) {
    return state;
  }

  const layout = currentLayoutWithoutChanges || layouts[layoutId];
  const placeHolder = createPlaceHolder({
    x: oldPlaceHolder ? oldPlaceHolder.x : Number.MAX_SAFE_INTEGER,
    y: oldPlaceHolder ? oldPlaceHolder.y : Number.MAX_SAFE_INTEGER,
  });
  const modifiedLayout = moveElement(
    placeHolder.y < row ? layout.concat(placeHolder) : [placeHolder].concat(layout),
    placeHolder,
    col,
    row,
    true,
    false,
    'vertical',
    cols
  );

  return {
    ...state,
    layouts: {
      ...layouts,
      [layoutId]: modifiedLayout
    },
    currentLayoutWithoutChanges: currentLayoutWithoutChanges || layout
  };
};

const removePlaceHolder = (state, { layoutId }) => {
  const { layouts } = state;
  const layout = layouts[layoutId];

  return {
    ...state,
    layouts: {
      ...layouts,
      [layoutId]: removePlaceHolderFromLayout(layout)
    }
  };
};

export default (state = {}, action = {}) => {

  switch (action.type) {

    case actionTypes.ADD_VIEW:
      return addView(state, action);

    case actionTypes.UPDATE_LAYOUT:
      return updateLayout(state, action);

    case actionTypes.ADD_WIDGET:
      return addWidget(state, action);

    case actionTypes.SET_PLACEHOLDER:
      return setPlaceHolder(state, action);

    case actionTypes.REMOVE_PLACEHOLDER:
      return removePlaceHolder(state, action);

    default:
      return state;

  }

};