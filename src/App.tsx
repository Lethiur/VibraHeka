import { Routes, Route } from 'react-router-dom'
import Navbar from '@core/Presentation/Components/organisms/NavBar/Navbar'

import Registro from '@auth/Presentation/pages/Registro/Registro'
import Login from "@auth/Presentation/pages/Login/Login";
import Verification from "@auth/Presentation/pages/Verification/Verification";
import { isAuthenticatedAtom } from "@core/Presentation/Storage/AuthAtom";
import { useAtomValue } from "jotai";
import { useLogout } from "@auth/Presentation/Hooks/useLogout";
import LandingPage from "@landing/Presentation/Pages/Landing";
import TerapeutasHome from "@therapist/Presentation/Pages/TerapetuasHome";
import { STORAGE_KEYS } from "@core/infrastructure/Storage/StorageKeys";
import Dashboard from "@admin/dashboard/Presentation/Pages/Dashboard";
import AdminLayout from "@core/Presentation/Layouts/AdminLayout";
import TherapistIndex from "@admin/addTherapist/Presentation/Pages/TherapistIndex";
import Emails from '@admin/emailTemplates/Presentation/Screens/EmailsForAction/Emails';
import TemplateManagement from '@admin/emailTemplates/Presentation/Screens/TemplatesManagement/TemplateManagement';
import Profile from '@users/Presentation/pages/Profile/Profile';
import TherapistPage from '@therapist/Presentation/Pages/TherapistPage/TherapistPage';

function App() {

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const { logout } = useLogout();

    function getRole(): number {
        return parseInt(localStorage.getItem(STORAGE_KEYS.ROLE) ?? "0");
    }


    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} onLogout={logout} role={getRole()} />

            <div className="mt-6">
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
                        getRole() === 1 && (
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
            </div>

        </>
    )
}

export default App
