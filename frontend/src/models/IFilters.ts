export interface IFilter {
    isOpen?: boolean;
    allDay?: boolean;
    lowWorkload?: boolean;
    disabled?: boolean;
    electro?: boolean;
    camera?: boolean;
    protected?: boolean;
    favorite?: boolean;
    ratingMoreThan35?: boolean;
    ratingMoreThan4?: boolean;
    ratingMoreThan45?: boolean;
    minPrice?: number;
    maxPrice?: number;
}
