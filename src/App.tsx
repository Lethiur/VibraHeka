import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/Landing/Landing'
import Navbar from './components/organisms/NavBar/Navbar'
import TerapeutasHome from './pages/Terapeutas/TerapetuasHome'
import BeatrizAlonso from './pages/Terapeutas/Individuales/BeatrizAlonso'
import VeraLucya from './pages/Terapeutas/Individuales/VeraLucya'
import Registro from './features/auth/presentation/pages/Registro/Registro'
import Login from "./features/auth/presentation/pages/Login/Login.tsx";
import Verification from "./features/auth/presentation/pages/Verification/Verification.tsx";
import useLocalStorage from "./core/Presentation/Hooks/UseLocalStorage.ts";
import {STORAGE_KEYS} from "./features/auth/presentation/Storage/StorageKeys.ts";

function App() {

    const localStorageToken = useLocalStorage();

    function isAuthenticated() {
        return localStorageToken.getString(STORAGE_KEYS.AUTH_TOKEN) !== null;
    }

    return (
        <Router>
            <Navbar/>

            <div className="container mt-5">
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    {
                        !isAuthenticated() && (
                            <>
                                <Route path="/registro" element={<Registro/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/verify" element={<Verification/>}/>
                            </>)
                    }

                    {
                        isAuthenticated() && (
                            <>
                                <Route path="/talleres" element={<TerapeutasHome/>}/>            
                            </>
                        )
                    }


                    
                    <Route path="/terapeutas" element={<TerapeutasHome/>}/>
                    <Route path="/terapeutas/beatriz-alonso" element={<BeatrizAlonso/>}/>
                    <Route path="/terapeutas/vera-lucya" element={<VeraLucya/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App
