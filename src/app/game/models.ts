export interface Cell {
    x?: number;
    y?: number;
    status: 'open' | 'clear' | 'flag';
    bomb: boolean;
    proximityMines: number;
}