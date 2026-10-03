'use client'

import { useState } from 'react'
import { Download, FileText, Image as ImageIcon, Code, Eye, Printer, Heart } from 'lucide-react'

export default function Home() {
  const [showPreview, setShowPreview] = useState(false)

  const files = [
    {
      name: 'bautismo_dariana.pdf',
      label: 'PDF para Imprimir',
      description: 'Archivo listo para imprimir a doble cara en papel carta horizontal',
      size: '575 KB',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      href: '/bautismo_dariana.pdf',
      download: 'bautismo_dariana.pdf',
      primary: true
    },
    {
      name: 'bautismo_dariana.html',
      label: 'Archivo HTML Editable',
      description: 'Archivo fuente que puedes editar para personalizar nombres, fechas o himnos',
      size: '31 KB',
      icon: Code,
      color: 'from-amber-500 to-amber-600',
      href: '/bautismo_dariana.html',
      download: 'bautismo_dariana.html'
    },
    {
      name: 'bautismo_dariana_preview.png',
      label: 'Imagen de Vista Previa',
      description: 'Vista previa del diseño terminado para compartir en WhatsApp',
      size: '1.0 MB',
      icon: ImageIcon,
      color: 'from-rose-500 to-rose-600',
      href: '/bautismo_dariana_preview.png',
      download: 'bautismo_dariana_preview.png'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col">
      {/* Hero Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Heart className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span className="text-xs font-medium tracking-widest uppercase">La Iglesia de Jesucristo de los Santos de los Ultimos Dias</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            Programa de Bautismo
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-blue-100 mb-2">
            Dariana de la Rocha Martinez
          </p>
          <div className="flex items-center justify-center gap-3 text-blue-200 text-sm sm:text-base">
            <span>Domingo</span>
            <span className="w-1 h-1 bg-blue-300 rounded-full" />
            <span>4 de Octubre de 2026</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-12">
        {/* Preview Image */}
        <section className="mb-10">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl text-slate-800 mb-2">Vista Previa del Folleto</h2>
            <p className="text-slate-500 text-sm">Asi se vera tu folleto una vez impreso y doblado</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200 bg-white max-w-4xl mx-auto">
            <img
              src="/bautismo_dariana_preview.png"
              alt="Vista previa del programa de bautismo para Dariana de la Rocha Martinez"
              className="w-full h-auto"
            />
          </div>
          <p className="text-center text-xs text-slate-400 mt-3">
            El folleto tiene 2 paginas (frente y vuelta) que se imprimen a doble cara y se doblan por la mitad
          </p>
        </section>

        {/* Download Cards */}
        <section className="mb-10">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-slate-800 mb-2">Descargar Archivos</h2>
            <p className="text-slate-500 text-sm">Elige el archivo que necesitas descargar</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => {
              const Icon = file.icon
              return (
                <a
                  key={file.name}
                  href={file.href}
                  download={file.download}
                  className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 hover:shadow-2xl hover:ring-blue-300 transition-all duration-300 hover:-translate-y-1 ${file.primary ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${file.color}`} />
                  <div className="p-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${file.color} text-white mb-4 shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-slate-800 mb-1">
                      {file.label}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                      {file.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs font-mono text-slate-400">{file.size}</span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                        <Download className="w-4 h-4" />
                        Descargar
                      </span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </section>

        {/* Instructions */}
        <section className="bg-white rounded-2xl shadow-lg ring-1 ring-slate-200 p-6 sm:p-8">
          <h2 className="font-serif text-2xl text-slate-800 mb-6 flex items-center gap-2">
            <Printer className="w-6 h-6 text-blue-600" />
            Instrucciones de Impresion
          </h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">1</span>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Descarga el archivo PDF</h3>
                <p className="text-sm text-slate-600">Haz clic en la tarjeta azul de arriba que dice &quot;PDF para Imprimir&quot; para descargar el archivo bautismo_dariana.pdf</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">2</span>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Abre el PDF</h3>
                <p className="text-sm text-slate-600">Doble clic en el archivo descargado para abrirlo con tu visor de PDF (Adobe Reader, Preview, etc.)</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">3</span>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Configura la impresion</h3>
                <p className="text-sm text-slate-600">En el dialogo de impresion selecciona:</p>
                <ul className="mt-2 ml-4 text-sm text-slate-600 space-y-1">
                  <li>• Tamano de papel: <strong>Carta (Letter)</strong></li>
                  <li>• Orientacion: <strong>Horizontal (Landscape)</strong></li>
                  <li>• Impresion: <strong>A doble cara (Both sides)</strong></li>
                  <li>• Escala: <strong>100%</strong> (no ajustar a pagina)</li>
                </ul>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">4</span>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Dobla el folleto</h3>
                <p className="text-sm text-slate-600">Una vez impreso por ambos lados, dobla la hoja por la mitad verticalmente para formar el folleto de 4 paneles</p>
              </div>
            </li>
          </ol>
        </section>

        {/* Special note */}
        <section className="mt-8 bg-gradient-to-br from-blue-50 to-amber-50 rounded-2xl p-6 sm:p-8 text-center ring-1 ring-blue-100">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium tracking-widest uppercase mb-4">
            <Heart className="w-3 h-3 fill-blue-700" />
            Mensaje Especial
          </div>
          <p className="font-serif italic text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto">
            &quot;El bautismo es la puerta de entrada al reino de Dios. Cuando nos bautizamos, hacemos un convenio sagrado con nuestro Padre Celestial.&quot;
          </p>
          <p className="mt-4 text-sm font-semibold text-slate-600">Presidente Russell M. Nelson</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm">
            Folleto creado con amor para Dariana de la Rocha Martinez
          </p>
          <p className="text-xs mt-1 text-slate-500">
            La Iglesia de Jesucristo de los Santos de los Ultimos Dias &middot; 4 de Octubre de 2026
          </p>
        </div>
      </footer>
    </div>
  )
}
