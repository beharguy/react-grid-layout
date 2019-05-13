export const isUndefined = o => typeof o === 'undefined';

export const incViewId = newViewId => ((newViewId | 0) + 1).toString();

export const incLayoutId = newLayoutId => ((newLayoutId | 0) + 1).toString();

export const incItemId = newItemId => ((newItemId | 0) + 1).toString();

export const createView = ({ id, name, layoutId, cols = 12, rowHeight = 100, margin = [10, 10] }) => ({ id, name, layoutId, cols, rowHeight, margin });

export const createLayout = () => ([]);

export const createLayoutItem = ({ i, x, y, w, h, placeholder = false }) => ({ i, x, y, w, h, placeholder });

export const createPlaceHolder = ({ x, y }) => ({ i: `-1:${x}-${y}`, x, y, w: 1, h: 1, placeholder: true });

export const createWidget = ({ type }) => ({ type });

export const findPlaceHolder = (layout) => layout.find(layoutItem => layoutItem.placeholder);

export { moveElement } from 'react-grid-layout/build/utils';

export const getColWidth = ({ layoutWidth, cols, margin }) => Math.floor((layoutWidth - (margin * (cols - 1))) / cols);

export const getRow = ({ offsetY, rowHeight, margin }) => Math.floor(offsetY / (rowHeight + margin));

export const getCol = ({ offsetX, colWidth, margin }) => Math.floor(offsetX / (colWidth + margin));

export const replacePlaceHolder = ({ layout, withLayoutItem }) => {
  const placeHolderIndex = layout.findIndex(layoutItem => layoutItem.placeholder);

  if (placeHolderIndex < 0) return layout;

  return layout.slice(0, placeHolderIndex).concat(withLayoutItem).concat(layout.slice(placeHolderIndex + 1));
};

export const removePlaceHolderFromLayout = (layout) => {
  return layout.filter(layoutItem => !layoutItem.placeholder);
};