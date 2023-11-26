import { FloatingPanel, FloatingPanelRef } from 'antd-mobile';

import { useEffect, useRef, useState } from 'react';
import { useStores } from '../hooks/useStores';
import { observer } from 'mobx-react-lite';

import { Col, InputNumber, Row, Typography } from 'antd';
import { Button } from '@admiral-ds/react-ui';
import { Button as AdmiralButton } from '@admiral-ds/react-ui';
import { IFilter } from '../models';
import { ValueType } from 'recharts/types/component/DefaultTooltipContent';

const anchors = [0, window.innerHeight - 20];

const FiltersDock = observer(() => {
    const { rootStore } = useStores();
    const ref = useRef<FloatingPanelRef>(null);
    const [filters, setFilters] = useState<IFilter>(rootStore.filters);
    const [isLoading, setIsLoading] = useState(false);

    const timeFilters = [
        {
            title: 'Открыто сейчас',
            active: filters?.isOpen,
            key: 'isOpen',
            onChange: () => {
                setFilters({
                    ...filters,
                    isOpen: !filters?.isOpen,
                });
            },
        },
        {
            title: 'Круглосуточно',
            active: filters?.allDay,
            key: 'allDay',
            onChange: () => {
                setFilters({
                    ...filters,
                    allDay: !filters?.allDay,
                });
            },
        },
    ];

    const additionalFilters = [
        {
            title: 'Низкая загруженность',
            active: filters?.lowWorkload,
            key: 'lowWorkload',
            onChange: () => {
                setFilters({
                    ...filters,
                    lowWorkload: !filters?.lowWorkload,
                });
            },
        },
        {
            title: 'Места для инвалидов',
            active: filters?.disabled,
            key: 'disabled',
            onChange: () => {
                setFilters({
                    ...filters,
                    disabled: !filters?.disabled,
                });
            },
        },
        // camera, protected, electro
        {
            title: 'Камеры  наблюдения',
            active: filters?.camera,
            key: 'camera',
            onChange: () => {
                setFilters({
                    ...filters,
                    camera: !filters?.camera,
                });
            },
        },
        {
            title: 'Охраняемая',
            active: filters?.protected,
            key: 'protected',
            onChange: () => {
                setFilters({
                    ...filters,
                    protected: !filters?.protected,
                });
            },
        },
        {
            title: 'Для электромобилей',
            active: filters?.electro,
            key: 'electro',
            onChange: () => {
                setFilters({
                    ...filters,
                    electro: !filters?.electro,
                });
            },
        },
    ];

    const ratingFilters = [
        {
            title: 'от 3.5',
            active: filters?.ratingMoreThan35,
            key: 'ratingMoreThan35',
            onChange: () => {
                setFilters({
                    ...filters,
                    ratingMoreThan35: !filters?.ratingMoreThan35,
                });
            },
        },
        {
            title: 'от 4.0',
            active: filters?.ratingMoreThan4,
            key: 'ratingMoreThan4',
            onChange: () => {
                setFilters({
                    ...filters,
                    ratingMoreThan4: !filters?.ratingMoreThan4,
                });
            },
        },
        {
            title: 'от 4.5',
            active: filters?.ratingMoreThan45,
            key: 'ratingMoreThan45',
            onChange: () => {
                setFilters({
                    ...filters,
                    ratingMoreThan45: !filters?.ratingMoreThan45,
                });
            },
        },
    ];

    useEffect(() => {
        setFilters(rootStore.filters);
    }, [rootStore.filters]);

    useEffect(() => {
        if (rootStore.isFiltersOpened !== null) {
            ref.current?.setHeight(window.innerHeight - 20);
        }
    }, [rootStore.isFiltersOpened]);

    const onMinPriceChange = (value: ValueType | null) => {
        setFilters({
            ...filters,
            minPrice: Number(value),
        });
    };

    const onMaxPriceChange = (value: ValueType | null) => {
        setFilters({
            ...filters,
            maxPrice: Number(value),
        });
    };

    return (
        <FloatingPanel ref={ref} className='filters-dock' anchors={anchors}>
            <div style={{ padding: '0px 12px' }}>
                <Row>
                    <Typography.Title level={4}>Фильтры</Typography.Title>
                </Row>

                <Row>
                    <Typography.Title level={5}>Время</Typography.Title>
                </Row>

                <Row>
                    <div className='filters'>
                        {timeFilters.map((filter, index) => {
                            const active = filter.active;

                            return (
                                <Button
                                    key={index}
                                    className={`filters__button ${
                                        active ? 'filters__button_active' : ''
                                    }`}
                                    dimension='m'
                                    onClick={filter.onChange}
                                >
                                    {filter.title}
                                </Button>
                            );
                        })}
                    </div>
                </Row>

                <Row style={{ marginTop: 20 }}>
                    <Typography.Title level={5}>Дополнительно</Typography.Title>
                </Row>

                <Row>
                    <div className='filters'>
                        {additionalFilters.map((filter, index) => {
                            const active = filter.active;

                            return (
                                <Button
                                    key={index}
                                    className={`filters__button ${
                                        active ? 'filters__button_active' : ''
                                    }`}
                                    dimension='m'
                                    onClick={filter.onChange}
                                >
                                    {filter.title}
                                </Button>
                            );
                        })}
                    </div>
                </Row>

                <Row style={{ marginTop: 20 }}>
                    <Typography.Title level={5}>Рейтинг</Typography.Title>
                </Row>

                <Row>
                    <div className='filters'>
                        {ratingFilters.map((filter, index) => {
                            const active = filter.active;

                            return (
                                <Button
                                    key={index}
                                    className={`filters__button ${
                                        active ? 'filters__button_active' : ''
                                    }`}
                                    dimension='m'
                                    onClick={filter.onChange}
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='12'
                                        height='12'
                                        viewBox='0 0 12 12'
                                        fill='orange'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            clipRule='evenodd'
                                            d='M6 9.44139L2.2918 11.7063L3.3 7.47972L0 4.65292L4.33131 4.30568L6 0.293671L7.66869 4.30568L12 4.65292L8.7 7.47972L9.7082 11.7063L6 9.44139Z'
                                            fill='orange'
                                        />
                                    </svg>

                                    {filter.title}
                                </Button>
                            );
                        })}
                    </div>
                </Row>

                <Row style={{ marginTop: 20 }}>
                    <Typography.Title level={5}>Цена</Typography.Title>
                </Row>

                <Row style={{ marginTop: -10, color: '#ACB6C3' }}>
                    <Typography.Text>руб/ч</Typography.Text>
                </Row>

                <Row style={{ marginTop: 10 }}>
                    <InputNumber placeholder='от' onChange={onMinPriceChange} />

                    <Typography.Text style={{ margin: '0 10px', position: 'relative', top: '5px' }}>
                        -
                    </Typography.Text>

                    <InputNumber placeholder='до' onChange={onMaxPriceChange} />
                </Row>
            </div>

            <div className='details__actions'>
                <Col>
                    <AdmiralButton style={{ opacity: 0 }}>Записаться в отделение</AdmiralButton>

                    <AdmiralButton
                        onClick={() => {
                            setIsLoading(true);

                            rootStore.setFilters(filters);

                            setTimeout(() => {
                                setIsLoading(false);
                                ref.current?.setHeight(0);
                            }, 1000);
                        }}
                        loading={isLoading}
                    >
                        Применить фильтры
                    </AdmiralButton>
                </Col>
            </div>
        </FloatingPanel>
    );
});

export default FiltersDock;
