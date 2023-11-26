export interface IReview {
    id: number;
    text: string;
    rating: number;
    tags: string[];
    user_id: number;
    parking_id: number;
    username: string;
}

export interface ICreateReviewBody {
    text: string;
    rating: number;
    tags: string[];
    parking_id: number;
}
