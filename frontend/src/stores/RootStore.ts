import { makeAutoObservable } from 'mobx';
import { IGeo, IMapLocation } from '../models';
import { IParking } from '../api/models';
import { ParkingsApiServiceInstanse } from '../api/ParkingsApiService';
import { CitiesCoords } from '../contants';
import { getDistance } from '../utils/GeoUtils';

export class RootStore {
    parkings: IParking[] = [];
    filters: unknown = {};
    mapLocation: IMapLocation = {
        center: [CitiesCoords.ekb.longitude, CitiesCoords.ekb.lattitude],
        zoom: 11,
    };
    start: [number, number] = [CitiesCoords.ekb.longitude, CitiesCoords.ekb.lattitude]; // [longitude, latitude]
    activeParking: IParking | null = null;
    isSearchOpened: boolean | null = null;
    isFiltersOpened: boolean | null = null;
    isParkingsLoading: boolean = false;
    currentSearch: string = '';

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

    setIsParkingsLoading(isParkingsLoading: boolean) {
        this.isParkingsLoading = isParkingsLoading;
    }

    setCurrentSearch(currentSearch: string) {
        this.currentSearch = currentSearch;
    }

    toggleSearch() {
        this.isSearchOpened = !this.isSearchOpened;
    }

    toggleFilters() {
        this.isFiltersOpened = !this.isFiltersOpened;
    }

    async fetchParkings() {
        this.setIsParkingsLoading(true);

        const parkings = await ParkingsApiServiceInstanse.getParkings({
            latitude: this.start[1],
            longitude: this.start[0],
        });

        this.setParkings(parkings);

        this.setIsParkingsLoading(false);

        return parkings;
    }

    async searchParkingsByAddress(address: string) {
        this.setIsParkingsLoading(true);

        const parkings = await ParkingsApiServiceInstanse.getParkings({
            address,
        });

        this.setParkings(parkings);

        if (parkings.length > 0) {
            this.setActiveParking(parkings[0]);
        }

        this.setIsParkingsLoading(false);

        return parkings;
    }
}
