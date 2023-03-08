export interface Cell {
    row: number;
    column: number;
    status: 'open' | 'clear' | 'flag';
    bomb: boolean;
    proximityBombs: number;
}