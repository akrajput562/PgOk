// types.ts
export interface BedStatus {
    filledAndPaid: number;
    notPaid: number;
    vacant: number;
}

export interface Room {
    roomNumber: number;
    beds: BedStatus;
    sharingType?: string;
}

export interface Floor {
    floor: number;
    rooms: Room[];
}

export interface PG {
    name: string;
    floors: Floor[];
}
