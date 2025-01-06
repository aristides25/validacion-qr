import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { toPng } from 'html-to-image'
import supabase from '../lib/supabaseClient'

const VERCEL_URL = 'https://validacion-qr.vercel.app'

export default function QRGenerator() {
  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(false)

  const downloadQR = async (workerId, workerName) => {
    const element = document.getElementById(`qr-${workerId}`)
    if (element) {
      const dataUrl = await toPng(element)
      const link = document.createElement('a')
      link.download = `qr-${workerName.toLowerCase().replace(/\s+/g, '-')}.png`
      link.href = dataUrl
      link.click()
    }
  }

  async function loadWorkers() {
    setLoading(true)
    const { data, error } = await supabase
      .from('workers')
      .select('*')
      .order('full_name')

    if (error) {
      console.error('Error:', error)
      return
    }

    setWorkers(data)
    setLoading(false)
  }

  async function addWorker(workerData) {
    const { data, error } = await supabase
      .from('workers')
      .insert([workerData])
      .select()

    if (error) {
      console.error('Error:', error)
      return
    }

    loadWorkers()
  }

  return (
    <div className="qr-generator">
      <h2>Generador de Carnets QR</h2>
      <button onClick={loadWorkers}>Cargar Lista de Trabajadores</button>
      
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="workers-list">
          {workers.map(worker => (
            <div key={worker.id} className="qr-card">
              <h3>{worker.full_name}</h3>
              <p>Ubicación: {worker.location}</p>
              <div id={`qr-${worker.id}`}>
                <QRCodeSVG 
                  value={`${VERCEL_URL}/validate/${worker.qr_code}`}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p>Código: {worker.qr_code}</p>
              <div className="button-group">
                <button onClick={() => window.print()}>Imprimir QR</button>
                <button onClick={() => downloadQR(worker.id, worker.full_name)}>
                  Descargar PNG
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 