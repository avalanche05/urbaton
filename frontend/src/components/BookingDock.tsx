import { FloatingPanel, FloatingPanelRef } from 'antd-mobile';
import { useEffect, useRef } from 'react';
import { useStores } from '../hooks/useStores';
import { observer } from 'mobx-react-lite';
import Booking from './Booking';

const anchors = [0, window.innerHeight - 20];

const BookingDock = observer(() => {
    const ref = useRef<FloatingPanelRef>(null);
    const { rootStore } = useStores();

    useEffect(() => {
        if (rootStore.isBookingOpened !== null) {
            ref.current?.setHeight(window.innerHeight - 20);
        }
    }, [rootStore.isBookingOpened]);

    return (
        <>
            <FloatingPanel ref={ref} className='dock' anchors={anchors}>
                <Booking floatPanelRef={ref} />
            </FloatingPanel>
        </>
    );
});
export default BookingDock;
