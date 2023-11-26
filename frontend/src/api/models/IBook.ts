import { ICar } from './ICar';

export interface IBook {
    id: number;
    user_id: number;
    parking_id: number;
    time_start: string;
    time_end: string;
    cars: ICar[];
}

export interface IBookParams {
    parking_id: number;
    time_start: string;
    time_end: string;
    cars: ICar[];
    place_id: number;
}
