export interface IPlace {
    id: number;
    number: string;
    type: string;
    parking_id: number;
    is_busy: boolean;
}

export interface IGetPlacesParams {
    parking_id: number;
    time_start: string;
    time_end: string;
}
