import { useState, useEffect } from 'react';

const useDraggable = ({ ref, value, draggable = true, onDragStart = () => { }, onDrag = () => { }, onDragEnd = () => { } }) => {
  const [isDrag, setIsDrag] = useState(false);

  useEffect(() => {
    const domNode = ref.current;

    const handleDragStart = (event) => {
      setIsDrag(true);
      event.dataTransfer.setData('text', value);
      onDragStart(event);
    };

    const handleDrag = (event) => {
      onDrag(event);
    };

    const handleDragEnd = (event) => {
      setIsDrag(false);
      onDragEnd(event);
    };

    domNode.addEventListener('dragstart', handleDragStart);
    domNode.addEventListener('drag', handleDrag);
    domNode.addEventListener('dragend', handleDragEnd);

    domNode.draggable = draggable;
    return () => {
      domNode.removeEventListener('dragstart', handleDragStart);
      domNode.removeEventListener('drag', handleDrag);
      domNode.removeEventListener('dragend', handleDragEnd);

      domNode.draggable = false;
    };
  }, [ref, value, draggable, onDragStart, onDrag, onDragEnd]);

  return isDrag;
};

export default useDraggable;