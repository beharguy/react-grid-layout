import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const style = {
  fadingText: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    color: '#9a9a9a',
    textShadow: '#ffffff 0 2px'
  },
  visible: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    transition: '.1s opacity ease-in',
    opacity: 1
  },
  hidden: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    transition: '.1s opacity ease-in',
    opacity: 0
  }
};

const areSimilar = (items1, items2) => {
  if (items1.length !== items2.length) return false;

  return items1.every((item, intemIndex) => {
    return item.text === items2[intemIndex].text && item.time === items2[intemIndex].time;
  });
}

const renderItem = ({ classes, currentItemIndex }) => ({ text }, itemIndex) => {
  return <div key={itemIndex} className={currentItemIndex === itemIndex ? classes.visible : classes.hidden}>
    {text}
  </div>;
};

const FadingText = ({ classes, items }) => {
  const [currentItems, setCurrentItems] = useState(items);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  if (!areSimilar(currentItems, items)) {
    setCurrentItems(items);
  }

  useEffect(() => {
    if (currentItemIndex >= currentItems.length) return;

    let timeoutInterval = setTimeout(() => {
      setCurrentItemIndex(currentItemIndex + 1);
    }, currentItems[currentItemIndex].time);

    return () => {
      clearTimeout(timeoutInterval);
      timeoutInterval = undefined;
    }
  }, [currentItemIndex, currentItems]);

  if (currentItemIndex >= currentItems.length) return null;

  return <div className={classes.fadingText}>
    {currentItems.map(renderItem({ classes, currentItemIndex }))}
  </div>;
}

FadingText.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    time: PropTypes.number
  }))
};

export default withStyles(style)(FadingText);