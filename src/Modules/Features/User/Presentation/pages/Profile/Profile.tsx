import React, { ReactElement, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Pencil, Save, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import EditableField from '@/core/Presentation/Components/molecules/EditableField/EditableField';
import './Profile.scss';
import { IUserprofile } from '@users/Domain/Entities/IUserProfile';
import UseGetProfile from '@users/Presentation/Hooks/UseGetProfile';
import useLocalStorage from '@/core/Presentation/Hooks/UseLocalStorage';
import { STORAGE_KEYS } from '@/core/Infrastructure/Storage/StorageKeys';
import UseUpdateUserProfile from '@users/Presentation/Hooks/UseUpdateProfile';
import { UseToast } from '@/core/Presentation/Hooks/UseToast';
import { NotificationVariant } from '@/core/Domain/Notifications/INotificationProvider';

export default function Profile(): ReactElement {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>(); // Use react-router-dom useParams
    const navigate = useNavigate();
    const localStorage = useLocalStorage();
    const { ShowNotification } = UseToast()
        ;
    const { profile, loading, error, getProfile } = UseGetProfile();
    const { UpdateProfile, loading: updateLoading, error: updateError } = UseUpdateUserProfile();


    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<IUserprofile>();


    // Mock logic to determine if it's the own profile
    // In a real app, compare `id` with logged-in user's ID

    let userID: string;


    if (id === 'me') {
        const localStorageUserID: string | null = localStorage.getString(STORAGE_KEYS.USER_ID);
        if (localStorageUserID) {
            userID = localStorageUserID;
        }
    } else if (id !== undefined) {
        userID = id;
    } else {
        navigate('/login');
    }

    const isOwnProfile = id === 'me';
    useEffect(() => {
        getProfile(userID);
    }, []);

    useEffect(() => {
        if (profile) {
            setFormData(profile);
        }
    }, [profile]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await UpdateProfile(formData!);
        result.match(_ => ShowNotification(t('pages.profile.messages.saved_profile'), NotificationVariant.Success), _ => ShowNotification(t('pages.profile.messages.error_profile'), NotificationVariant.Error))
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }) as IUserprofile);
    };

    if (loading || updateLoading || !formData) {
        return <div className='profile-page'>
            <Container>
                <Row className='justify-content-center'>
                    <Col md={12} lg={12}>
                        <Card className="profile-card">
                            <Card.Header>
                                <h2>Loading motherfucker.</h2>
                            </Card.Header>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>;
    }


    return (
        <div className="profile-page">
            <Container>
                <Row className="justify-content-center">
                    <Col md={12} lg={12}>
                        <Card className="profile-card">
                            <Card.Header>
                                <h2>{id === 'me' ? t('pages.profile.title', 'Mi perfil') : `${profile!.FirstName} ${profile!.MiddleName} ${profile!.LastName}`}</h2>
                            </Card.Header>

                            <Card.Body>
                                <Row>
                                    <Col md={12} lg={2}>
                                        <div className="avatar-container">
                                            <Image
                                                src={profile!.AvatarUrl}
                                                roundedCircle
                                                className="profile-avatar"
                                                alt="User Avatar"
                                            />
                                        </div>
                                    </Col>
                                    <Col md={12} lg={10} className="user-details">
                                        <div className='pb-2 pt-2'><strong>Miembro desde:</strong> Que franco tocaba la corneta</div>
                                    </Col>
                                </Row>


                                <Form onSubmit={handleSave}>
                                    <Row>
                                        <Col md={4}>
                                            <EditableField
                                                label={t('pages.profile.fields.firstName', 'Nombre')}
                                                name="FirstName"
                                                value={formData!.FirstName}
                                                onChange={handleChange}
                                                isEditing={isEditing}
                                                required
                                            />
                                        </Col>
                                        <Col md={4}>
                                            <EditableField
                                                label={t('pages.profile.fields.middleName', 'Primer apellido')}
                                                name="MiddleName"
                                                value={formData!.MiddleName}
                                                onChange={handleChange}
                                                isEditing={isEditing}
                                                required
                                            />
                                        </Col>
                                        <Col md={4}>
                                            <EditableField
                                                label={t('pages.profile.fields.lastName', 'Segundo apellido')}
                                                name="LastName"
                                                value={formData!.LastName}
                                                onChange={handleChange}
                                                isEditing={isEditing}
                                                required
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} lg={4}>
                                            <EditableField
                                                label={t('pages.profile.fields.email', 'Email')}
                                                name="Email"
                                                value={formData!.Email}
                                                isEditing={false} // Always disabled for editing
                                                type="email"
                                                helpText={isOwnProfile && isEditing ? t('pages.profile.fields.email_help', 'Email cannot be changed directly.') : undefined}
                                                className="text-muted"
                                            />
                                        </Col>
                                        <Col lg={4}></Col>
                                        <Col md={12} lg={4}>
                                            <EditableField
                                                label={t('pages.profile.fields.phone', 'Teléfono')}
                                                name="Phone"
                                                value={formData!.Phone}
                                                isEditing={isEditing}
                                                onChange={handleChange}
                                                type="number"
                                                helpText={isOwnProfile && isEditing ? t('pages.profile.fields.phone_help', 'Teléfono') : undefined}
                                                className="text-muted"
                                            />
                                        </Col>
                                    </Row>

                                    <EditableField
                                        label={t('pages.profile.fields.bio', 'Bio')}
                                        name="Bio"
                                        value={formData!.Bio}
                                        onChange={handleChange}
                                        isEditing={isEditing}
                                        as="textarea"
                                        rows={3}
                                    />

                                    {isOwnProfile && (
                                        <div className="edit-controls justify-content-end d-flex gap-2">
                                            {!isEditing ? (
                                                <Button variant="primary" onClick={() => setIsEditing(true)}>
                                                    <Pencil size={18} className="me-2" />
                                                    {t('pages.profile.edit_button', 'Edit Profile')}
                                                </Button>
                                            ) : (
                                                <>
                                                    <Button variant="outline-secondary" onClick={() => setIsEditing(false)}>
                                                        <X size={18} className="me-2" />
                                                        {t('common.cancel', 'Cancel')}
                                                    </Button>
                                                    <Button variant="primary" type="submit">
                                                        <Save size={18} className="me-2" />
                                                        {t('common.save', 'Save Changes')}
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </Form>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

// export default Profile;
