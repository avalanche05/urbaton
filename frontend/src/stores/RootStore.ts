import { makeAutoObservable, observable } from 'mobx';

export class RootStore {
    parkings: unknown[] = [];

    constructor() {
        makeAutoObservable(this, {
            parkings: observable,
        });
    }
}
