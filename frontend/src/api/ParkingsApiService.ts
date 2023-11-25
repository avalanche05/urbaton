import axios from 'axios';
import { API_URL } from '../config';
import { IGetParkingsParams, IParking } from './models';

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

        const response = await axios.post<IParking[]>(`${API_URL}/parking`, body, { params });

        return response.data;
    }
}

export const ParkingsApiServiceInstanse = new ParkingsApiService();
