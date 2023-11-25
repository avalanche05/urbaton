import { Button, Col, Rate, Row, message } from 'antd';
import distanceConverter from '../utils/distanceConverter';
import { FileAddOutlined } from '@ant-design/icons';
import { useStores } from '../hooks/useStores';
import { IParking } from '../api/models';

type Props = {
    parking: IParking;
};

const ParkingGeneral = ({ parking: parking }: Props) => {
    const { rootStore } = useStores();
    const [, contextHolder] = message.useMessage();

    return (
        <>
            {contextHolder}
            <div className='parking-general'>
                <div
                    onClick={() => {
                        rootStore.setActiveParking(parking);
                    }}
                >
                    <Row>
                        <div className='parking-general__name parking-general__item'>
                            {parking.id}
                        </div>
                    </Row>

                    <Row>
                        <div className='parking-general__wait-time parking-general__item'>
                            {parking.busy_base_spaces} / {parking.base_spaces} мест занято
                        </div>
                    </Row>

                    <Row wrap={false} justify={'space-between'}>
                        <Col span={18}>
                            <div className='parking-general__address parking-general__item'>
                                {parking.address}
                            </div>
                        </Col>

                        <Col>
                            <div className='parking-general__distance parking-general__item'>
                                {parking.distance ? distanceConverter(parking.distance / 1000) : ''}
                            </div>
                        </Col>
                    </Row>
                </div>

                <Row justify={'space-between'} align={'middle'} style={{ marginTop: 7 }}>
                    <Col>
                        <Rate
                            // onChange={(value: number) =>
                            //     rootStore
                            //         .postParkingRating(value, parking._id)
                            //         .then(() => {
                            //             messageApi.success('Отзыв добавлен');
                            //         })
                            //         .catch(() => {
                            //             messageApi.error('Ошибка добавления отзыва');
                            //         })
                            // }
                            allowHalf
                            defaultValue={parking.rating}
                        />
                    </Col>

                    <Col>
                        В избранное
                        <Button
                            style={{
                                marginLeft: 10,
                                backgroundColor: parking.is_favorite ? '#0062ff' : '#ebedf5',
                                color: parking.is_favorite ? '#fff' : '#6b7683',
                                border: 'none',
                            }}
                            type='default'
                            shape='circle'
                            // onClick={() => {
                            //     rootStore
                            //         .setAsFavorite(parking._id)
                            //         .then(() => {
                            //             messageApi.success('Отделение добавлено в избранные');
                            //         })
                            //         .catch(() => {
                            //             messageApi.error('Ошибка добавления отделения в избранное');
                            //         });
                            // }}
                            icon={<FileAddOutlined />}
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default ParkingGeneral;
