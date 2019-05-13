import React, { forwardRef } from 'react';

const Green = forwardRef((props, ref) => {
  const style = {
    backgroundColor: '#00FF00',
    width: '100%',
    height: '100%'
  };

  return <div style={style} ref={ref}>
  </div>;
});

export default Green;