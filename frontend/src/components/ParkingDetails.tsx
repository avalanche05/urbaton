import { IParking } from '../api/models';
import ParkingGeneral from './ParkingGeneral';
import { Button, Row, Tabs } from 'antd';
import { useStores } from '../hooks/useStores';
import { LeftOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import ParkingDetailsGeneralTab from './ParkingDetailsGeneralTab';
import ParkingReviews from './ParkingReviews';

type Props = {
    parking: IParking;
};

const ParkingDetails = observer(({ parking }: Props) => {
    const { rootStore } = useStores();

    const items = [
        {
            key: '1',
            label: 'Общее',
            children: <ParkingDetailsGeneralTab parking={parking} />,
        },
        {
            key: '2',
            label: 'Отзывы',
            children: <ParkingReviews />,
        },
    ];

    return (
        <>
            {parking && (
                <>
                    <div className='parking__details'>
                        <Row>
                            <Button
                                style={{ marginTop: 10, padding: 0 }}
                                onClick={() => rootStore.setActiveParking(null)}
                                type='text'
                            >
                                <LeftOutlined />
                                Все парковки
                            </Button>
                        </Row>

                        <ParkingGeneral parking={parking} />

                        <Tabs defaultActiveKey='1' items={items} />
                    </div>
                </>
            )}
        </>
    );
});

export default ParkingDetails;
