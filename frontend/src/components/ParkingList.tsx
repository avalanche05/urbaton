import { List } from 'antd-mobile';
import { useStores } from '../hooks/useStores';
import { observer } from 'mobx-react-lite';
import ParkingGeneral from './ParkingGeneral';

const ParkingList = observer(() => {
    const { rootStore } = useStores();

    return (
        <List>
            {rootStore.filteredParkings.map((parking) => (
                <List.Item key={parking.id}>
                    <ParkingGeneral parking={parking} />
                </List.Item>
            ))}

            {rootStore.filteredParkings.length === 0 && (
                <div style={{ padding: 20 }}>Ничего не найдено</div>
            )}
        </List>
    );
});

export default ParkingList;
