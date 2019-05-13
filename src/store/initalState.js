export default {

  /**
   * views - an array containing view objects
   * each view has the following properties:
   * id - a unique id to represent the view
   * name - the name of the view 
   * layoutId - the id of the layout
   * */
  views: [
    { id: '0', name: 'a', layoutId: '0', margin: [10, 10], cols: 12, rowHeight: 100 }
  ],

  /**
   * layouts - an object representing layouts based on the layoutId as a key and an array as value
   * key - layoutId
   * layout - array of items representing the layout
   *  i - unique item id - string
   *  x
   *  y
   *  w
   *  h
   */
  layouts: {
    '0': [
      { i: '0', x: 0, y: 0, w: 1, h: 1 },
      { i: '1', x: 0, y: 1, w: 2, h: 2 }
    ]
  },

  /**
   * key - itemId
   * widget - object
   *  type - the type of the component to render
   *  color - background color
   */
  widgets: {
    '0': { type: 'blue' },
    '1': { type: 'green' }
  },

  posibleWidgets: [
    { type: 'blue', name: 'Blue' },
    { type: 'green', name: 'Green' },
    { type: 'red', name: 'Red' }
  ],

  currentLayoutWithoutChanges: undefined,

  newViewId: '1',

  newLayoutId: '1',

  newItemId: '2'
};