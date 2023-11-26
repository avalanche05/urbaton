export interface ICar {
    id: number;
    number: string;
    name: string;
    type: string;
    owner_id: number;
}

export interface ICreateCarBody {
    number: string;
    name: string;
    type: string;
}
