import { FloatingPanel, FloatingPanelRef } from 'antd-mobile';

import { useEffect, useRef } from 'react';
import { useStores } from '../hooks/useStores';
import { observer } from 'mobx-react-lite';

import { Col, Input, Row, Typography } from 'antd';
import { SearchProps } from 'antd/es/input';
const { Search } = Input;

const anchors = [0, window.innerHeight - 20];

const searchHistory: string[] = [
    'Екатеринбург, ул. Ленина, 1',
    'Екатеринбург, ул. Белинского, 50',
    'Екатеринбург, ул. Розы Люксенбург, 48',
];

const SearchDock = observer(() => {
    const { rootStore } = useStores();
    const ref = useRef<FloatingPanelRef>(null);

    useEffect(() => {
        console.log(rootStore.isSearchOpened);

        if (rootStore.isSearchOpened !== null) {
            ref.current?.setHeight(window.innerHeight - 20);
        }
    }, [rootStore.isSearchOpened]);

    const onSearch: SearchProps['onSearch'] = (value: string) => {
        rootStore.setCurrentSearch(value);
        rootStore.searchParkingsByAddress(value);
        ref.current?.setHeight(0);
    };

    return (
        <FloatingPanel ref={ref} className='filters-dock' anchors={anchors}>
            <div style={{ padding: '0px 12px' }}>
                <Row>
                    <Col span={24}>
                        <Search
                            className='filters-dock__search'
                            placeholder='Введите адрес'
                            allowClear
                            size='large'
                            onSearch={onSearch}
                        />
                    </Col>
                </Row>

                <Row>
                    <Typography.Title style={{ marginTop: 20 }} level={4}>
                        История запросов
                    </Typography.Title>

                    <Col span={24}>
                        {searchHistory.map((address, index) => (
                            <Row align={'top'} style={{ padding: '0 10px' }}>
                                <div className='history-icon'>
                                    <svg
                                        width='20'
                                        height='20'
                                        viewBox='0 0 20 20'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            fill-rule='evenodd'
                                            clip-rule='evenodd'
                                            d='M10 0C15.522 0 20 4.478 20 10C20 15.522 15.522 20 10 20C4.478 20 0 15.522 0 10C0 4.478 4.478 0 10 0ZM11 5H9V11.4142L12.2929 14.7071L13.7071 13.2929L11 10.585V5Z'
                                            fill='#ACB6C3'
                                        />
                                    </svg>
                                </div>

                                <Typography.Text
                                    className='base-text'
                                    style={{ fontSize: 16, marginLeft: 10 }}
                                    key={index}
                                    onClick={() => {
                                        rootStore.setCurrentSearch(address);
                                        rootStore.searchParkingsByAddress(address);
                                        ref.current?.setHeight(0);
                                    }}
                                >
                                    {address}
                                </Typography.Text>

                                <div className='line'></div>
                            </Row>
                        ))}
                    </Col>
                </Row>
            </div>
        </FloatingPanel>
    );
});

export default SearchDock;
