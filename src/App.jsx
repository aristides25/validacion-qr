import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ValidationResult from './components/ValidationResult'
import QRGenerator from './components/QRGenerator'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <div className="error-page">
              <h1>SetCarnets</h1>
              <p>Por favor, escanea un código QR válido para validar tu carnet.</p>
            </div>
          } />
          <Route path="/validate/:qrCode" element={<ValidationResult />} />
          <Route path="/generate" element={<QRGenerator />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
