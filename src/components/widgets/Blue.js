import React, { forwardRef } from 'react';

const Blue = forwardRef((props, ref) => {
  const style = {
    backgroundColor: '#0000FF',
    width: '100%',
    height: '100%'
  };

  return <div style={style} ref={ref}>
  </div>;
});

export default Blue;