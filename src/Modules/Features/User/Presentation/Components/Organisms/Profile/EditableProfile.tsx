import UseGetProfile from "@users/Presentation/Hooks/UseGetProfile";
import UseUpdateUserProfile from "@users/Presentation/Hooks/UseUpdateProfile";
import { useEffect, useState } from "react";
import { IUserprofile } from "@users/Domain/Entities/IUserProfile";
import { UseToast } from "@core/Presentation/Hooks/UseToast";
import { useTranslation } from "react-i18next";
import { NotificationVariant } from "@core/Domain/Notifications/INotificationProvider";
import { Card, Col, Form, Image, Row } from "react-bootstrap";
import { KeyRound, Pencil, Save, X } from "lucide-react";
import EditableField from "@core/Presentation/Components/molecules/EditableField/EditableField";
import { useQuery } from "@tanstack/react-query";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import ChangePasswordModal from "@users/Presentation/Components/Organisms/ChangePasswordModal/ChangePasswordModal.tsx";


interface ProfileProps {
    UserID: string;
    IsOwnProfile: boolean;
}

export default function EditableProfile({ UserID, IsOwnProfile }: ProfileProps) {
    const { profile, loading, getProfile } = UseGetProfile();
    const { UpdateProfile, loading: updateLoading } = UseUpdateUserProfile();
    const { ShowNotification } = UseToast();
    const { t } = useTranslation();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<IUserprofile>();
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    useQuery({
        queryKey: ["profile", UserID],
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
        result.match(
            (_) => ShowNotification(t("pages.profile.messages.saved_profile"), NotificationVariant.Success),
            (_) => ShowNotification(t("pages.profile.messages.error_profile"), NotificationVariant.Error),
        );
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(
            (prev) =>
                ({
                    ...prev,
                    [name]: value,
                }) as IUserprofile,
        );
    };

    const renderProfileSkeleton = () => (
        <Row className="justify-content-center">
            <Col md={12} lg={12}>
                <Card className="profile-card vh-panel vh-surface-card">
                    <Card.Header>
                        <div className="vh-skeleton vh-skeleton-title"></div>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={12} lg={2}>
                                <div className="avatar-container">
                                    <div className="vh-skeleton vh-skeleton-avatar"></div>
                                </div>
                            </Col>
                            <Col md={12} lg={10}>
                                <div className="vh-skeleton vh-skeleton-line mb-3"></div>
                            </Col>
                        </Row>
                        <Row className="g-3">
                            <Col md={4}><div className="vh-skeleton vh-skeleton-input"></div></Col>
                            <Col md={4}><div className="vh-skeleton vh-skeleton-input"></div></Col>
                            <Col md={4}><div className="vh-skeleton vh-skeleton-input"></div></Col>
                            <Col md={4}><div className="vh-skeleton vh-skeleton-input"></div></Col>
                            <Col md={4}><div className="vh-skeleton vh-skeleton-input"></div></Col>
                            <Col md={4}><div className="vh-skeleton vh-skeleton-input"></div></Col>
                            <Col md={12}><div className="vh-skeleton vh-skeleton-textarea"></div></Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );

    if (loading || updateLoading || !formData) {
        return renderProfileSkeleton();
    }

    return (
        <Row className="justify-content-center">
            <Col md={12} lg={12}>
                <Card className="profile-card vh-panel vh-surface-card">
                    <Card.Header>
                        <h2>
                            {IsOwnProfile
                                ? t("pages.profile.title", "Mi perfil")
                                : `${profile!.FirstName} ${profile!.MiddleName} ${profile!.LastName}`}
                        </h2>
                    </Card.Header>

                    <Card.Body>
                        <Row>
                            <Col md={12} lg={2}>
                                <div className="avatar-container">
                                    <Image
                                        src={
                                            profile!.AvatarUrl ??
                                            `https://ui-avatars.com/api/?name=${profile!.FirstName}+${profile!.MiddleName}+${profile!.LastName}&background=000000&color=ffffff&size=128`
                                        }
                                        roundedCircle
                                        className="profile-avatar"
                                        alt="User Avatar"
                                    />
                                </div>
                            </Col>
                            <Col md={12} lg={10} className="user-details">
                            </Col>
                        </Row>

                        <Form onSubmit={handleSave}>
                            <Row>
                                <Col md={4}>
                                    <EditableField
                                        label={t("pages.profile.fields.firstName", "Nombre")}
                                        name="FirstName"
                                        value={formData!.FirstName}
                                        onChange={handleChange}
                                        isEditing={isEditing}
                                        required
                                    />
                                </Col>
                                <Col md={4}>
                                    <EditableField
                                        label={t("pages.profile.fields.middleName", "Primer apellido")}
                                        name="MiddleName"
                                        value={formData!.MiddleName}
                                        onChange={handleChange}
                                        isEditing={isEditing}
                                        required
                                    />
                                </Col>
                                <Col md={4}>
                                    <EditableField
                                        label={t("pages.profile.fields.lastName", "Segundo apellido")}
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
                                        label={t("pages.profile.fields.email", "Email")}
                                        name="Email"
                                        value={formData!.Email}
                                        isEditing={false}
                                        type="email"
                                        helpText={
                                            IsOwnProfile && isEditing
                                                ? t("pages.profile.fields.email_help", "Email cannot be changed directly.")
                                                : undefined
                                        }
                                        className="text-muted"
                                    />
                                </Col>
                                <Col lg={4}></Col>
                                <Col md={12} lg={4}>
                                    <EditableField
                                        label={t("pages.profile.fields.phone", "Telefono")}
                                        name="Phone"
                                        value={formData!.Phone}
                                        isEditing={isEditing}
                                        onChange={handleChange}
                                        type="number"
                                        helpText={
                                            IsOwnProfile && isEditing
                                                ? t("pages.profile.fields.phone_help", "Telefono")
                                                : undefined
                                        }
                                        className="text-muted"
                                    />
                                </Col>
                            </Row>

                            <EditableField
                                label={t("pages.profile.fields.bio", "Bio")}
                                name="Bio"
                                value={formData!.Bio}
                                onChange={handleChange}
                                isEditing={isEditing}
                                as="textarea"
                                rows={3}
                            />

                            {IsOwnProfile && (
                                <div className="edit-controls">
                                    {!isEditing ? (
                                        <>
                                            <PrimaryButton
                                                label={t("pages.profile.edit_button", "Edit Profile")}
                                                variant="primary"
                                                iconLeft={<Pencil size={18} />}
                                                onClick={() => setIsEditing(true)}
                                            />
                                            <PrimaryButton
                                                label="Cambiar contrasena"
                                                variant="outline-secondary"
                                                iconLeft={<KeyRound size={18} />}
                                                onClick={() => setShowChangePasswordModal(true)}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <PrimaryButton
                                                label={t("common.cancel", "Cancel")}
                                                variant="outline-danger"
                                                iconLeft={<X size={18} />}
                                                onClick={() => setIsEditing(false)}
                                            />
                                            <PrimaryButton
                                                label={t("common.save", "Save Changes")}
                                                variant="success"
                                                type="submit"
                                                iconLeft={<Save size={18} />}
                                            />
                                        </>
                                    )}
                                </div>
                            )}
                        </Form>

                        <ChangePasswordModal
                            show={showChangePasswordModal}
                            onHide={() => setShowChangePasswordModal(false)}
                        />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}


