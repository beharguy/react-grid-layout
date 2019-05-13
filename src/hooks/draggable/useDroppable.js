import { useState, useEffect } from 'react';

const isInBoundingRect = ({ pageX, pageY }, { top, left, bottom, right }) => {
  if (pageX > left && pageX < right && pageY > top && pageY < bottom) {
    return true;
  }

  return false;
};

const useDroppable = ({ ref, onDragEnter = () => { }, onDragOver = () => { }, onDragLeave = () => { }, onDrop = () => { } }) => {
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const domNode = ref.current;

    const handleDocumnetDragOver = (event) => {
      if (!isInBoundingRect(event, domNode.getBoundingClientRect())) {
        if (isOver) {
          onDragLeave(event);
          setIsOver(false);
        }

        return;
      }

      if (!isOver) onDragEnter(event);

      onDragOver(event);

      setIsOver(true);

      event.preventDefault();
    };

    const handleDocumnetDrop = (event) => {
      if (isOver) {
        onDrop(event);
        setIsOver(false);
        event.preventDefault();
      }
    };

    document.addEventListener('dragover', handleDocumnetDragOver);
    document.addEventListener('drop', handleDocumnetDrop);
    return () => {
      document.removeEventListener('dragover', handleDocumnetDragOver);
      document.removeEventListener('drop', handleDocumnetDrop);
    };
  }, [ref, isOver, onDragEnter, onDragOver, onDragLeave, onDrop]);

  return isOver;
};

export default useDroppable;