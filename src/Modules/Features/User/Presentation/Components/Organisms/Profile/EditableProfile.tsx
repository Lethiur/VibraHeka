import UseGetProfile from "@users/Presentation/Hooks/UseGetProfile";
import UseUpdateUserProfile from "@users/Presentation/Hooks/UseUpdateProfile";
import { useState } from "react";
import { IUserprofile } from "@users/Domain/Entities/IUserProfile";
import { UseToast } from "@core/Presentation/Hooks/UseToast";
import { useTranslation } from "react-i18next";
import { NotificationVariant } from "@core/Domain/Notifications/INotificationProvider";
import { Card, Col, Form, Image, Row } from "react-bootstrap";
import { KeyRound, Pencil, Save, X } from "lucide-react";
import EditableField from "@core/Presentation/Components/molecules/EditableField/EditableField";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import ChangePasswordModal from "@users/Presentation/Components/Organisms/ChangePasswordModal/ChangePasswordModal.tsx";


interface ProfileProps {
    UserID: string;
    IsOwnProfile: boolean;
}

export default function EditableProfile({ UserID, IsOwnProfile }: ProfileProps) {
    const { profile, loading, getProfile } = UseGetProfile(UserID);
    const { UpdateProfile, loading: updateLoading } = UseUpdateUserProfile();
    const { ShowNotification } = UseToast();
    const { t } = useTranslation();

    const [isEditing, setIsEditing] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);


    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!profile) return;

        const formData = new FormData(e.currentTarget);

        const updatedProfile: IUserprofile = {
            ...profile,
            FirstName: String(formData.get("FirstName") || profile.FirstName),
            MiddleName: String(formData.get("MiddleName") || profile.MiddleName),
            LastName: String(formData.get("LastName") || profile.LastName),
            Phone: String(formData.get("Phone") || profile.Phone),
            Bio: String(formData.get("Bio") || profile.Bio),
        };

        await UpdateProfile(updatedProfile, {
            onSuccess: async () => {
                ShowNotification(
                    t("pages.profile.messages.saved_profile_title"),
                    t("pages.profile.messages.saved_profile_message"),
                    NotificationVariant.Success
                );
                setIsEditing(false);
                getProfile();
            },
            onError: () => {
                ShowNotification(
                    t("pages.profile.messages.error_profile_title"),
                    t("pages.profile.messages.error_profile_message"),
                    NotificationVariant.Error
                );
            }
        });
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

    if (loading || updateLoading || !profile) {
        return renderProfileSkeleton();
    }

    return (
        <Row className="justify-content-center">
            <Col md={12} lg={12}>
                <Card className="profile-card vh-panel vh-surface-card">
                    <Card.Header>
                        <h2>
                            {IsOwnProfile
                                ? t("pages.profile.title")
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
                                        alt={t("pages.profile.avatar_alt")}
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
                                        label={t("pages.profile.fields.firstName")}
                                        name="FirstName"
                                        value={profile.FirstName}
                                        isEditing={isEditing}
                                    />
                                </Col>
                                <Col md={4}>
                                    <EditableField
                                        label={t("pages.profile.fields.middleName")}
                                        name="MiddleName"
                                        value={profile.MiddleName}
                                        isEditing={isEditing}
                                    />
                                </Col>
                                <Col md={4}>
                                    <EditableField
                                        label={t("pages.profile.fields.lastName")}
                                        name="LastName"
                                        value={profile.LastName}
                                        isEditing={isEditing}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} lg={4}>
                                    <EditableField
                                        label={t("pages.profile.fields.email")}
                                        name="Email"
                                        value={profile.Email}
                                        isEditing={false}
                                        type="email"
                                        helpText={
                                            IsOwnProfile && isEditing
                                                ? t("pages.profile.fields.email_help")
                                                : undefined
                                        }
                                        className="text-muted"
                                    />
                                </Col>
                                <Col lg={4}></Col>
                                <Col md={12} lg={4}>
                                    <EditableField
                                        label={t("pages.profile.fields.phone")}
                                        name="Phone"
                                        value={profile.Phone}
                                        isEditing={isEditing}
                                        type="number"
                                        helpText={
                                            IsOwnProfile && isEditing
                                                ? t("pages.profile.fields.phone_help")
                                                : undefined
                                        }
                                        className="text-muted"
                                    />
                                </Col>
                            </Row>

                            <EditableField
                                label={t("pages.profile.fields.bio")}
                                name="Bio"
                                value={profile.Bio}
                                isEditing={isEditing}
                                as="textarea"
                                rows={3}
                            />

                            {IsOwnProfile && (
                                <div className="edit-controls">
                                    {!isEditing ? (
                                        <>
                                            <PrimaryButton
                                                label={t("pages.profile.actions.edit_profile")}
                                                variant="primary"
                                                iconLeft={<Pencil size={18} />}
                                                onClick={() => setIsEditing(true)}
                                            />
                                            <PrimaryButton
                                                label={t("pages.profile.actions.change_password")}
                                                variant="outline-secondary"
                                                iconLeft={<KeyRound size={18} />}
                                                onClick={() => setShowChangePasswordModal(true)}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <PrimaryButton
                                                label={t("pages.profile.actions.cancel")}
                                                variant="outline-danger"
                                                iconLeft={<X size={18} />}
                                                onClick={() => setIsEditing(false)}
                                            />
                                            <PrimaryButton
                                                label={t("pages.profile.actions.save")}
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
