import { Routes, Route, useLocation } from 'react-router-dom'
import VHNavbar from '@core/Presentation/Components/organisms/NavBar/Navbar'


import { isAuthenticatedAtom } from "@core/Presentation/Storage/AuthAtom";
import { useAtomValue } from "jotai";
import { useLogout } from "@auth/Presentation/Hooks/useLogout";
import { STORAGE_KEYS } from "@core/Infrastructure/Storage/StorageKeys";
import { lazy, Suspense, useEffect } from 'react';
import AppLoader from "@core/Presentation/Components/molecules/AppLoader/AppLoader";
const Registro = lazy(() => import('@auth/Presentation/pages/Registro/Registro'))
const Login = lazy(() => import("@auth/Presentation/pages/Login/Login"))
const ForgotPassword = lazy(() => import("@auth/Presentation/pages/ForgotPassword/ForgotPassword"))
const ResetPassword = lazy(() => import("@auth/Presentation/pages/ResetPassword/ResetPassword"))
const Verification = lazy(() => import("@auth/Presentation/pages/Verification/Verification"))
const Dashboard = lazy(() => import("@admin/dashboard/Presentation/Pages/Dashboard"))
const AdminLayout = lazy(() => import("@core/Presentation/Layouts/AdminLayout"))
const TherapistIndex = lazy(() => import("@admin/addTherapist/Presentation/Pages/TherapistIndex"))
const Emails = lazy(() => import('@admin/emailTemplates/Presentation/Screens/EmailsForAction/Emails'))
const TemplateManagement = lazy(() => import('@admin/emailTemplates/Presentation/Screens/TemplatesManagement/TemplateManagement'))
const Profile = lazy(() => import('@users/Presentation/pages/Profile/Profile'))
const TherapistPage = lazy(() => import('@therapist/Presentation/Pages/TherapistPage/TherapistPage'))
const LandingPage = lazy(() => import('@landing/Presentation/Pages/Landing'))
const TerapeutasHome = lazy(() => import('@therapist/Presentation/Pages/TerapetuasHome'))
const FreeClassesPage = lazy(() => import('@freeclasses/Presentation/Pages/FreeClassesPage/FreeClassesPage'))

function App() {

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const { logout } = useLogout();
    const { pathname } = useLocation();

    const ROUTES_WITHOUT_NAVBAR = ['/clases-gratuitas'];
    const normalizedPath = pathname.replace(/\/$/, '');
    const hideNavbar = ROUTES_WITHOUT_NAVBAR.includes(normalizedPath);

    useEffect(() => {
        const handler = () => logout();
        window.addEventListener("auth:unauthorized", handler);
        return () => window.removeEventListener("auth:unauthorized", handler);
    }, [logout]);

    function getRole(): number {
        return parseInt(localStorage.getItem(STORAGE_KEYS.ROLE) ?? "0");
    }

    function isAdmin(): boolean {
        return getRole() === 1 && isAuthenticated;
    }
    

    return (
        <>
            {!hideNavbar && <VHNavbar isAuthenticated={isAuthenticated} onLogout={logout} role={getRole()} />}

            <div className="app-content">
                <Suspense fallback={<AppLoader />}>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        {
                            !isAuthenticated && (
                                <>
                                    <Route path="/registro" element={<Registro />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/forgot-password" element={<ForgotPassword />} />
                                    <Route path="/recover-password" element={<ResetPassword />} />
                                    <Route path="/verify" element={<Verification />} />
                                </>)
                        }

                        {
                            isAuthenticated && (
                                <>
                                    <Route path="/talleres" element={<TerapeutasHome />}>
                                    </Route>
                                    <Route path="/profile/:id" element={<Profile />} />
                                </>

                            )
                        }

                        {
                            isAdmin() && (
                                <>
                                    <Route path="/admin" element={<AdminLayout />}>
                                        <Route path="/admin/dashboard" element={<Dashboard />} />
                                        <Route path="/admin/therapists" element={<TherapistIndex />} />
                                        <Route path="/admin/emails" element={<Emails />} />
                                        <Route path="/admin/emails/templates" element={<TemplateManagement />} />
                                    </Route>
                                </>
                            )
                        }

                        
                        <Route path="/terapeutas" element={<TerapeutasHome />} />
                        <Route path="/terapeutas/:id" element={<TherapistPage />} />
                        <Route path="/clases-gratuitas" element={<FreeClassesPage />} />
                    </Routes>
                </Suspense>
            </div>

        </>
    )
}

export default App
