import axios from 'axios';
import { API_URL } from '../config';
import { IWorkload } from './models';

export class PredictApiService {
    async getParkingWorkload(): Promise<{ workLoad: IWorkload[] }> {
        const zoneIds = [201, 203, 205, 206, 209, 211];
        const index = Math.floor(Math.random() * zoneIds.length);
        const zone_id = zoneIds[index];

        const response = await axios.get<{ workLoad: IWorkload[] }>(`${API_URL}/parking/workload`, {
            params: {
                zone_id,
                day_inside_week: '2023-11-26',
            },
        });

        const result = response.data.workLoad.map((day) => {
            return {
                ...day,
                loadHours: day.loadHours.map((loadHour) => {
                    return {
                        ...loadHour,
                        load: Math.abs(Number(loadHour.load)),
                    };
                }),
            };
        });

        return { workLoad: result };
    }
}

export const PredictApiServiceInstanse = new PredictApiService();
