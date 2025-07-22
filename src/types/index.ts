export type ShapeType = 'circle' | 'square' | 'triangle';

export interface ShapeData {
    id: string;
    type: ShapeType;
    x: number;
    y: number;
}