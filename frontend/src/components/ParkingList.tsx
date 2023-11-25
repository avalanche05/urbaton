import { List } from 'antd-mobile';
import { useStores } from '../hooks/useStores';
import { observer } from 'mobx-react-lite';
import ParkingGeneral from './ParkingGeneral';

const ParkingList = observer(() => {
    const { rootStore } = useStores();

    return (
        <List>
            {rootStore.parkings.map((parking) => (
                <List.Item key={parking.id}>
                    <ParkingGeneral parking={parking} />
                </List.Item>
            ))}
        </List>
    );
});

export default ParkingList;
