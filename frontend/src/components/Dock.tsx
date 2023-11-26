import { FloatingPanel } from 'antd-mobile';
import { useStores } from '../hooks/useStores';
import { observer } from 'mobx-react-lite';
import ParkingList from './ParkingList';
import ParkingDetails from './ParkingDetails';

const anchors = [50, window.innerHeight * 0.4, window.innerHeight * 0.8];

const Dock = observer(() => {
    const { rootStore } = useStores();

    const component = rootStore.activeParking ? (
        <ParkingDetails parking={rootStore.activeParking} />
    ) : (
        <ParkingList />
    );

    return (
        <>
            <FloatingPanel className='dock' anchors={anchors}>
                {component}
            </FloatingPanel>
        </>
    );
});
export default Dock;
