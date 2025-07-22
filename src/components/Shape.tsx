import React from 'react';
import { ShapeData } from '../types';

const Shape: React.FC<{ shape: ShapeData; onDoubleClick: () => void }> = ({ shape, onDoubleClick }) => {
  return (
      <div
          className={`shape ${shape.type}`}
          style={{ left: shape.x, top: shape.y }}
          onDoubleClick={onDoubleClick}
      />
  );
};

export default Shape;