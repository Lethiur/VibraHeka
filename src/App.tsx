import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/Landing/Landing'

function App() {
    return (
        <Router>
            <div className="container mt-5">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
