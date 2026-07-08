import { BrowserRouter } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <div className="min-h-[80vh]">
      </div>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App