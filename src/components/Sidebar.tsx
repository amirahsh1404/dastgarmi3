import React from 'react';
import { ShapeType } from '../types';

const tools: (ShapeType | 'eraser')[] = ['circle', 'square', 'triangle', 'eraser'];

type Props = {
    selectTool: (tool: ShapeType | 'eraser') => void;
    activeTool: ShapeType | 'eraser' | null;
};

const Sidebar: React.FC<Props> = ({ selectTool, activeTool }) => {
    return (
        <aside className="sidebar">
            <div>Tools</div>
            {tools.map((tool) => (
                <button
                    key={tool}
                    onClick={() => selectTool(tool)}
                    className={`tool ${tool} ${activeTool === tool ? 'active' : ''}`}
                    title={tool === 'eraser' ? 'پاک‌کن' : tool}
                >
                    {tool === 'eraser' ? '🧹' : ''}
                </button>
            ))}
        </aside>
    );
};

export default Sidebar;