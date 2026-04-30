import {useEffect, useState} from "react";
import "./Verification.scss";
import {useTranslation} from "react-i18next";
import VerifyUserUseCaseImpl from "@auth/Application/UseCases/VerifyUser/VerifyUserUseCaseImpl";
import useVerifyUser from "@auth/Presentation/Hooks/useVerifyUser";
import {NavigateFunction, useNavigate, useSearchParams} from "react-router-dom";
import {AuthErrorCodes} from "@auth/Domain/Errors/AuthErrorCodes";
import {Result} from "neverthrow";
import useLocalStorage from "@core/Presentation/Hooks/UseLocalStorage";
import LocalStorageService from "@core/Infrastructure/Storage/LocalStorageService";
import {STORAGE_KEYS} from "@core/Infrastructure/Storage/StorageKeys";
import useResendVerificationCode from "../../Hooks/useResendVerificationCode";
import AuthLayout from "@auth/Presentation/layouts/AuthLayout/AuthLayout";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import {Row, Col} from "react-bootstrap";
import CooldownButton from "@core/Presentation/Components/molecules/CooldownButton/CooldownButton";
import LoginUserUseCase from "@auth/Application/UseCases/LoginUser/LoginUserUseCase.ts";
import useLoginUser from "@auth/Presentation/Hooks/useLoginUser.ts";
import {LoginResult} from "@auth/Domain/Entities/LoginResult.ts";
import {isAuthenticatedAtom} from "@core/Presentation/Storage/AuthAtom.ts";
import {useSetAtom} from "jotai";
import ReactGA from "react-ga4";
import {useMutation} from "@tanstack/react-query";
import {LoginData} from "@auth/Domain/Entities/LoginData";
import AppLoader from "@core/Presentation/Components/molecules/AppLoader/AppLoader";

const verificationInFlightTokens = new Set<string>();


export default function Verification() {

    const [searchParams] = useSearchParams();
    const token: string = searchParams.get("token") || "";
    const {t} = useTranslation();

    const [globalError, setGlobalError] = useState<string | null>(null);
    const {ResendVerificationCode, loading} = useResendVerificationCode();
    const verifyUserUseCase: VerifyUserUseCaseImpl = useVerifyUser();
    const localStorage: LocalStorageService = useLocalStorage();
    const loginUserUseCase: LoginUserUseCase = useLoginUser();
    const navigate: NavigateFunction = useNavigate();
    const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);

    const loginMutation = useMutation<LoginResult, AuthErrorCodes, LoginData>({
        mutationFn: async (data: LoginData) => {
            const authResult: Result<LoginResult, AuthErrorCodes> = await loginUserUseCase.execute(data);
            if (authResult.isErr()) throw authResult.error;
            return authResult.value;
        }
    });

    const verificationMutation = useMutation<void, AuthErrorCodes, string>({
        mutationFn: async (verificationToken: string) => {
            const verificationResult: Result<void, AuthErrorCodes> = await verifyUserUseCase.Execute({
                Token: verificationToken,
            });
            if (verificationResult.isErr()) throw verificationResult.error;
        }
    });

    const isSubmitting = verificationMutation.isPending || loginMutation.isPending;

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        if (verificationInFlightTokens.has(token)) return;

        verificationInFlightTokens.add(token);
        verificationMutation.mutate(token, {
            onSuccess: () => {
                trackEvent();
                const pwd: string | null = localStorage.getString(STORAGE_KEYS.PASSWORD);
                const email: string = localStorage.getString(STORAGE_KEYS.EMAIL) || "";

                if (!pwd || !email) {
                    navigate('/login');
                    return;
                }

                loginMutation.mutate(
                    {
                        Email: email,
                        Password: pwd,
                    },
                    {
                        onSuccess: () => {
                            localStorage.remove(STORAGE_KEYS.PASSWORD);
                            setIsAuthenticated(true);
                            navigate('/subscripcion');
                        },
                        onError: () => {
                            navigate('/login');
                        },
                    }
                );
            },
            onError: (error) => {
                setGlobalError(t(`errors.auth.${error}`));
            },
            onSettled: () => {
                verificationInFlightTokens.delete(token);
            }
        });
    }, [token, navigate]);

    function trackEvent() {
        ReactGA.event("generate_lead", {
            method: "formulario"
        });
        ReactGA.event("account_verified", {
            method: "email_link"
        });
    }

    if (isSubmitting) {
        return <AppLoader message={t('pages.verification.verifying')}/>;
    }

    return (
        <AuthLayout title={t('pages.verification.title')} subtitle={t('pages.verification.description')}>
            <ErrorBox message={globalError} variant="danger"/>
            <Row className="g-3 verification-actions">
                <Col xs={12} md={6}>
                    {(!isSubmitting || !token) && (
                        <CooldownButton
                            label={<>{t('pages.verification.form.resend_button')}</>}
                            type="button"
                            variant="secondary"
                            cooldownSeconds={60}
                            cooldownStorageKey={STORAGE_KEYS.RESEND_VERIFICATION_CODE_COOLDOWN_UNTIL}
                            action={async () => {
                                const result = await ResendVerificationCode(localStorage.getString(STORAGE_KEYS.EMAIL) ?? "");
                                return result.isOk();
                            }}
                            disabled={isSubmitting || loading}
                            fullWidth={true}
                        />
                    )}
                </Col>
            </Row>
        </AuthLayout>
    )
}
