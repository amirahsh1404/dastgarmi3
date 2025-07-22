import React from 'react';
import { ShapeData } from '../types';

const ShapeCounter: React.FC<{ shapes: ShapeData[] }> = ({ shapes }) => {
    const counts = shapes.reduce<Record<string, number>>((acc, shape) => {
        acc[shape.type] = (acc[shape.type] || 0) + 1;
        return acc;
    }, {});

    return (
        <footer className="counter">
            <div><span className="circle">دایره:</span> {counts.circle || 0}</div>
            <div><span className="square">مربع:</span> {counts.square || 0}</div>
            <div><span className="triangle">مثلث:</span> {counts.triangle || 0}</div>
        </footer>
    );
};

export default ShapeCounter;