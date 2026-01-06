import { Routes, Route } from 'react-router-dom'
import Navbar from './Core/Presentation/Components/organisms/NavBar/Navbar.tsx'

import Registro from './Features/Auth/Presentation/pages/Registro/Registro.tsx'
import Login from "./Features/Auth/Presentation/pages/Login/Login.tsx";
import Verification from "./Features/Auth/Presentation/pages/Verification/Verification.tsx";
import { isAuthenticatedAtom } from "./Core/Presentation/Storage/AuthAtom.ts";
import { useAtomValue } from "jotai";
import { useLogout } from "./Features/Auth/Presentation/Hooks/useLogout.ts";
import LandingPage from "./Features/Landing/Presentation/Pages/Landing.tsx";
import VeraLucya from "./Features/Therapist/Presentation/Pages/Individuales/VeraLucya.tsx";
import TerapeutasHome from "./Features/Therapist/Presentation/Pages/TerapetuasHome.tsx";
import BeatrizAlonso from "./Features/Therapist/Presentation/Pages/Individuales/BeatrizAlonso.tsx";
import { STORAGE_KEYS } from "./Core/Infrastructure/Storage/StorageKeys.ts";
import Dashboard from "./Admin/Dashboard/Presentation/Pages/Dashboard.tsx";
import AdminLayout from "./Core/Presentation/Layouts/AdminLayout.tsx";
import TherapistIndex from "./Admin/AddTherapist/Presentation/Pages/TherapistIndex.tsx";

function App() {

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const { logout } = useLogout();

    function getRole(): number {
        return parseInt(localStorage.getItem(STORAGE_KEYS.ROLE) ?? "0");
    }


    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} onLogout={logout} role={getRole()} />

            <div className="container mt-5">
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
