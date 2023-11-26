import { Button, Col, Form, Input, InputNumber, Modal, Row, Typography, message } from 'antd';
import { Link } from 'react-router-dom';
import { useStores } from '../hooks/useStores';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { valueType } from 'antd/es/statistic/utils';
import Car from '../components/Car';
import { Button as AdmiralButton } from '@admiral-ds/react-ui';
import { ICreateCarBody } from '../api/models';

const Profile = observer(() => {
    const [messageApi, contextHolder] = message.useMessage();
    const { rootStore } = useStores();
    const [openDepositModal, setOpenDepositModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [moneyAmount, setMoneyAmount] = useState<number>(0);
    const [openCreateCarModal, setOpenCreateCarModal] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        async function fetchUserProfile() {
            await rootStore.fetchUserProfile();
        }

        fetchUserProfile();
    }, [rootStore]);

    const deposit = () => {
        setConfirmLoading(true);

        rootStore
            .deposit(moneyAmount)
            .then(() => {
                messageApi.success('Баланс успешно пополнен');
                rootStore.fetchUserProfile();
            })
            .catch(() => {
                messageApi.error('Ошибка пополнения баланса');
            })
            .finally(() => {
                setOpenDepositModal(false);
                setConfirmLoading(false);
            });
    };

    const cancelDepositModal = () => {
        setOpenDepositModal(false);
    };

    const onMoneyAmountChange = (value: valueType | null) => {
        if (value) {
            setMoneyAmount(parseFloat(value.toString()));
        }
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

    return (
        <>
            {contextHolder}
            <div className='profile-page'>
                <Row justify={'space-between'} align={'middle'}>
                    <Typography.Title level={2}>Личный кабинет</Typography.Title>

                    <Link to='/parkings' style={{ color: '#fff' }}>
                        <div style={{ cursor: 'pointer' }} className='search-button'>
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M10.9394 11.999L6.96973 15.9687L8.03039 17.0294L12.0001 13.0597L15.9698 17.0294L17.0305 15.9687L13.0608 11.999L17.0304 8.02941L15.9697 6.96875L12.0001 10.9383L8.03051 6.96875L6.96985 8.02941L10.9394 11.999Z'
                                    fill='#6B7683'
                                />
                            </svg>
                        </div>
                    </Link>
                </Row>

                <Row>
                    <Typography.Title level={3}>Электронный кошелек</Typography.Title>
                </Row>

                <Row className='balance-block'>
                    <Col>
                        <Button
                            onClick={() => setOpenDepositModal(true)}
                            type='primary'
                            icon={<PlusOutlined />}
                            size={'small'}
                        />
                    </Col>
                    <Col>
                        <Row>
                            <Typography.Text className='balance-block__balance'>
                                {rootStore.userProfile?.balance} ₽
                            </Typography.Text>
                        </Row>

                        <Row className='balance-block__desc'>
                            <Typography.Text>Баланс</Typography.Text>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Typography.Title level={3} style={{ marginTop: 20 }}>
                        Машины
                    </Typography.Title>
                </Row>

                <Row gutter={[8, 16]}>
                    {rootStore.userProfile?.cars.map((car) => (
                        <Col span={12}>
                            <Car onChange={() => {}} key={car.id} car={car} />
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

                <Row style={{ marginTop: 20 }}>
                    <Typography.Title level={3}>Забронированные места</Typography.Title>
                </Row>

                <Row>
                    <Typography.Text>Пока нет ни одного забронированного места</Typography.Text>
                </Row>
            </div>

            <Modal
                title='Пополнить баланс'
                open={openDepositModal}
                onOk={deposit}
                confirmLoading={confirmLoading}
                onCancel={cancelDepositModal}
                okText='Пополнить'
                cancelText='Отмена'
            >
                <Typography.Paragraph style={{ marginTop: 16 }}>
                    Тестовое пополнение баланса на сумму:
                </Typography.Paragraph>

                <InputNumber
                    onChange={onMoneyAmountChange}
                    style={{ width: '100%' }}
                    placeholder='Введите сумму'
                    min={0}
                />
            </Modal>

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
        </>
    );
});

export default Profile;
