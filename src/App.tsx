import { Routes, Route } from 'react-router-dom'
import VHNavbar from '@core/Presentation/Components/organisms/NavBar/Navbar'


import { isAuthenticatedAtom } from "@core/Presentation/Storage/AuthAtom";
import { useAtomValue } from "jotai";
import { useLogout } from "@auth/Presentation/Hooks/useLogout";
import { STORAGE_KEYS } from "@core/Infrastructure/Storage/StorageKeys";
import { lazy, Suspense } from 'react';
const Registro = lazy(() => import('@auth/Presentation/pages/Registro/Registro'))
const Login = lazy(() => import("@auth/Presentation/pages/Login/Login"))
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

function App() {

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const { logout } = useLogout();

    function getRole(): number {
        return parseInt(localStorage.getItem(STORAGE_KEYS.ROLE) ?? "0");
    }

    function isAdmin(): boolean {
        return getRole() === 1 && isAuthenticated;
    }
    

    return (
        <>
            <VHNavbar isAuthenticated={isAuthenticated} onLogout={logout} role={getRole()} />

            <div className="mt-6">
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        {
                            !isAuthenticated && (
                                <>
                                    <Route path="/registro" element={<Registro />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/verify" element={<Verification />} />
                                </>)
                        }

                        {
                            isAuthenticated && (
                                <>
                                    <Route path="/talleres" element={<TerapeutasHome />}>
                                    </Route>
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

                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/terapeutas" element={<TerapeutasHome />} />
                        <Route path="/terapeutas/:id" element={<TherapistPage />} />
                    </Routes>
                </Suspense>
            </div>

        </>
    )
}

export default App
