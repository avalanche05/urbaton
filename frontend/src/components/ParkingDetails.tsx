import { Accordion, AccordionItem } from '@admiral-ds/react-ui';
import { IParking, IWorkload } from '../api/models';
import ParkingGeneral from './ParkingGeneral';
import { Button, Col, Row, Typography, notification } from 'antd';
import { useStores } from '../hooks/useStores';
import { LeftOutlined } from '@ant-design/icons';
import { Button as AdmiralButton } from '@admiral-ds/react-ui';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import WorkLoad from './WorkLoad';

type Props = {
    parking: IParking;
};

const workLoadMock: IWorkload[] = [
    {
        day: 'Понедельник',
        loadHours: [
            { hour: '10', load: 10 },
            { hour: '11', load: 20 },
        ],
    },
    {
        day: 'Вторник',
        loadHours: [
            { hour: '10', load: 10 },
            { hour: '11', load: 30 },
        ],
    },
    {
        day: 'Среда',
        loadHours: [
            { hour: '00-01', load: 10 },
            { hour: '01-02', load: 50 },
        ],
    },
    {
        day: 'Четверг',
        loadHours: [
            { hour: '00-01', load: 10 },
            { hour: '01-02', load: 2 },
        ],
    },
    {
        day: 'Пятница',
        loadHours: [
            { hour: '00-01', load: 6 },
            { hour: '01-02', load: 20 },
        ],
    },
    {
        day: 'Суббота',
        loadHours: [
            { hour: '00-01', load: 1 },
            { hour: '01-02', load: 20 },
        ],
    },
];

