import {
    Col,
    DatePicker,
    DatePickerProps,
    Drawer,
    Form,
    Input,
    Modal,
    Row,
    Typography,
    message,
} from 'antd';
import { FloatingPanelRef } from 'antd-mobile';
import { useStores } from '../hooks/useStores';
import { Button as AdmiralButton } from '@admiral-ds/react-ui';
import distanceConverter from '../utils/distanceConverter';
import { useState } from 'react';
import Car from './Car';
import { ICar, ICreateCarBody, IParking, IPlace } from '../api/models';
import { observer } from 'mobx-react-lite';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { RangePickerProps } from 'antd/es/date-picker';
import Places from './Places';
import dayjs from 'dayjs';

type Props = {
    floatPanelRef?: React.RefObject<FloatingPanelRef>;
};

const { RangePicker } = DatePicker;

const Booking = observer(({ floatPanelRef }: Props) => {
    const { rootStore } = useStores();
    const [isLoading, setIsLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [openCreateCarModal, setOpenCreateCarModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectedCarsIndexes, setSelectedCarsIndexes] = useState<number[]>([]);
    const [form] = Form.useForm();
    const [timeRange, setTimeRange] = useState<[string, string] | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<IPlace | null>(null);

    const showDrawer = () => {
        setDrawerOpen(true);
    };

    const onDrawerClose = () => {
        setDrawerOpen(false);
    };

    const createCar = async () => {
        form.validateFields().then(() => {
            setConfirmLoading(true);

            const body: ICreateCarBody = {
                ...form.getFieldsValue(),
                type: 'Обычная',
            };

            rootStore
                .createCar(body)
                .then(() => {
                    messageApi.success('Автомобиль добавлен');

                    rootStore.fetchUserProfile();
                })
                .catch(() => {
                    messageApi.error('Ошибка добавления автомобиля');
                })
                .finally(() => {
                    setOpenCreateCarModal(false);
                    setConfirmLoading(false);
                });
        });
    };

    const onCarCheckboxChanged = (e: CheckboxChangeEvent, car: ICar) => {
        const index = rootStore.userProfile?.cars.findIndex((_car) => _car.id === car.id);

        if (index === undefined) {
            return;
        }

        if (e.target.checked && !selectedCarsIndexes.includes(index)) {
            setSelectedCarsIndexes([...selectedCarsIndexes, index]);
        } else if (!e.target.checked && selectedCarsIndexes.includes(index)) {
            setSelectedCarsIndexes(selectedCarsIndexes.filter((i) => i !== index));
        }
    };

    // const onRangeChange = (dateString: [string, string] | string) => {
    //     setTimeRange(dateString);
    // };

    const onRangeChange = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string
    ) => {
        setTimeRange(dateString as [string, string]);
    };

    const onRangeOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
        console.log('onOk: ', value);
    };

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };

    const calculatePrice = (time1: string, time2: string) => {
        const date1 = new Date(time1);
        const date2 = new Date(time2);

        const differenceInMilliseconds = date2.getTime() - date1.getTime();
        const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
        return Math.round(differenceInHours) * 30;
    };

    return (
        <>
            {contextHolder}
            <div style={{ padding: '0 16px' }}>
                <Row>
                    <div className='parking-general__name parking-general__item'>
                        {rootStore.activeParking?.id}
                    </div>
                </Row>

                <Row>
                    <div className='parking-general__wait-time parking-general__item'>
                        {rootStore.activeParking?.busy_base_spaces} /{' '}
                        {rootStore.activeParking?.base_spaces} мест занято
                    </div>
                </Row>

                <Row wrap={false} justify={'space-between'}>
                    <Col span={18}>
                        <div className='parking-general__address parking-general__item'>
                            {rootStore.activeParking?.address}
                        </div>
                    </Col>

                    <Col>
                        <div className='parking-general__distance parking-general__item'>
                            {rootStore.activeParking?.distance
                                ? distanceConverter(rootStore.activeParking?.distance / 1000)
                                : ''}
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Typography.Title level={4} style={{ marginTop: 16 }}>
                        Машины
                    </Typography.Title>
                </Row>

                <Row gutter={[8, 16]}>
                    {rootStore.userProfile?.cars.map((car) => (
                        <Col span={12}>
                            <Car onChange={onCarCheckboxChanged} key={car.id} car={car} />
                        </Col>
                    ))}

                    <AdmiralButton
                        onClick={() => setOpenCreateCarModal(true)}
                        appearance='secondary'
                        style={{ width: '100%', marginTop: 16 }}
                    >
                        Добавить машину
                    </AdmiralButton>
                </Row>

                <Row>
                    <Typography.Title level={4} style={{ marginTop: 16 }}>
                        Тип места
                    </Typography.Title>
                </Row>

                <Row>
                    {!timeRange ? 'Выбрать место можно только после выбора времени' : ''}

                    <AdmiralButton
                        onClick={() => showDrawer()}
                        appearance='secondary'
                        style={{ width: '100%', marginTop: 16 }}
                        disabled={!timeRange}
                    >
                        Выбрать конкретное место
                    </AdmiralButton>

                    {selectedPlace ? 'Выбрано место ' + selectedPlace.number : ''}
                </Row>

                <Row>
                    <Typography.Title level={4} style={{ marginTop: 16 }}>
                        Время
                    </Typography.Title>
                </Row>

                <Row>
                    <RangePicker
                        showTime={{ format: 'HH:mm' }}
                        format='YYYY-MM-DD HH:mm'
                        onChange={onRangeChange}
                        onOk={onRangeOk}
                        disabledDate={disabledDate}
                    />
                </Row>

                <div className='details__actions'>
                    <Col>
                        <AdmiralButton
                            disabled={true}
                            style={{ opacity: 1, backgroundColor: 'black', color: 'white' }}
                        >
                            {!timeRange
                                ? 'Введите время брони'
                                : `Стоимость парковки ${calculatePrice(
                                      timeRange[0],
                                      timeRange[1]
                                  )} ₽`}
                            `
                        </AdmiralButton>

                        <AdmiralButton
                            disabled={!timeRange}
                            onClick={() => {
                                setIsLoading(true);

                                const time_start = new Date(timeRange?.[0] as string).toISOString();
                                const time_end = new Date(timeRange?.[1] as string).toISOString();
                                const cars = selectedCarsIndexes.map(
                                    (index) => rootStore.userProfile?.cars[index]
                                );

                                rootStore
                                    .bookParking(
                                        rootStore.activeParking?.id as number,
                                        time_start,
                                        time_end,
                                        cars as ICar[],
                                        selectedPlace?.id as number
                                    )
                                    .then(() => {
                                        messageApi.success('Место забронировано');
                                    })
                                    .catch(() => {
                                        messageApi.error('Ошибка бронирования места');
                                    })
                                    .finally(() => {
                                        setIsLoading(false);
                                        floatPanelRef?.current?.setHeight(0);
                                    });
                            }}
                            loading={isLoading}
                        >
                            Забронировать
                        </AdmiralButton>
                    </Col>
                </div>
            </div>

            <Modal
                title='Новый автомобиль'
                open={openCreateCarModal}
                onOk={createCar}
                confirmLoading={confirmLoading}
                onCancel={() => {
                    form.resetFields();
                    setOpenCreateCarModal(false);
                }}
                okText='Добавить'
                cancelText='Отмена'
            >
                <Form form={form} name='createCar'>
                    <Form.Item
                        name='name'
                        label='Название'
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите название машины',
                            },
                        ]}
                    >
                        <Input size='large' placeholder='Название машины' />
                    </Form.Item>
                    <Form.Item
                        name='number'
                        label='Номер машины'
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите пароль',
                            },
                            {
                                pattern: /^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/iu,
                                message: 'Неверный формат номера',
                            },
                        ]}
                    >
                        <Input size='large' placeholder='Номер машины' />
                    </Form.Item>
                </Form>
            </Modal>

            <Drawer
                title='Выбор места парковки'
                placement='right'
                onClose={onDrawerClose}
                open={drawerOpen}
            >
                <Places
                    timeRange={timeRange as [string, string]}
                    parking={rootStore.activeParking as IParking}
                    onPlaceSelect={(place) => setSelectedPlace(place)}
                />
            </Drawer>
        </>
    );
});

export default Booking;
