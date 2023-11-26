import axios from 'axios';
import { API_URL } from '../config';
import { IGetParkingsParams, IGetPlacesParams, IParking, IPlace } from './models';
import authHeader from '../utils/authHeader';

export class ParkingsApiService {
    public async getParkings({
        address,
        latitude,
        longitude,
        ...params
    }: IGetParkingsParams): Promise<IParking[]> {
        const body = {
            address,
            latitude,
            longitude,
        };

        const response = await axios.post<IParking[]>(`${API_URL}/parking`, body, {
            params,
            headers: authHeader(),
        });

        return response.data;
    }

    public async getPlaces(params: IGetPlacesParams) {
        const response = await axios.get<IPlace[]>(`${API_URL}/place`, { params });

        return response.data;
    }
}

export const ParkingsApiServiceInstanse = new ParkingsApiService();