const ParkingDetails = observer(({ parking }: Props) => {
    const { rootStore } = useStores();
    const [, contextHolder] = notification.useNotification();
    const [isLoading] = useState<boolean>(false);

    return (
        <>
            {contextHolder}
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

                        <Accordion>
                            <AccordionItem
                                id='work-time'
                                className='parking__details__item'
                                defaultExpanded={true}
                                title={
                                    <>
                                        <svg
                                            width='24'
                                            height='24'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <g clipPath='url(#clip0_170_4491)'>
                                                <path
                                                    d='M12 0C5.37188 0 0 5.37188 0 12C0 18.6281 5.37188 24 12 24C18.6281 24 24 18.6281 24 12C24 5.37188 18.6281 0 12 0ZM12 21.9984C6.47812 21.9984 2.00156 17.5219 2.00156 12C2.00156 6.47812 6.47812 2.00156 12 2.00156C17.5219 2.00156 21.9984 6.47812 21.9984 12C21.9984 17.5219 17.5219 21.9984 12 21.9984ZM12.9984 3.99844H10.9969V12L15.4969 16.5L16.9969 15L12.9984 11.0016V3.99844Z'
                                                    fill='#1E4BD2'
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id='clip0_170_4491'>
                                                    <rect width='24' height='24' fill='white' />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <Typography.Title
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                                margin: 0,
                                                marginLeft: 10,
                                            }}
                                            level={5}
                                        >
                                            Часы работы
                                        </Typography.Title>
                                    </>
                                }
                            >
                                <Row>
                                    <Typography.Text className='base-text'>
                                        {parking.schedule}
                                    </Typography.Text>
                                </Row>
                            </AccordionItem>

                            <Row style={{ marginTop: 20, marginBottom: 20 }} gutter={[8, 8]}>
                                <Col span={12}>
                                    <div className='parking__free-spaces parking__free-spaces_high'>
                                        <Row align={'middle'}>
                                            <span className='free-spaces'>
                                                {parking.base_spaces - parking.busy_base_spaces}
                                            </span>
                                            <span className='total-spaces'>
                                                / {parking.base_spaces}
                                            </span>
                                        </Row>

                                        <Typography.Text className='base-text'>
                                            Свободных мест
                                        </Typography.Text>
                                    </div>
                                </Col>

                                <Col span={12}>
                                    <div className='parking__free-spaces parking__free-spaces_high'>
                                        <Row align={'middle'}>
                                            <span className='free-spaces'>
                                                {parking.disabled_spaces -
                                                    parking.busy_disabled_spaces}
                                            </span>
                                            <span className='total-spaces '>
                                                / {parking.disabled_spaces}
                                            </span>
                                        </Row>

                                        <Typography.Text className='base-text'>
                                            Свободных мест для инвалидов
                                        </Typography.Text>
                                    </div>
                                </Col>

                                <Col span={24}>
                                    <div className='parking__free-spaces'>
                                        <Row align={'middle'}>
                                            <span className='free-spaces'>
                                                {parking.electro_spaces -
                                                    parking.busy_electro_spaces}
                                            </span>
                                            <span className='total-spaces'>
                                                / {parking.electro_spaces}
                                            </span>
                                        </Row>

                                        <Typography.Text className='base-text'>
                                            Свободных мест для электромобилей
                                        </Typography.Text>
                                    </div>
                                </Col>
                            </Row>

                            <AccordionItem
                                defaultExpanded={true}
                                id='work-time'
                                className='parking__details__item'
                                title={
                                    <>
                                        <svg
                                            width='24'
                                            height='24'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M7.125 12C8.98896 12 10.5 10.489 10.5 8.625C10.5 6.76104 8.98896 5.25 7.125 5.25C5.26104 5.25 3.75 6.76104 3.75 8.625C3.75 10.489 5.26104 12 7.125 12Z'
                                                fill='#1E4BD2'
                                            />
                                            <path
                                                d='M10.9688 13.875C9.64875 13.2047 8.19188 12.9375 7.125 12.9375C5.03531 12.9375 0.75 14.2191 0.75 16.7812V18.75H7.78125V17.9967C7.78125 17.1061 8.15625 16.2131 8.8125 15.4688C9.33609 14.8744 10.0692 14.3227 10.9688 13.875Z'
                                                fill='#1E4BD2'
                                            />
                                            <path
                                                d='M15.9375 13.5C13.4967 13.5 8.625 15.0075 8.625 18V20.25H23.25V18C23.25 15.0075 18.3783 13.5 15.9375 13.5Z'
                                                fill='#1E4BD2'
                                            />
                                            <path
                                                d='M15.9375 12C18.2157 12 20.0625 10.1532 20.0625 7.875C20.0625 5.59683 18.2157 3.75 15.9375 3.75C13.6593 3.75 11.8125 5.59683 11.8125 7.875C11.8125 10.1532 13.6593 12 15.9375 12Z'
                                                fill='#1E4BD2'
                                            />
                                        </svg>

                                        <Typography.Title
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                                margin: 0,
                                                marginLeft: 10,
                                            }}
                                            level={5}
                                        >
                                            Загруженность
                                        </Typography.Title>
                                    </>
                                }
                            >
                                <WorkLoad workLoad={workLoadMock} />
                            </AccordionItem>

                            <AccordionItem
                                id='work-time'
                                className='parking__details__item'
                                defaultExpanded={true}
                                title={
                                    <>
                                        <svg
                                            width='25'
                                            height='24'
                                            viewBox='0 0 25 24'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M22.8094 5.94984C22.8094 4.02375 20.2302 2.57156 16.8094 2.57156C13.3887 2.57156 10.8094 4.02375 10.8094 5.94984C10.8094 5.96695 10.8132 5.98313 10.8137 6H10.8094V8.57133H12.5237V8.35899C13.5964 8.96391 15.0973 9.32766 16.8094 9.32766C18.3889 9.32766 19.7844 9.01524 20.8339 8.49234C20.9966 8.66063 21.0952 8.82797 21.0952 8.97469C21.0952 9.6368 19.3859 10.6383 16.8094 10.6383H15.0957V12.3525H16.8094C18.3891 12.3525 19.7851 12.0401 20.8346 11.517C20.9975 11.685 21.095 11.8523 21.095 11.9998C21.095 12.6623 19.3857 13.6638 16.8092 13.6638L16.2024 13.6666C15.8295 13.6699 15.4684 13.6734 15.1163 13.6641L15.0744 15.3776C15.2628 15.3823 15.4536 15.3839 15.6481 15.3839C15.834 15.3839 16.0231 15.3827 16.2153 15.3811L16.8092 15.3783C18.3898 15.3783 19.7862 15.0654 20.836 14.5418C20.9994 14.7113 21.0948 14.8795 21.0948 15.0251C21.0948 15.6877 19.3855 16.6891 16.809 16.6891H15.0952V18.4034H16.809C18.3896 18.4034 19.7858 18.0905 20.8358 17.5669C20.9994 17.7361 21.0948 17.9044 21.0948 18.0502C21.0948 18.7127 19.3855 19.7142 16.809 19.7142H15.0952V21.4284H16.809C20.2297 21.4284 22.809 19.9763 22.809 18.0502C22.809 18.0342 22.8069 18.0162 22.8064 18H22.809V6H22.8048C22.8055 5.98313 22.8094 5.96672 22.8094 5.94984ZM12.5237 5.94984C12.5237 5.28727 14.233 4.28578 16.8094 4.28578C19.3859 4.28578 21.0952 5.28727 21.0952 5.94984C21.0952 6.61195 19.3859 7.61344 16.8094 7.61344C14.233 7.61344 12.5237 6.61195 12.5237 5.94984Z'
                                                fill='#1E4BD2'
                                            />
                                            <path
                                                d='M8.23788 8.57132C4.81718 8.57132 2.23788 10.0235 2.23788 11.9496C2.23788 11.9667 2.24163 11.9829 2.2421 11.9998H2.23788V17.9998C2.23788 19.9259 4.81718 21.378 8.23788 21.378C11.6586 21.378 14.2379 19.9259 14.2379 17.9998V12H14.2337C14.2341 11.9831 14.2379 11.9667 14.2379 11.9498C14.2379 10.0237 11.6586 8.57132 8.23788 8.57132ZM3.9521 14.9749C3.9521 14.8268 4.0489 14.6597 4.21179 14.4916C5.26156 15.015 6.65773 15.3276 8.23788 15.3276C9.81734 15.3276 11.2128 15.0152 12.2623 14.4923C12.425 14.6606 12.5237 14.828 12.5237 14.9747C12.5237 15.6368 10.8144 16.6383 8.23788 16.6383C5.6614 16.6383 3.9521 15.637 3.9521 14.9749ZM8.23788 10.2858C10.8144 10.2858 12.5237 11.2873 12.5237 11.9498C12.5237 12.6119 10.8144 13.6134 8.23788 13.6134C5.6614 13.6134 3.9521 12.6119 3.9521 11.9498C3.9521 11.2873 5.6614 10.2858 8.23788 10.2858ZM8.23788 19.6641C5.6614 19.6641 3.9521 18.6626 3.9521 18C3.9521 17.8526 4.04984 17.6852 4.21249 17.5172C5.26226 18.0403 6.65796 18.353 8.23788 18.353C9.81757 18.353 11.2135 18.0405 12.263 17.5174C12.4259 17.6855 12.5234 17.8528 12.5234 18.0002C12.5237 18.6626 10.8144 19.6641 8.23788 19.6641Z'
                                                fill='#1E4BD2'
                                            />
                                        </svg>

                                        <Typography.Title
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                                margin: 0,
                                                marginLeft: 10,
                                            }}
                                            level={5}
                                        >
                                            {parking.price} руб/час
                                        </Typography.Title>
                                    </>
                                }
                            >
                                <Row>
                                    <Typography.Text className='base-text'>
                                        Сегодня в {new Date().getHours()}:00
                                    </Typography.Text>
                                </Row>
                            </AccordionItem>

                            <AccordionItem
                                id='work-time'
                                className='parking__details__item'
                                title={
                                    <>
                                        <svg
                                            width='24'
                                            height='24'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M12 21L12.88 20.62C14.7249 19.8284 16.318 18.5471 17.4867 16.9148C18.6554 15.2825 19.3551 13.3615 19.51 11.36L19.94 5.84C19.9467 5.61157 19.8749 5.38774 19.7366 5.20579C19.5983 5.02385 19.4019 4.89475 19.18 4.84L12 3L4.81999 4.8C4.59812 4.85475 4.40169 4.98385 4.26341 5.16579C4.12513 5.34774 4.05334 5.57157 4.05999 5.8L4.48999 11.32C4.64491 13.3215 5.34462 15.2425 6.51331 16.8748C7.682 18.5071 9.2751 19.7884 11.12 20.58L12 21Z'
                                                fill='white'
                                            />
                                            <path
                                                d='M9 11L11 13L15 9'
                                                stroke='#1E4BD2'
                                                stroke-width='2'
                                                stroke-linecap='square'
                                            />
                                            <path
                                                d='M12 21L11.5693 21.9025L11.9793 22.0982L12.3964 21.9181L12 21ZM12.88 20.62L12.4857 19.701L12.4836 19.7019L12.88 20.62ZM19.51 11.36L20.507 11.4372C20.5081 11.4237 20.5088 11.4103 20.5093 11.3968L19.51 11.36ZM19.7366 5.20579L20.7359 5.24259L20.7648 4.45909L20.0108 4.24412L19.7366 5.20579ZM12 3L12.2742 2.03832L12.0025 1.96086L11.7304 2.03702L12 3ZM4.26343 5.16579L3.99385 4.20282L3.23512 4.41522L3.2641 5.20259L4.26343 5.16579ZM4.49001 11.32L3.49069 11.3568C3.49119 11.3703 3.49196 11.3837 3.493 11.3972L4.49001 11.32ZM11.12 20.58L11.5507 19.6775C11.5387 19.6718 11.5266 19.6663 11.5143 19.661L11.12 20.58ZM12.3964 21.9181L13.2764 21.5381L12.4836 19.7019L11.6036 20.0819L12.3964 21.9181ZM13.2743 21.539C15.2869 20.6755 17.0248 19.2777 18.2998 17.497L16.6736 16.3327C15.6112 17.8166 14.1629 18.9814 12.4857 19.701L13.2743 21.539ZM18.2998 17.497C19.5747 15.7163 20.338 13.6207 20.507 11.4372L18.513 11.2828C18.3722 13.1024 17.7361 14.8488 16.6736 16.3327L18.2998 17.497ZM20.5093 11.3968L20.7359 5.24259L18.7373 5.169L18.5107 11.3232L20.5093 11.3968ZM20.0108 4.24412L12.2742 2.03832L11.7258 3.96168L19.4624 6.16747L20.0108 4.24412ZM11.7304 2.03702L3.99385 4.20282L4.53301 6.12877L12.2696 3.96298L11.7304 2.03702ZM3.2641 5.20259L3.49069 11.3568L5.48934 11.2832L5.26275 5.129L3.2641 5.20259ZM3.493 11.3972C3.662 13.5807 4.42532 15.6763 5.70025 17.457L7.32641 16.2927C6.26397 14.8088 5.62787 13.0624 5.48703 11.2428L3.493 11.3972ZM5.70025 17.457C6.97518 19.2377 8.71311 20.6355 10.7257 21.499L11.5143 19.661C9.83713 18.9414 8.38885 17.7766 7.32641 16.2927L5.70025 17.457ZM10.6893 21.4825L11.5693 21.9025L12.4307 20.0975L11.5507 19.6775L10.6893 21.4825Z'
                                                fill='#1E4BD2'
                                            />
                                        </svg>

                                        <Typography.Title
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                                margin: 0,
                                                marginLeft: 10,
                                            }}
                                            level={5}
                                        >
                                            Безопасность
                                        </Typography.Title>
                                    </>
                                }
                            >
                                <Row align={'middle'}>
                                    {parking.is_camera ? (
                                        <>
                                            <svg
                                                width='18'
                                                height='18'
                                                viewBox='0 0 18 18'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <g clip-path='url(#clip0_46_2667)'>
                                                    <path
                                                        d='M13.6125 3.70498C13.3122 3.68586 13.0128 3.75356 12.75 3.89998L6.2625 7.64998C6.09124 7.7486 5.94117 7.88009 5.82089 8.0369C5.70061 8.1937 5.6125 8.37272 5.56162 8.56368C5.51074 8.75464 5.4981 8.95378 5.52443 9.14964C5.55075 9.3455 5.61551 9.53423 5.715 9.70498L6.84 11.6475C6.93799 11.8184 7.06869 11.9683 7.22462 12.0887C7.38055 12.209 7.55867 12.2975 7.7488 12.3491C7.93893 12.4006 8.13735 12.4142 8.33273 12.389C8.52811 12.3639 8.71662 12.3005 8.8875 12.2025L10.2375 11.4525C10.4415 11.7877 10.7459 12.0501 11.1075 12.2025V13.5C11.1075 13.8978 11.2655 14.2793 11.5468 14.5606C11.8281 14.8419 12.2097 15 12.6075 15H16.5V13.5H12.6075V12.2025C12.8517 12.0997 13.0711 11.9461 13.2514 11.7519C13.4316 11.5578 13.5685 11.3275 13.6529 11.0764C13.7373 10.8253 13.7674 10.5591 13.741 10.2955C13.7146 10.0319 13.6325 9.7769 13.5 9.54748L15.3975 8.45248C15.5694 8.35449 15.7202 8.22346 15.8412 8.06694C15.9622 7.91042 16.0511 7.7315 16.1027 7.54049C16.1543 7.34948 16.1676 7.15015 16.1418 6.95398C16.116 6.75781 16.0517 6.56868 15.9525 6.39748L14.8275 4.45498C14.7053 4.24189 14.5327 4.06205 14.3248 3.93128C14.1168 3.80051 13.88 3.7228 13.635 3.70498M4.665 9.87748L1.5 10.4025L2.0625 11.3775L3.5625 13.9725L4.125 14.9475L6.165 12.4725L4.665 9.87748Z'
                                                        fill='#1E4BD2'
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id='clip0_46_2667'>
                                                        <rect width='18' height='18' fill='white' />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                            <Typography.Text
                                                style={{ marginLeft: 10 }}
                                                className='base-text'
                                            >
                                                Есть камера
                                            </Typography.Text>
                                        </>
                                    ) : null}
                                </Row>

                                <Row align={'middle'}>
                                    {parking.is_protected ? (
                                        <>
                                            <svg
                                                width='14'
                                                height='18'
                                                viewBox='0 0 14 18'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <path
                                                    d='M13.111 14.393C12.6982 13.7751 12.0712 13.4334 11.4824 13.2111C11.1868 13.1001 10.898 13.018 10.6437 12.9484C10.3896 12.8793 10.1688 12.8212 10.0205 12.7651C9.76091 12.6688 9.48662 12.544 9.2953 12.4096C9.19961 12.3428 9.1262 12.274 9.08342 12.2156C9.04035 12.1558 9.0285 12.1145 9.02794 12.0783C9.02794 11.8286 9.02794 11.5167 9.02794 11.1057C9.36006 10.7363 9.83727 10.1637 10.0332 9.25583C10.1018 9.22489 10.1694 9.18991 10.2347 9.14453C10.3971 9.03238 10.535 8.86964 10.6518 8.64826C10.7694 8.42597 10.8735 8.14184 10.9845 7.75308C11.0408 7.55596 11.0669 7.38485 11.0669 7.23224C11.0671 7.05649 11.0307 6.90416 10.9645 6.78048C10.8773 6.61602 10.7434 6.51832 10.6235 6.464L10.8943 6.06048V5.61305C10.92 5.57807 10.9365 5.54597 10.9324 5.52055V4.5514L11.6215 3.17384C11.7961 2.82466 11.6611 2.39977 11.3168 2.21537L7.34076 0.0854297C7.12806 -0.0284766 6.87223 -0.0284766 6.6595 0.0854297L2.68315 2.21537C2.33918 2.39977 2.20418 2.82466 2.3788 3.17384L3.06787 4.55228V5.52059C3.06354 5.54688 3.07799 5.57895 3.10601 5.61537V6.06052L3.37686 6.46341C3.3488 6.47585 3.3199 6.49002 3.29012 6.50823C3.19647 6.56603 3.10197 6.65652 3.03577 6.78052C2.96957 6.90423 2.93315 7.05653 2.93346 7.23227C2.93346 7.38489 2.95948 7.55599 3.01584 7.75311C3.16441 8.27082 3.29853 8.60523 3.47223 8.85062C3.55925 8.9723 3.65811 9.07 3.76561 9.14456C3.83093 9.18991 3.89861 9.22493 3.96709 9.25587C4.16305 10.1637 4.64027 10.7363 4.97239 11.1057C4.97239 11.5168 4.97239 11.8286 4.97239 12.0784C4.97239 12.109 4.95994 12.1532 4.91255 12.2165C4.84262 12.3105 4.69782 12.4244 4.52583 12.5209C4.35441 12.6183 4.15729 12.703 3.98474 12.7637C3.7821 12.8357 3.4555 12.9102 3.08984 13.0152C2.54038 13.1741 1.89062 13.403 1.36195 13.8563C1.09806 14.0829 0.866523 14.3676 0.703504 14.7214C0.540519 15.0749 0.446828 15.4952 0.447144 15.9865C0.447144 16.1007 0.452066 16.2186 0.462191 16.3406C0.469996 16.4262 0.50234 16.4955 0.540801 16.5527C0.613363 16.6597 0.709902 16.7389 0.830699 16.8207C1.0423 16.9606 1.33568 17.0976 1.71112 17.232C2.83464 17.6326 4.69521 17.9994 7.00034 18C8.87304 18 10.4538 17.7569 11.5822 17.4514C12.1467 17.2985 12.5974 17.1308 12.9231 16.9635C13.0864 16.8794 13.2182 16.7959 13.3228 16.7048C13.3752 16.6585 13.4211 16.6103 13.4596 16.5528C13.498 16.4956 13.5304 16.4262 13.5379 16.3406C13.548 16.2189 13.5529 16.101 13.5529 15.9874C13.5538 15.3321 13.3855 14.8041 13.111 14.393ZM6.15399 4.83553C6.15399 4.36816 6.53262 3.9895 7.0003 3.9895C7.46739 3.9895 7.84602 4.36813 7.84602 4.83553V4.91674C7.84602 5.38386 7.46739 5.76278 7.0003 5.76278C6.53262 5.76278 6.15399 5.38386 6.15399 4.91674V4.83553ZM6.31325 16.1943L4.38647 13.1527C4.56194 13.0793 4.74169 12.9865 4.90819 12.8793L6.0109 14.465L6.54275 13.4646L6.31325 16.1943ZM5.98457 14.0216L5.09607 12.7443C5.17728 12.6778 5.25444 12.6073 5.31776 12.5244C5.40706 12.4073 5.47498 12.2611 5.47934 12.0948L6.72338 12.6319L5.98457 14.0216ZM5.48106 11.8437C5.48106 11.6165 5.48106 11.3465 5.48106 11.0083V10.911L5.41574 10.8381C5.06861 10.4516 4.59892 9.9386 4.4359 9.027L4.41017 8.88131L4.27112 8.8316C4.18239 8.8001 4.11507 8.76772 4.05611 8.7267C3.9691 8.66542 3.89017 8.58161 3.79799 8.4099C3.70694 8.23904 3.61068 7.98384 3.50521 7.61361C3.45866 7.45175 3.44221 7.326 3.44221 7.23234C3.44249 7.12396 3.4633 7.06064 3.4844 7.02049C3.5165 6.96238 3.55584 6.93752 3.60583 6.91727C3.6284 6.90862 3.65118 6.90398 3.67059 6.90082L4.19346 7.67978L4.41716 6.36898L4.44174 6.28685C5.12447 6.50338 6.01125 6.67709 7.00037 6.67709C7.98686 6.67709 8.87652 6.50482 9.55954 6.28893L9.58323 6.36898L9.80697 7.67978L10.3298 6.90138C10.3628 6.90659 10.407 6.91755 10.4412 6.94013C10.4703 6.95893 10.494 6.98059 10.5157 7.02049C10.5368 7.06064 10.5576 7.12396 10.5582 7.23234C10.5582 7.326 10.5415 7.45172 10.4952 7.61361C10.355 8.10788 10.2293 8.39517 10.1137 8.55475C10.0559 8.63536 10.003 8.68567 9.94429 8.72673C9.88533 8.76779 9.81801 8.80017 9.72927 8.83164L9.58995 8.88135L9.5645 9.02704C9.40151 9.93864 8.93175 10.4517 8.58466 10.8381L8.51934 10.911V11.0084C8.51934 11.3466 8.51934 11.6165 8.51934 11.8437L7.00044 12.4996L5.48106 11.8437ZM8.52092 12.0948C8.52468 12.2556 8.58712 12.4009 8.67357 12.5171C8.73829 12.6044 8.81605 12.6801 8.90103 12.7486L8.01541 14.0216L7.27691 12.6319L8.52092 12.0948ZM7.68705 16.1949L7.45755 13.4649L7.98911 14.465L9.08978 12.8822C9.12648 12.9056 9.16322 12.9287 9.20165 12.9507C9.33485 13.0264 9.47566 13.0906 9.61642 13.1498L7.68705 16.1949Z'
                                                    fill='#1E4BD2'
                                                />
                                            </svg>

                                            <Typography.Text
                                                style={{ marginLeft: 10 }}
                                                className='base-text'
                                            >
                                                Охраняемая
                                            </Typography.Text>
                                        </>
                                    ) : null}
                                </Row>

                                {!parking.is_camera &&
                                    !parking.is_protected &&
                                    'На парковке нет камер и охраны'}
                            </AccordionItem>
                        </Accordion>
                    </div>

                    <div className='parking__details__actions'>
                        <Col>
                            <AdmiralButton
                                loading={isLoading}
                                // onClick={() => {
                                //     setIsLoading(true);

                                //     rootStore
                                //         .createAppointment(selectedTime)
                                //         .then((ticket) => {
                                //             api.info({
                                //                 message: 'Вы записаны на ' + selectedTime,
                                //                 description: (
                                //                     <div>
                                //                         <div>
                                //                             Время на дорогу:{' '}
                                //                             {Math.ceil(
                                //                                 ticket ? ticket?.estimatedTimeWalk / 60 : 0
                                //                             )}{' '}
                                //                             минут пешком. Или{' '}
                                //                             {Math.ceil(
                                //                                 ticket ? ticket?.estimatedTimeCar / 60 : 0
                                //                             )}{' '}
                                //                             минут на машине
                                //                         </div>
                                //                     </div>
                                //                 ),
                                //                 placement: 'topRight',
                                //             });
                                //         })
                                //         .catch((error) => {
                                //             console.log(error);
                                //             api.error({
                                //                 message: 'Ошибка записи',
                                //                 description: (
                                //                     <div>Попробуйте записаться на другое время</div>
                                //                 ),
                                //                 placement: 'topRight',
                                //             });
                                //         })
                                //         .finally(() => {
                                //             setIsLoading(false);
                                //         });
                                // }}
                            >
                                Забронировать место
                            </AdmiralButton>
                            <a
                                href={`https://yandex.ru/maps/?ll=${rootStore.start[0]}%2C${rootStore.start[1]}&mode=routes&rtext=${rootStore.start[1]}%2C${rootStore.start[0]}~${rootStore.activeParking?.center.latitude}%2C${rootStore.activeParking?.center.longitude}&rtt=auto&ruri=~&z=14`}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <AdmiralButton appearance='secondary'>
                                    Проложить маршрут в Яндекс Картах
                                </AdmiralButton>
                            </a>
                        </Col>
                    </div>
                </>
            )}
        </>
    );
});

export default ParkingDetails;
