import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/Landing/Landing'
import Navbar from './components/organisms/NavBar/Navbar'
import TerapeutasHome from './pages/Terapeutas/TerapetuasHome'
import BeatrizAlonso from './pages/Terapeutas/Individuales/BeatrizAlonso'
import VeraLucya from './pages/Terapeutas/Individuales/VeraLucya'

function App() {
    return (
        <Router>
            <Navbar />

            <div className="container mt-5">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/terapeutas" element={<TerapeutasHome />} />
                    <Route path="/terapeutas/beatriz-alonso" element={<BeatrizAlonso />} />
                    <Route path="/terapeutas/vera-lucya" element={<VeraLucya />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
