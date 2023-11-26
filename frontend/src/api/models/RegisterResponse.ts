import { IUser } from '.';

export interface RegisterResponse {
    bearer_token: string;
    user: IUser;
}
