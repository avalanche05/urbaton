import axios from 'axios';
import { API_URL } from '../config';
import authHeader from '../utils/authHeader';
import { IUser } from './models/IUser';
import { IBookParams, ICreateCarBody } from './models';

export class UserApiService {
    public async getUserProfile(): Promise<IUser> {
        const response = await axios.get<IUser>(`${API_URL}/user/profile`, {
            headers: authHeader(),
        });

        return response.data;
    }

    public async deposit(value: number): Promise<void> {
        await axios.post<void>(
            `${API_URL}/user/deposit`,
            { value },
            {
                headers: authHeader(),
            }
        );
    }

    public async bookParking({
        cars,
        parking_id,
        place_id,
        time_end,
        time_start,
    }: IBookParams): Promise<void> {
        const body = {
            car_ids: cars.map((car) => car.id),
            parking_id,
            place_id,
            time_end,
            time_start,
        };

        await axios.post<void>(`${API_URL}/book/create`, body, {
            headers: authHeader(),
        });
    }

    public createCar(body: ICreateCarBody) {
        return axios.post(`${API_URL}/car/create`, body, {
            headers: authHeader(),
        });
    }
}

export const UserApiServiceInstanse = new UserApiService();
