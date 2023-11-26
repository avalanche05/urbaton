import { Button as AdmiralButton } from '@admiral-ds/react-ui';
import { useStores } from '../hooks/useStores';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Button, Col, Drawer, Rate, Row, Typography } from 'antd';
import { IReview } from '../api/models/IReview';
import { Input } from 'antd';

const { TextArea } = Input;

const problemsDefault = [
    {
        isActive: false,
        label: 'Мое место уже занято',
    },
    {
        isActive: false,
        label: 'Плохое состояние парковки',
    },
    {
        isActive: false,
        label: 'Плохое состояние дороги рядом',
    },
    {
        isActive: false,
        label: 'Въезд затруднен',
    },
    {
        isActive: false,
        label: 'Указанных свободных мест не было',
    },
    {
        isActive: false,
        label: 'Мне перегородили выезд',
    },
    {
        isActive: false,
        label: 'Некорректные данные о парковке',
    },
];

const ParkingReviews = observer(() => {
    const { rootStore } = useStores();
    const [openCreateReviewDrawer, setOpenCreateReviewDrawer] = useState(false);
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [problems, setProblems] = useState(problemsDefault);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchReviews() {
            const reviews = await rootStore.fetchReviews();

            setReviews(reviews);
        }

        fetchReviews();
    }, [rootStore]);

    return (
        <>
            <AdmiralButton
                onClick={() => setOpenCreateReviewDrawer(true)}
                appearance='secondary'
                style={{ width: '100%', marginTop: 16 }}
            >
                Добавить отзыв
            </AdmiralButton>

            <Row style={{ marginTop: 16 }}>
                {reviews?.map((review) => (
                    <div style={{ marginTop: 20, width: '100%' }} key={review.id}>
                        <Row align={'middle'} justify={'space-between'}>
                            <Col>
                                <Typography.Title level={4}>{review.username}</Typography.Title>
                            </Col>

                            <Col>
                                <Rate allowHalf defaultValue={review.rating} disabled={true} />
                            </Col>
                        </Row>

                        <Row style={{ marginTop: -10 }}>
                            <Typography.Text>{review.text}</Typography.Text>
                        </Row>
                    </div>
                ))}
            </Row>

            <Drawer
                title='Написать отзыв о парковке'
                placement='right'
                onClose={() => setOpenCreateReviewDrawer(false)}
                open={openCreateReviewDrawer}
            >
                <Row>
                    <Typography.Title level={4}>Оцените парковку</Typography.Title>
                </Row>
                <Row>
                    <Rate allowHalf defaultValue={0} />
                </Row>

                <Row style={{ marginTop: 20 }}>
                    <Typography.Title level={4}>Укажите проблемы</Typography.Title>
                </Row>
                <Row>
                    {problems.map((problem, index) => (
                        <Button
                            key={index}
                            className={`review__button ${
                                problem.isActive ? 'review__button_active' : ''
                            }`}
                            style={{ marginRight: 10, marginTop: 10 }}
                            onClick={() => {
                                const newProblems = problems.map((problem, i) => {
                                    if (i === index) {
                                        return {
                                            ...problem,
                                            isActive: !problem.isActive,
                                        };
                                    }

                                    return problem;
                                });

                                setProblems(newProblems);
                            }}
                        >
                            {problem.label}
                        </Button>
                    ))}
                </Row>

                <Row style={{ marginTop: 20, width: '100%' }}>
                    <Typography.Title level={4}>Оставьте отзыв</Typography.Title>

                    <TextArea
                        onChange={(e) => setText(e.target.value)}
                        placeholder='Развернутый отзыв'
                        rows={4}
                    />
                </Row>

                <AdmiralButton
                    style={{ marginTop: 20, width: '100%' }}
                    loading={loading}
                    onClick={() => {
                        setLoading(true);
                        rootStore
                            .createReview({
                                rating: 5,
                                text,
                                tags: problems
                                    .filter((problem) => problem.isActive)
                                    .map((problem) => problem.label),
                                parking_id: rootStore.activeParking?.id || 0,
                            })
                            .then(() => {
                                rootStore.fetchReviews().then((reviews) => {
                                    setReviews(reviews);
                                });
                            })
                            .catch((e) => {
                                console.log(e);
                            })
                            .finally(() => {
                                setText('');
                                setProblems(problemsDefault);
                                setLoading(false);
                            });

                        setOpenCreateReviewDrawer(false);
                    }}
                >
                    Отправить отзыв
                </AdmiralButton>
            </Drawer>
        </>
    );
});

export default ParkingReviews;
