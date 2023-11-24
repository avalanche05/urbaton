import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useStores } from '../hooks/useStores';

const Parkings = () => {
    const [YMaps, setYMaps] = useState(<div />);
    const map = useRef(null);
    const { rootStore } = useStores();

    // useEffect(() => {
    //     async function fetchDepartments() {
    //         await rootStore.fetchUser();
    //     }

    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (geo: GeolocationPosition) => {
    //                 rootStore.setStart([geo.coords.longitude, geo.coords.latitude]);
    //                 rootStore.setMapLocation({
    //                     ...rootStore.mapLocation,
    //                     center: [geo.coords.longitude, geo.coords.latitude],
    //                 });

    //                 fetchDepartments();
    //             },
    //             (error) => {
    //                 console.log(error);
    //                 fetchDepartments();
    //             }
    //         );
    //     }
    // }, [rootStore]);

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

                const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls } =
                    reactify.module(ymaps3);
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
                        {/* {rootStore.atms.map((atm) => {
                            return (
                                <YMapMarker
                                    key={atm._id}
                                    coordinates={[atm.longitude, atm.latitude]}
                                    draggable={false}
                                    position={'center'}
                                >
                                    <AtmMarker atm={atm} />
                                </YMapMarker>
                            );
                        })} */}
                        <YMapDefaultMarker coordinates={[rootStore.start[0], rootStore.start[1]]} />
                    </YMap>
                ));
            } catch (e) {
                console.log(e);

                setYMaps(<div />);
            }
        })();
    }, [rootStore.mapLocation, rootStore.start]);

    return (
        <>
            <div style={{ width: '100%', height: '100vh' }}>{YMaps}</div>
        </>
    );
};

export default Parkings;
