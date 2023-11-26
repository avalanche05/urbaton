import { createBrowserRouter } from 'react-router-dom';

import AuthService from '../api/AuthService';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import UnauthorizedOnlyRoute from './UnauthorizedOnlyRoute';
import Parkings from '../pages/Parkings';
import Profile from '../pages/Profile';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
    {
        path: '/signup',
        element: (
            <UnauthorizedOnlyRoute isSignedIn={AuthService.isAuthorized()}>
                <SignUp />
            </UnauthorizedOnlyRoute>
        ),
    },
    {
        path: '/login',
        element: (
            <UnauthorizedOnlyRoute isSignedIn={AuthService.isAuthorized()}>
                <Login />
            </UnauthorizedOnlyRoute>
        ),
    },
    {
        path: '/parkings',
        element: <Parkings />,
    },
    {
        path: '/profile',
        element: (
            <ProtectedRoute isSignedIn={AuthService.isAuthorized()}>
                <Profile />
            </ProtectedRoute>
        ),
    },
    {
        path: '*',
        element: <Parkings />,
    },
]);
