import { makeAutoObservable } from 'mobx';
import { IGeo, IMapLocation } from '../models';
import { IParking } from '../api/models';
import { ParkingsApiServiceInstanse } from '../api/ParkingsApiService';
import { CitiesCoords } from '../contants';
import { getDistance } from '../utils/GeoUtils';

export class RootStore {
    parkings: IParking[] = [];
    mapLocation: IMapLocation = {
        center: [CitiesCoords.ekb.longitude, CitiesCoords.ekb.lattitude],
        zoom: 11,
    };
    start: [number, number] = [CitiesCoords.ekb.longitude, CitiesCoords.ekb.lattitude]; // [longitude, latitude]
    activeParking: IParking | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setParkings(parkings: IParking[]) {
        this.parkings = parkings
            .map((parking) => {
                return {
                    ...parking,
                    distance: getDistance(
                        {
                            longitude: this.start[0],
                            latitude: this.start[1],
                        },
                        {
                            longitude: parking.center.longitude,
                            latitude: parking.center.latitude,
                        }
                    ),
                };
            })
            .sort((a, b) => {
                return (
                    (a.distance || Number.MAX_SAFE_INTEGER) -
                    (b.distance || Number.MAX_SAFE_INTEGER)
                );
            });
    }

    setMapLocation(mapLocation: IMapLocation) {
        this.mapLocation = mapLocation;
    }

    setStart(coordinates: IGeo) {
        this.start = [coordinates.longitude, coordinates.latitude];
    }

    setActiveParking(parking: IParking | null) {
        this.activeParking = parking;

        if (parking) {
            this.setMapLocation({
                center: [parking.center.longitude, parking.center.latitude],
                zoom: 16,
            });
        }
    }

    async fetchParkings() {
        const parkings = await ParkingsApiServiceInstanse.getParkings({
            latitude: this.start[1],
            longitude: this.start[0],
        });

        this.setParkings(parkings);

        return parkings;
    }
}
