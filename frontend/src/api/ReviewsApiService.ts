import axios from 'axios';
import { API_URL } from '../config';
import authHeader from '../utils/authHeader';
import { ICreateReviewBody, IReview } from './models/IReview';

export class ReviewsApiService {
    public async getReviews(parking_id: number): Promise<IReview[]> {
        const response = await axios.get<IReview[]>(`${API_URL}/review`, {
            params: {
                parking_id,
            },
        });

        return response.data;
    }

    public async createReview(body: ICreateReviewBody): Promise<void> {
        await axios.post<void>(`${API_URL}/review/create`, body, {
            headers: authHeader(),
        });
    }
}

export const ReviewsApiServiceInstanse = new ReviewsApiService();
