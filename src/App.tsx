import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import ShapeCounter from './components/ShapeCounter';
import { ShapeData, ShapeType } from './types';
import { v4 as uuidv4 } from 'uuid';
import './styles.css';

type ToolType = ShapeType | 'eraser';

const App: React.FC = () => {
    const [title, setTitle] = useState('');
    const [shapes, setShapes] = useState<ShapeData[]>([]);
    const [selectedTool, setSelectedTool] = useState<ToolType | null>(null);

    const addShape = (x: number, y: number) => {
        if (!selectedTool || selectedTool === 'eraser') return;
        const newShape: ShapeData = {
            id: uuidv4(),
            type: selectedTool,
            x,
            y,
        };
        setShapes(prev => [...prev, newShape]);
    };

    const removeShape = (id: string) => {
        setShapes(prev => prev.filter(shape => shape.id !== id));
    };

    const exportToJson = () => {
        const data = JSON.stringify({ title, shapes }, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title || 'painting'}.json`;
        link.click();
    };

    const importFromJson = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            try {
                const data = JSON.parse(reader.result as string);
                if (data.shapes && Array.isArray(data.shapes)) {
                    setTitle(data.title || '');
                    setShapes(data.shapes);
                }
            } catch {
                alert( 'فایل JSON نامعتبر است.');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="app">
            <Header
                title={title}
                setTitle={setTitle}
                onExport={exportToJson}
                onImport={importFromJson}
            />
            <div className="main">
                <Sidebar selectTool={setSelectedTool} activeTool={selectedTool} />
                <Canvas
                    shapes={shapes}
                    addShape={addShape}
                    removeShape={removeShape}
                    selectedTool={selectedTool}
                />
            </div>
            <ShapeCounter shapes={shapes} />
        </div>
    );
};

export default App;
