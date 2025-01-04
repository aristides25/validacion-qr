import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../lib/supabaseClient'

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
    <div className="loading">
      <h2>Validando carnet...</h2>
    </div>
  )

  return (
    <div className="validation-result">
      <h2>{result.valid ? '✅ Carnet Válido' : '❌ Carnet Inválido'}</h2>
      <p>{result.message}</p>
      {result.valid && result.worker && (
        <div className="worker-info">
          <p>Nombre: {result.worker.full_name}</p>
          <p>Ubicación: {result.worker.location}</p>
        </div>
      )}
    </div>
  )
} 