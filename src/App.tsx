import { Routes, Route } from 'react-router-dom'
import Navbar from './Core/Presentation/Components/organisms/NavBar/Navbar'

import Registro from './Modules/Features/Auth/Presentation/pages/Registro/Registro'
import Login from "./Modules/Features/Auth/Presentation/pages/Login/Login";
import Verification from "./Modules/Features/Auth/Presentation/pages/Verification/Verification";
import { isAuthenticatedAtom } from "./Core/Presentation/Storage/AuthAtom";
import { useAtomValue } from "jotai";
import { useLogout } from "./Modules/Features/Auth/Presentation/Hooks/useLogout";
import LandingPage from "./Modules/Features/Landing/Presentation/Pages/Landing";
import VeraLucya from "./Modules/Features/Therapist/Presentation/Pages/Individuales/VeraLucya";
import TerapeutasHome from "./Modules/Features/Therapist/Presentation/Pages/TerapetuasHome";
import BeatrizAlonso from "./Modules/Features/Therapist/Presentation/Pages/Individuales/BeatrizAlonso";
import { STORAGE_KEYS } from "./Core/Infrastructure/Storage/StorageKeys";
import Dashboard from "./Modules/Admin/Dashboard/Presentation/Pages/Dashboard";
import AdminLayout from "./Core/Presentation/Layouts/AdminLayout";
import TherapistIndex from "./Modules/Admin/AddTherapist/Presentation/Pages/TherapistIndex";
import Emails from './Modules/Admin/Emails/Presentation/Screens/EmailsForAction/Emails';
import TemplateManagement from './Modules/Admin/Emails/Presentation/Screens/TemplatesManagement/TemplateManagement';

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


                    <Route path="/terapeutas" element={<TerapeutasHome />} />
                    <Route path="/terapeutas/beatriz-alonso" element={<BeatrizAlonso />} />
                    <Route path="/terapeutas/vera-lucya" element={<VeraLucya />} />
                </Routes>
            </div>

        </>
    )
}

export default App
