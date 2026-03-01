import UseGetProfile from "@users/Presentation/Hooks/UseGetProfile";
import UseUpdateUserProfile from "@users/Presentation/Hooks/UseUpdateProfile";
import { useEffect, useState } from "react";
import { IUserprofile } from "@users/Domain/Entities/IUserProfile";
import { UseToast } from "@core/Presentation/Hooks/UseToast";
import { useTranslation } from "react-i18next";
import { NotificationVariant } from "@core/Domain/Notifications/INotificationProvider";
import { Button, Card, Col, Container, Form, Row, Image } from "react-bootstrap";
import { Pencil, Save, X } from "lucide-react";
import EditableField from "@core/Presentation/Components/molecules/EditableField/EditableField";
import { useQuery } from "@tanstack/react-query";

interface ProfileProps {
    UserID: string;
    IsOwnProfile: boolean;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function EditableProfile({ UserID, IsOwnProfile }: ProfileProps) {

    const { profile, loading, getProfile } = UseGetProfile();
    const { UpdateProfile, loading: updateLoading } = UseUpdateUserProfile();
    const { ShowNotification } = UseToast();
    const { t } = useTranslation();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<IUserprofile>();


    useQuery({
        queryKey: ["profile"],
        queryFn: () => getProfile(UserID),
    });


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

    const renderProfileSkeleton = () => (
        <Container>
            <Row className="justify-content-center">
                <Col md={12} lg={12}>
                    <Card className="profile-card profile-card--skeleton">
                        <Card.Header>
                            <div className="skeleton skeleton-title"></div>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={12} lg={2}>
                                    <div className="avatar-container">
                                        <div className="skeleton skeleton-avatar"></div>
                                    </div>
                                </Col>
                                <Col md={12} lg={10}>
                                    <div className="skeleton skeleton-line mb-3"></div>
                                </Col>
                            </Row>
                            <Row className="g-3">
                                <Col md={4}><div className="skeleton skeleton-input"></div></Col>
                                <Col md={4}><div className="skeleton skeleton-input"></div></Col>
                                <Col md={4}><div className="skeleton skeleton-input"></div></Col>
                                <Col md={4}><div className="skeleton skeleton-input"></div></Col>
                                <Col md={4}><div className="skeleton skeleton-input"></div></Col>
                                <Col md={4}><div className="skeleton skeleton-input"></div></Col>
                                <Col md={12}><div className="skeleton skeleton-textarea"></div></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

    if (loading || updateLoading || !formData) {
        return renderProfileSkeleton();
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={12} lg={12}>
                    <Card className="profile-card">
                        <Card.Header>
                            <h2>{IsOwnProfile ? t('pages.profile.title', 'Mi perfil') : `${profile!.FirstName} ${profile!.MiddleName} ${profile!.LastName}`}</h2>
                        </Card.Header>

                        <Card.Body>
                            <Row>
                                <Col md={12} lg={2}>
                                    <div className="avatar-container">
                                        <Image
                                            src={profile!.AvatarUrl ?? `https://ui-avatars.com/api/?name=${profile!.FirstName}+${profile!.MiddleName}+${profile!.LastName}&background=000000&color=ffffff&size=128`}
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
                                            helpText={IsOwnProfile && isEditing ? t('pages.profile.fields.email_help', 'Email cannot be changed directly.') : undefined}
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
                                            helpText={IsOwnProfile && isEditing ? t('pages.profile.fields.phone_help', 'Teléfono') : undefined}
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

                                {IsOwnProfile && (
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
    );
}
