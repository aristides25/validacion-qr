import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../lib/supabaseClient'
import logo from '../assets/logo.jpg'

export default function ValidationResult() {
  const { qrCode } = useParams()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function validateWorker() {
      try {
        const { data, error } = await supabase
          .rpc('validate_worker_qr', { qr_code_param: qrCode })

        if (error) throw error
        setResult(data)
      } catch (error) {
        console.error('Error:', error)
        setResult({ valid: false, message: 'Error al validar el carnet' })
      } finally {
        setLoading(false)
      }
    }

    validateWorker()
  }, [qrCode])

  if (loading) return (
    <div className="validation-container">
      <img src={logo} alt="Logo" className="logo" />
      <div className="loading">
        <h2>Validando carnet...</h2>
      </div>
    </div>
  )

  return (
    <div className="validation-container">
      <img src={logo} alt="Logo" className="logo" />
      <div className="validation-result">
        <h2 className={result.valid ? 'valid-title' : 'invalid-title'}>
          {result.valid ? '✅ Carnet Válido' : '❌ Carnet Inválido'}
        </h2>
        <p className="message">{result.message}</p>
        {result.valid && result.worker && (
          <div className="worker-info">
            <p><strong>Nombre:</strong> {result.worker.full_name}</p>
            <p><strong>Ubicación:</strong> {result.worker.location}</p>
          </div>
        )}
      </div>
    </div>
  )
} 