import { useEffect, useState } from 'react';
import { IParking, IPlace } from '../api/models';
import { useStores } from '../hooks/useStores';
import { observer } from 'mobx-react-lite';
import { Row } from 'antd';

type Props = {
    timeRange: [string, string];
    parking: IParking;
    onPlaceSelect: (place: IPlace) => void;
};

const Places = observer(({ parking, timeRange, onPlaceSelect }: Props) => {
    const { rootStore } = useStores();
    const [places, setPlaces] = useState<IPlace[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<number>(0);

    useEffect(() => {
        console.log('fetchPlaces', parking, timeRange);

        async function fetchPlaces() {
            if (timeRange && timeRange.length) {
                const time_start = new Date(timeRange[0]).toISOString();
                const time_end = new Date(timeRange[1]).toISOString();

                const parkingId = rootStore.activeParking?.id as number;

                const places = await rootStore.getPlaces(parkingId, time_start, time_end);

                setPlaces(places);
            }
        }
        fetchPlaces();
    }, [parking, timeRange, rootStore]);

    return (
        <>
            <Row justify={'space-between'} gutter={[16, 16]}>
                {places.map((place, index) => {
                    const backgroundColor = place.is_busy ? '#F5F5F5' : '#EBEDF5';

                    return (
                        <div
                            key={place.id}
                            className='place'
                            onClick={() => {
                                if (!place.is_busy) {
                                    setSelectedPlace(index);
                                    onPlaceSelect(place);
                                }
                            }}
                            style={{
                                backgroundColor:
                                    selectedPlace === index ? '#2F3441' : backgroundColor,
                                color: selectedPlace === index ? '#fff' : '#2F3441',
                            }}
                        >
                            <div className='place__icon'>
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M20.985 10.3491C20.9743 10.2992 20.9586 10.2505 20.9382 10.2037L18.6882 4.95375C18.6303 4.81918 18.5343 4.7045 18.412 4.62387C18.2897 4.54323 18.1465 4.50017 18 4.5H6.00003C5.85321 4.49998 5.70961 4.54305 5.58704 4.62387C5.46447 4.7047 5.36831 4.81973 5.3105 4.95469L3.0605 10.2047C3.0401 10.2515 3.0244 10.3001 3.01363 10.35C3.00412 10.3994 2.99957 10.4497 3.00003 10.5V19.125C3.00003 19.2245 3.03954 19.3198 3.10987 19.3902C3.18019 19.4605 3.27558 19.5 3.37503 19.5H4.87503C4.97449 19.5 5.06987 19.4605 5.1402 19.3902C5.21052 19.3198 5.25003 19.2245 5.25003 19.125V18H18.75V19.125C18.75 19.2245 18.7895 19.3198 18.8599 19.3902C18.9302 19.4605 19.0256 19.5 19.125 19.5H20.625C20.7245 19.5 20.8199 19.4605 20.8902 19.3902C20.9605 19.3198 21 19.2245 21 19.125V10.5C21.0001 10.4493 20.9951 10.3987 20.985 10.3491ZM6.75003 15C6.45336 15 6.16335 14.912 5.91668 14.7472C5.67 14.5824 5.47774 14.3481 5.36421 14.074C5.25068 13.7999 5.22098 13.4983 5.27885 13.2074C5.33673 12.9164 5.47959 12.6491 5.68937 12.4393C5.89915 12.2296 6.16643 12.0867 6.4574 12.0288C6.74837 11.9709 7.04997 12.0006 7.32406 12.1142C7.59815 12.2277 7.83241 12.42 7.99724 12.6666C8.16206 12.9133 8.25003 13.2033 8.25003 13.5C8.25003 13.8978 8.092 14.2794 7.81069 14.5607C7.52939 14.842 7.14786 15 6.75003 15ZM17.25 15C16.9534 15 16.6634 14.912 16.4167 14.7472C16.17 14.5824 15.9777 14.3481 15.8642 14.074C15.7507 13.7999 15.721 13.4983 15.7789 13.2074C15.8367 12.9164 15.9796 12.6491 16.1894 12.4393C16.3992 12.2296 16.6664 12.0867 16.9574 12.0288C17.2484 11.9709 17.55 12.0006 17.8241 12.1142C18.0981 12.2277 18.3324 12.42 18.4972 12.6666C18.6621 12.9133 18.75 13.2033 18.75 13.5C18.75 13.8978 18.592 14.2794 18.3107 14.5607C18.0294 14.842 17.6479 15 17.25 15ZM4.88722 9.75L6.49456 6H17.5055L19.1128 9.75H4.88722Z'
                                        fill={selectedPlace === index ? '#ffffff' : '#2F3441'}
                                    />
                                </svg>
                            </div>

                            <div className='place__number'>{place.number}</div>
                        </div>
                    );
                })}
            </Row>
        </>
    );
});

export default Places;
