import { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Profile.scss';
import useLocalStorage from '@core/Presentation/Hooks/UseLocalStorage';
import { STORAGE_KEYS } from '@core/infrastructure/Storage/StorageKeys';
import EditableProfile from '@users/Presentation/Components/Organisms/Profile/EditableProfile';
import SubscriptionPanel from '../../Components/Organisms/Subscription/SubscriptionPanel';
import { Col, Row } from 'react-bootstrap';

export default function Profile(): ReactElement {
    const { id } = useParams<{ id: string }>(); // Use react-router-dom useParams
    const navigate = useNavigate();
    const localStorage = useLocalStorage();



    // Mock logic to determine if it's the own profile
    // In a real app, compare `id` with logged-in user's ID

    let userID: string;

    if (id === 'me') {
        const localStorageUserID: string | null = localStorage.getString(STORAGE_KEYS.USER_ID);
        if (localStorageUserID) {
            userID = localStorageUserID;
        } else {
            navigate('/login');
        }
    } else if (id !== undefined) {
        userID = id;
    } else {
        navigate('/login');
    }

    const isOwnProfile = id === 'me';

    return (
        <div className="profile-page">
            <Row>
                <Col md={12} lg={12}>
                    <EditableProfile UserID={isOwnProfile ? userID! : id!} IsOwnProfile={isOwnProfile} />
                </Col>
            </Row>
            {isOwnProfile && <SubscriptionPanel />}
        </div>
    );
};
