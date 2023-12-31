import { Link } from 'react-router-dom';
import { useStores } from '../hooks/useStores';
import { Typography } from 'antd';
import AuthService from '../api/AuthService';

const Search = () => {
    const { rootStore } = useStores();

    const logout = () => {
        AuthService.logout();

        setTimeout(() => {
            window.location.href = '/login';
        }, 100);
    };

    return (
        <>
            <div className='search'>
                <div style={{ display: 'flex', width: '100%', gap: 8, cursor: 'pointer' }}>
                    <Link onClick={logout} to='/login' style={{ color: '#fff' }}>
                        <div
                            onClick={() => {
                                rootStore.toggleFilters();
                            }}
                            style={{ cursor: 'pointer' }}
                            className='search-button'
                        >
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M11 20L21 20V3.99998L11 3.99997M3 12H14M14 12L11 15M14 12L11 8.99997'
                                    stroke='#1E4BD2'
                                    strokeWidth='2'
                                    strokeLinecap='square'
                                />
                            </svg>
                        </div>
                    </Link>

                    <Link to='/profile' style={{ color: '#fff' }}>
                        <div style={{ cursor: 'pointer' }} className='search-button'>
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M12 11.6273C13.0028 11.6273 13.9646 11.2289 14.6737 10.5198C15.3828 9.81069 15.7811 8.84894 15.7811 7.84613C15.7811 6.84331 15.3828 5.88157 14.6737 5.17247C13.9646 4.46337 13.0028 4.065 12 4.065C10.9972 4.065 10.0354 4.46337 9.32634 5.17247C8.61724 5.88157 8.21887 6.84331 8.21887 7.84613C8.21887 8.84894 8.61724 9.81069 9.32634 10.5198C10.0354 11.2289 10.9972 11.6273 12 11.6273ZM12 13.2885C6.97275 13.2885 3.75 16.0628 3.75 17.4135V19.9358H20.25V17.4135C20.25 15.78 17.199 13.2885 12 13.2885Z'
                                    fill='#092896'
                                />
                            </svg>
                        </div>
                    </Link>

                    <div
                        onClick={() => {
                            rootStore.toggleSearch();
                        }}
                        style={{ width: '100%' }}
                        className='search-block'
                    >
                        <div style={{ width: '100%' }} className='search-input'>
                            <Typography.Text className='search-input__text'>
                                {rootStore.currentSearch
                                    .slice(0, 17)
                                    .concat(rootStore.currentSearch.length > 35 ? '...' : '') ||
                                    'Введите адрес'}
                            </Typography.Text>
                        </div>
                    </div>

                    <div
                        onClick={(event) => {
                            event.stopPropagation();
                            rootStore.toggleFilters();
                        }}
                        style={{ cursor: 'pointer' }}
                        className='search-button'
                    >
                        <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M9.00697 8.50024C9.00998 8.16251 8.96623 7.82598 8.87697 7.50024L21.007 7.50024C21.2722 7.50024 22.007 7.50024 22.007 7.50024C22.007 7.50024 22.007 8.23503 22.007 8.50024C22.007 8.76546 22.0078 9.5002 22.0078 9.5002C22.0078 9.5002 21.2722 9.50024 21.007 9.50024H8.87697C8.96623 9.17451 9.00998 8.83798 9.00697 8.50024Z'
                                fill='#6B7683'
                            />
                            <path
                                d='M3.00867 14.5002H15.1387C15.0494 14.826 15.0057 15.1625 15.0087 15.5002C15.0057 15.838 15.0494 16.1745 15.1387 16.5002H3.00867C2.74345 16.5002 2.00783 16.5002 2.00783 16.5002C2.00783 16.5002 2.00867 15.7655 2.00867 15.5002C2.00867 15.235 2.00931 14.5002 2.00931 14.5002C2.00931 14.5002 2.74345 14.5002 3.00867 14.5002Z'
                                fill='#6B7683'
                            />
                            <path
                                d='M19.0077 12.5003C19.558 12.4987 20.0982 12.6486 20.5691 12.9335C21.0399 13.2184 21.4234 13.6273 21.6774 14.1155C21.9314 14.6038 22.0463 15.1524 22.0093 15.7016C21.9724 16.2507 21.7851 16.779 21.468 17.2288C21.1509 17.6787 20.7162 18.0326 20.2114 18.2518C19.7066 18.4711 19.1512 18.5473 18.606 18.4721C18.0609 18.3969 17.5469 18.1731 17.1203 17.8253C16.6938 17.4775 16.3711 17.0191 16.1877 16.5003C15.9479 15.8552 15.9479 15.1454 16.1877 14.5003C16.394 13.9167 16.7757 13.4113 17.2806 13.0532C17.7855 12.6951 18.3887 12.502 19.0077 12.5003Z'
                                fill='#6B7683'
                            />
                            <path
                                d='M5.00844 5.50025C5.62738 5.50199 6.23064 5.69513 6.7355 6.05319C7.24037 6.41125 7.62212 6.91671 7.82844 7.50025C8.06824 8.14536 8.06824 8.85515 7.82844 9.50025C7.64498 10.0191 7.32233 10.4775 6.89579 10.8253C6.46925 11.1731 5.95526 11.3969 5.41008 11.4721C4.86489 11.5473 4.30951 11.4711 3.80473 11.2518C3.29994 11.0326 2.86521 10.6787 2.54809 10.2288C2.23098 9.77904 2.04371 9.25067 2.00678 8.70155C1.96985 8.15244 2.08468 7.60375 2.3387 7.11553C2.59273 6.62731 2.97616 6.21837 3.44704 5.93348C3.91791 5.64858 4.45809 5.49871 5.00844 5.50025Z'
                                fill='#6B7683'
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;
