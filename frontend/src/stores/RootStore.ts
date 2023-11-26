import { makeAutoObservable } from 'mobx';
import { IFilter, IGeo, ILineString, IMapLocation } from '../models';
import { ICar, ICreateCarBody, IParking } from '../api/models';
import { ParkingsApiServiceInstanse } from '../api/ParkingsApiService';
import { CitiesCoords } from '../contants';
import { getDistance } from '../utils/GeoUtils';
import { UserApiServiceInstanse } from '../api/UserApiService';
import { IUser } from '../api/models/IUser';
import { OpenMapsAipServiceInstanse } from '../api/OpenMapsApiService';
import { mapCoordsToString } from '../utils/mapCoordsToString';
import { mapRouteToCoords } from '../utils/mapRouteToCoords';
import { ReviewsApiServiceInstanse } from '../api/ReviewsApiService';
import { ICreateReviewBody } from '../api/models/IReview';
import { PredictApiServiceInstanse } from '../api/PredictApiServcie';

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
    polylyne: ILineString | null = {
        id: 'route',
        geometry: {
            type: 'LineString',
            coordinates: [],
        },
        style: { stroke: [{ color: '#092896', width: 4 }] },
    };

    constructor() {
        makeAutoObservable(this);
    }

    prepareParkings(parkings: IParking[]): IParking[] {
        return parkings.map((parking) => {
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
        });
    }

    setParkings(parkings: IParking[]) {
        this.parkings = this.prepareParkings(parkings).sort((a, b) => {
            return (
                (a.distance || Number.MAX_SAFE_INTEGER) - (b.distance || Number.MAX_SAFE_INTEGER)
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

            this.fetchRoute();
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

    setPolylyne(polylyne: ILineString | null) {
        this.polylyne = polylyne;
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

        const addressLocation = await ParkingsApiServiceInstanse.getGeoLocation(address);

        this.setStart(addressLocation);

        const parkings = this.prepareParkings(this.parkings).sort((a, b) => {
            return (
                (a.distance || Number.MAX_SAFE_INTEGER) - (b.distance || Number.MAX_SAFE_INTEGER)
            );
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

    async fetchRoute() {
        if (this.activeParking !== null) {
            const route = await OpenMapsAipServiceInstanse.fetchRoute(
                mapCoordsToString(this.start),
                mapCoordsToString([
                    this.activeParking.center.longitude ?? 0,
                    this.activeParking.center.latitude ?? 0,
                ])
            );

            this.setPolylyne({
                id: 'route',
                geometry: {
                    type: 'LineString',
                    coordinates: mapRouteToCoords(route),
                },
                style: { stroke: [{ color: '#196dff', width: 4 }] },
            });

            this.setMapLocation({
                center: [this.activeParking.center.longitude, this.activeParking.center.latitude],
                zoom: 16,
            });

            return route;
        }
    }

    async fetchReviews() {
        return ReviewsApiServiceInstanse.getReviews(this.activeParking?.id ?? 0);
    }

    async createReview(body: ICreateReviewBody) {
        return ReviewsApiServiceInstanse.createReview(body);
    }

    async getWorkload() {
        return PredictApiServiceInstanse.getParkingWorkload();
    }
}
