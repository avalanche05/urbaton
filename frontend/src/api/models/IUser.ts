import { ICar } from './ICar';

export interface IUser {
    id: number;
    phone: string;
    balance: number;
    books: unknown[];
    cars: ICar[];
    bookHistory: unknown[];
}
