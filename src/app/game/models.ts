export interface Cell {
	row: number;
	column: number;
	status: "open" | "clear" | "flag";
	bomb: boolean;
	proximityBombs: number;
}

export interface Score {
	pseudo: string;
	level: string;
	timer: string;
}
