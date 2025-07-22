import React from 'react';
import Shape from './Shape';
import { ShapeData, ShapeType } from '../types';

type Props = {
  shapes: ShapeData[];
  addShape: (x: number, y: number) => void;
  removeShape: (id: string) => void;
  selectedTool: ShapeType | 'eraser' | null;
};

const Canvas: React.FC<Props> = ({ shapes, addShape, removeShape, selectedTool }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    addShape(e.clientX - rect.left, e.clientY - rect.top);
  };

  return (
      <div className="canvas" onClick={handleClick}>
        {shapes.map((shape) => (
            <Shape
                key={shape.id}
                shape={shape}
                onDoubleClick={() => {
                  if (selectedTool === 'eraser') {
                    removeShape(shape.id);
                  }
                }}
            />
        ))}
      </div>
  );
};

export default Canvas;
