import React, { forwardRef } from 'react';

const Red = forwardRef((props, ref) => {
  const style = {
    backgroundColor: '#FF0000',
    width: '100%',
    height: '100%'
  };

  return <div style={style} ref={ref}>
  </div>;
});

export default Red;