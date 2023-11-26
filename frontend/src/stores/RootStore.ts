import { makeAutoObservable } from 'mobx';
import { IFilter, IGeo, IMapLocation } from '../models';
import { ICar, ICreateCarBody, IParking } from '../api/models';
import { ParkingsApiServiceInstanse } from '../api/ParkingsApiService';
import { CitiesCoords } from '../contants';
import { getDistance } from '../utils/GeoUtils';
import { UserApiServiceInstanse } from '../api/UserApiService';
import { IUser } from '../api/models/IUser';

export class RootStore {
    parkings: IParking[] = [];
    filters: IFilter = {};
    filteredParkings: IParking[] = [];
    mapLocation: IMapLocation = {
        center: [CitiesCoords.ekb.longitude, CitiesCoords.ekb.lattitude],
        zoom: 11,
    };
    start: [number, number] = [CitiesCoords.ekb.longitude, CitiesCoords.ekb.lattitude]; // [longitude, latitude]
    activeParking: IParking | null = null;
    isSearchOpened: boolean | null = null;
    isFiltersOpened: boolean | null = null;
    isBookingOpened: boolean | null = null;
    isParkingsLoading: boolean = false;
    currentSearch: string = '';
    userProfile: IUser | null = null;

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

    setFilteredParkings(parkings: IParking[]) {
        this.filteredParkings = parkings;
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

    setFilters(filters: IFilter) {
        this.filters = filters;

        this.setFilteredParkings(
            this.parkings.filter((parking) => {
                if (filters.disabled && parking.disabled_spaces === 0) return false;

                if (filters.electro && parking.electro_spaces === 0) return false;

                if (filters.camera && !parking.is_camera) return false;

                if (filters.protected && !parking.is_protected) return false;

                if (filters.favorite && !parking.is_favorite) return false;

                if (filters.ratingMoreThan35 && parking.rating < 3.5) return false;

                if (filters.ratingMoreThan4 && parking.rating < 4) return false;

                if (filters.ratingMoreThan45 && parking.rating < 4.5) return false;

                if (filters.minPrice && parking.price < filters.minPrice) return false;

                if (filters.maxPrice && parking.price > filters.maxPrice) return false;

                return true;
            })
        );
    }

    setUserProfile(userProfile: IUser) {
        this.userProfile = userProfile;
    }

    toggleSearch() {
        this.isSearchOpened = !this.isSearchOpened;
    }

    toggleFilters() {
        this.isFiltersOpened = !this.isFiltersOpened;
    }

    toggleBooking() {
        this.isBookingOpened = !this.isBookingOpened;
    }

    async fetchParkings() {
        this.setIsParkingsLoading(true);

        const parkings = await ParkingsApiServiceInstanse.getParkings({
            latitude: this.start[1],
            longitude: this.start[0],
        });

        this.setParkings(parkings);
        this.setFilteredParkings(this.parkings);

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

    async fetchUserProfile() {
        const userProfile = await UserApiServiceInstanse.getUserProfile();

        this.setUserProfile(userProfile);
    }

    async deposit(value: number): Promise<void> {
        return UserApiServiceInstanse.deposit(value);
    }

    async bookParking(
        parking_id: number,
        time_start: string,
        time_end: string,
        cars: ICar[],
        place_id: number
    ) {
        return UserApiServiceInstanse.bookParking({
            parking_id,
            time_start,
            time_end,
            cars,
            place_id,
        });
    }

    async createCar(body: ICreateCarBody) {
        return UserApiServiceInstanse.createCar(body);
    }

    async getPlaces(parking_id: number, time_start: string, time_end: string) {
        return ParkingsApiServiceInstanse.getPlaces({
            parking_id,
            time_start,
            time_end,
        });
    }
}
