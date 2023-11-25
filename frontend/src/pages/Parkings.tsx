import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useStores } from '../hooks/useStores';
import { observer } from 'mobx-react-lite';
import { getDistance } from '../utils/GeoUtils';
import { CitiesCoords } from '../contants';
import { mapGeoArrayToLineString } from '../utils/mapGeoToLineString';
import Dock from '../components/Dock';
import Search from '../components/Search';
import SearchDock from '../components/SearchDock';
import FiltersDock from '../components/FiltersDock';

const Parkings = observer(() => {
    const [YMaps, setYMaps] = useState(<div />);
    const map = useRef(null);
    const { rootStore } = useStores();

    useEffect(() => {
        async function fetchParkings() {
            await rootStore.fetchParkings();
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (geo: GeolocationPosition) => {
                    const distanceFromEkb = getDistance(
                        { latitude: geo.coords.latitude, longitude: geo.coords.longitude },
                        {
                            latitude: CitiesCoords.ekb.lattitude,
                            longitude: CitiesCoords.ekb.longitude,
                        }
                    );

                    if (distanceFromEkb > 80000) {
                        rootStore.setStart({
                            longitude: CitiesCoords.ekb.longitude,
                            latitude: CitiesCoords.ekb.lattitude,
                        });
                        rootStore.setMapLocation({
                            ...rootStore.mapLocation,
                            center: [CitiesCoords.ekb.longitude, CitiesCoords.ekb.lattitude],
                        });
                    } else {
                        rootStore.setStart({
                            latitude: geo.coords.latitude,
                            longitude: geo.coords.longitude,
                        });
                        rootStore.setMapLocation({
                            ...rootStore.mapLocation,
                            center: [geo.coords.longitude, geo.coords.latitude],
                        });
                    }

                    fetchParkings();
                },
                (error) => {
                    console.log(error);
                    fetchParkings();
                }
            );
        }
    }, [rootStore]);

    useEffect(() => {
        (async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const ymaps3 = window.ymaps3;
                const [ymaps3React] = await Promise.all([
                    ymaps3.import('@yandex/ymaps3-reactify'),
                    ymaps3.ready,
                ]);

                const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);

                const {
                    YMap,
                    YMapDefaultSchemeLayer,
                    YMapDefaultFeaturesLayer,
                    YMapControls,
                    YMapFeature,
                } = reactify.module(ymaps3);
                const { YMapZoomControl, YMapGeolocationControl } = reactify.module(
                    await ymaps3.import('@yandex/ymaps3-controls@0.0.1')
                );
                const { YMapDefaultMarker } = reactify.module(
                    await ymaps3.import('@yandex/ymaps3-markers@0.0.1')
                );

                setYMaps(() => (
                    <YMap
                        location={rootStore.mapLocation}
                        camera={{ tilt: 0, azimuth: 0, duration: 0 }}
                        ref={map}
                    >
                        <YMapDefaultSchemeLayer />
                        <YMapDefaultFeaturesLayer />
                        <YMapControls position='right'>
                            <YMapZoomControl />
                        </YMapControls>
                        <YMapControls position='left'>
                            <YMapGeolocationControl />
                        </YMapControls>
                        {rootStore.filteredParkings.map((parking) => {
                            return (
                                <YMapFeature
                                    key={parking.id}
                                    {...mapGeoArrayToLineString(
                                        parking.polygon,
                                        parking,
                                        rootStore.activeParking || undefined
                                    )}
                                    onClick={() => {
                                        rootStore.setActiveParking(parking);
                                    }}
                                />
                            );
                        })}

                        <YMapDefaultMarker coordinates={[rootStore.start[0], rootStore.start[1]]} />
                    </YMap>
                ));
            } catch (e) {
                console.log(e);

                setYMaps(<div />);
            }
        })();
    }, [
        rootStore.mapLocation,
        rootStore.start,
        rootStore.filteredParkings,
        rootStore.activeParking,
        rootStore,
    ]);

    return (
        <>
            <div style={{ width: '100%', height: '100vh' }}>{YMaps}</div>

            <Dock />

            <Search />
            <SearchDock />
            <FiltersDock />
        </>
    );
});

export default Parkings;
