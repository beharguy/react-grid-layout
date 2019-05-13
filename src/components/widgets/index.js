import Green from './Green';
import Blue from './Blue';
import Red from './Red';
import PlaceHolder from './PlaceHolder';
export { default as WidgetsList } from './WidgetsList';

export const widgets = {
  'green': Green,
  'blue': Blue,
  'red': Red
};

export const getWidgetTypes = () => Object.keys(widgets);

export const getWidgetComponentByType = (type) => widgets[type];

export const getPlaceHolder = () => PlaceHolder;