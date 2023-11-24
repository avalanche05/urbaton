import { Navigate } from 'react-router-dom';

type Props = {
    isSignedIn: boolean;
    children: React.ReactNode;
};

function UnauthorizedOnlyRoute({ isSignedIn, children }: Props): JSX.Element {
    if (isSignedIn) {
        return <Navigate to='/parkings' replace />;
    }
    return children as JSX.Element;
}

export default UnauthorizedOnlyRoute;
