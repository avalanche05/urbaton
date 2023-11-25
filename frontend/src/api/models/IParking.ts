import { IGeo } from '../../models';

export interface IParking {
    id: number;
    address: string;
    center: IGeo;
    polygon: IGeo[];
    contacts: string;
    base_spaces: number;
    busy_base_spaces: number;
    disabled_spaces: number;
    busy_disabled_spaces: number;
    electro_spaces: number;
    busy_electro_spaces: number;
    schedule: string;
    number: string;
    price: number;
    is_camera: boolean;
    is_protected: boolean;
    tags: string[];
    rating: number;
    is_favorite: boolean;
    distance?: number;
}

export interface IGetParkingsParams {
    address?: string;
    latitude?: number;
    longitude?: number;
    price?: number;
    is_camera?: boolean;
    is_protected?: boolean;
}

export interface Iloadhours {
    hour: string;
    load: number;
}

export interface IWorkload {
    day: string;
    loadHours: Iloadhours[];
}
