import { makeAutoObservable, observable } from 'mobx';
import { IMapLocation } from '../models';

export class RootStore {
    parkings: unknown[] = [];
    mapLocation: IMapLocation = {
        center: [37.617698, 55.755864],
        zoom: 11,
    };
    start: [number, number] = [37.617698, 55.755864];

    constructor() {
        makeAutoObservable(this, {
            parkings: observable,
            mapLocation: observable,
        });
    }
}
