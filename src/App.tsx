import { Routes, Route} from 'react-router-dom'
import Navbar from './components/organisms/NavBar/Navbar'

import Registro from './features/auth/presentation/pages/Registro/Registro'
import Login from "./features/auth/presentation/pages/Login/Login.tsx";
import Verification from "./features/auth/presentation/pages/Verification/Verification.tsx";
import {isAuthenticatedAtom} from "./core/Presentation/Storage/AuthAtom.ts";
import {useAtomValue} from "jotai";
import {useLogout} from "./features/auth/presentation/Hooks/useLogout.ts";
import LandingPage from "./features/Landing/Presentation/Pages/Landing.tsx";
import VeraLucya from "./features/Therapist/Presentation/Pages/Individuales/VeraLucya.tsx";
import TerapeutasHome from "./features/Therapist/Presentation/Pages/TerapetuasHome.tsx";
import BeatrizAlonso from "./features/Therapist/Presentation/Pages/Individuales/BeatrizAlonso.tsx";
import {STORAGE_KEYS} from "./core/Infrastructure/Storage/StorageKeys.ts";
import Dashboard from "./Admin/Dashboard/Presentation/Pages/Dashboard.tsx";
import AdminLayout from "./core/Presentation/Layouts/AdminLayout.tsx";
import TherapistIndex from "./Admin/AddTherapist/Presentation/Pages/TherapistIndex.tsx";

function App() {

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const {logout} = useLogout();

    function getRole() : number {
        return parseInt(localStorage.getItem(STORAGE_KEYS.ROLE) ?? "0");
    }
    

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} onLogout={logout} role={getRole()}/>

            <div className="container mt-5">
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    {
                        !isAuthenticated && (
                            <>
                                <Route path="/registro" element={<Registro/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/verify" element={<Verification/>}/>
                            </>)
                    }

                    {
                        isAuthenticated && (
                            <>
                                <Route path="/talleres" element={<TerapeutasHome/>}>
                                </Route>
                            </>
                                
                        )
                    }

                    {
                        getRole() === 1 && (
                            <>
                                <Route path="/admin" element={<AdminLayout/>}>
                                    <Route path="/admin/dashboard" element={<Dashboard/>}/>
                                    <Route path="/admin/therapists" element={<TherapistIndex/>}/>
                                </Route>
                            </>
                        )
                    }


                    <Route path="/terapeutas" element={<TerapeutasHome/>}/>
                    <Route path="/terapeutas/beatriz-alonso" element={<BeatrizAlonso/>}/>
                    <Route path="/terapeutas/vera-lucya" element={<VeraLucya/>}/>
                </Routes>
            </div>
        
        </>
    )
}

export default App
