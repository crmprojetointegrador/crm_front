
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SobreNos from '../pages/About';
// ... Esperando Navbar, Footer...

function AppRoutes() {
    return (
        <BrowserRouter>
            {/* ... Navbar */}
            <Routes>
                {/* ... outras routes  */}
                <Route path="/about" element={<SobreNos />} />
                {/* ... */}
            </Routes>
            {/* ... Footer */}
        </BrowserRouter>
    );
}

export default AppRoutes;