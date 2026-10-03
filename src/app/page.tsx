'use client'

import { useState, useRef, useEffect } from 'react'
import { Download, FileText, Image as ImageIcon, Eye, RefreshCw, Plus, Trash2, Palette, Type, Calendar, Music, BookOpen, User, Settings, Loader2 } from 'lucide-react'

type ProgramItem = {
  id: number
  label: string
  detail: string
}

type Hymn = {
  id: number
  number: string
  title: string
  verses: { id: number; label: string; content: string }[]
}

type ColorTheme = {
  id: string
  name: string
  primary: string
  secondary: string
  accent: string
  bg: string
  text: string
}

const colorThemes: ColorTheme[] = [
  {
    id: 'blue',
    name: 'Azul Celestial',
    primary: '#2c4a63',
    secondary: '#1a4f72',
    accent: '#d4af37',
    bg: '#fbfdff',
    text: '#2c4a63'
  },
  {
    id: 'rose',
    name: 'Rosa Elegante',
    primary: '#831f4a',
    secondary: '#a8326a',
    accent: '#c9a845',
    bg: '#fff5f8',
    text: '#5a1530'
  },
  {
    id: 'green',
    name: 'Verde Esmeralda',
    primary: '#1a4a3a',
    secondary: '#2d6f5a',
    accent: '#c9a845',
    bg: '#f5fbf7',
    text: '#1a4a3a'
  },
  {
    id: 'purple',
    name: 'Morado Real',
    primary: '#4a1a5a',
    secondary: '#6a2d8a',
    accent: '#d4af37',
    bg: '#faf5fd',
    text: '#3a1547'
  },
  {
    id: 'gold',
    name: 'Dorado Clasico',
    primary: '#5a3a1f',
    secondary: '#8a5a30',
    accent: '#d4af37',
    bg: '#fdf8ed',
    text: '#4a2810'
  }
]

const defaultData = {
  name: 'Dariana de la Rocha Martinez',
  day: 'Domingo',
  dateText: '4 de Octubre de 2026',
  churchLine: 'La Iglesia de',
  churchName: 'Jesucristo de los Santos de los Ultimos Dias',
  invitationText: 'Te invitamos al',
  titleMain: 'Bautismo',
  titleSub: '& Confirmacion',
  honoredLabel: 'de',
  dateLabel: 'Domingo',
  scriptureRef: 'Libro de Mosiah',
  scriptureText: '"Y acontecio que Alma les dijo: He aqui, aqui son las aguas de Mormon, que estan en la frontera de la tierra que han de heredar los que permanezcan en el Senor; y ahora, como deseais venir al rebano de Dios, y ser llamados sus hijos, que bautice cada uno de vosotros, en el nombre del Senor, para la remision de vuestros pecados, testificando y guardando los mandamientos."',
  scriptureCite: '- Mosiah 18:8-10',
  prophetLabel: 'Voz del Profeta Vivo',
  prophetQuote: '"El bautismo es la puerta de entrada al reino de Dios. Cuando nos bautizamos, hacemos un convenio sagrado con nuestro Padre Celestial. Prometemos tomar sobre nosotros el nombre de Jesucristo, guardar sus mandamientos y servirle hasta el fin. A cambio, El promete que Su Espiritu estara siempre con nosotros y que, si somos fieles, heredaremos toda cuanto El tiene."',
  prophetName: 'Presidente Russell M. Nelson',
  prophetCite: 'Profeta, Vidente y Revelador',
  footerScripture: '"Arrepentios, y bauticese cada uno de vosotros en el nombre de Jesucristo para perdon de vuestros pecados; y recibireis el don del Espiritu Santo."',
  footerCite: '- Hechos 2:38',
  programTitle: 'Orden del Servicio',
  programSubtitle: 'Bautismo & Confirmacion',
  program: [
    { id: 1, label: 'Preludio Musica', detail: '' },
    { id: 2, label: 'Himno de Apertura', detail: '#187 Soy un Hijo de Dios' },
    { id: 3, label: 'Oracion de Apertura', detail: '' },
    { id: 4, label: 'Discurso sobre el Bautismo', detail: '' },
    { id: 5, label: 'Himno Especial', detail: '#103 Con ansias de salvar' },
    { id: 6, label: 'Bautismo', detail: '' },
    { id: 7, label: 'Cambio de Ropa', detail: '' },
    { id: 8, label: 'Confirmacion y Don del E.S.', detail: '' },
    { id: 9, label: 'Himno de Clausura', detail: '#116 Venid a Cristo' },
    { id: 10, label: 'Oracion de Clausura', detail: '' }
  ] as ProgramItem[],
  hymns: [
    {
      id: 1,
      number: '187',
      title: 'Soy un Hijo de Dios',
      verses: [
        { id: 1, label: 'Estrofa 1', content: 'Soy un hijo de Dios, y el me ha enviado aqui;\nsi con El quiero estar, Su palabra sere yo fiel.\nUna luz el me dio, para el camino andar;\nsi a su lado me siento fiel, llegare a El.' },
        { id: 2, label: 'Coro', content: 'Llevame a su hogar, guame por doquier,\nensename el camino y el sendero que\nme llevan a Dios, a su reino de amor;\nque he de vivir con Dios.' }
      ]
    },
    {
      id: 2,
      number: '103',
      title: 'Con ansias de salvar',
      verses: [
        { id: 1, label: 'Estrofa 1', content: 'Con ansias de salvar al pecador perdido,\nJesus sufrio en Getsemani sudando sangre alli;\npor cada cual sufrio el cruel dolor hombre,\nsufrio por ti y por mi, sufrio por ti y por mi.' },
        { id: 2, label: 'Estrofa 2', content: 'En la cruz el sufrio gran dolor y afliccion,\nclavado, la vida dio por ti, por mi;\nno hay amor como el de Jesus, el Redentor;\nsu amor nos salvo, su amor nos salvo.' }
      ]
    },
    {
      id: 3,
      number: '116',
      title: 'Venid a Cristo',
      verses: [
        { id: 1, label: 'Estrofa 1', content: 'Venid a Cristo, el Santo de Israel;\nsu yugo tomad y su ley guardad;\nde El aprended, pues que El es manso y fiel,\ny hallareis paz y consuelo en su amor.' }
      ]
    }
  ] as Hymn[],
  themeId: 'blue'
}

type DataType = typeof defaultData

export default function Home() {
  const [data, setData] = useState<DataType>(defaultData)
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'preview'>('content')
  const [isGenerating, setIsGenerating] = useState(false)
  const previewRef = useRef<HTMLIFrameElement>(null)

  const theme = colorThemes.find(t => t.id === data.themeId) || colorThemes[0]

  const update = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const updateProgramItem = (id: number, field: 'label' | 'detail', value: string) => {
    setData(prev => ({
      ...prev,
      program: prev.program.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }))
  }

  const addProgramItem = () => {
    setData(prev => ({
      ...prev,
      program: [...prev.program, { id: Date.now(), label: 'Nuevo Item', detail: '' }]
    }))
  }

  const removeProgramItem = (id: number) => {
    setData(prev => ({
      ...prev,
      program: prev.program.filter(item => item.id !== id)
    }))
  }

  const updateHymn = (id: number, field: 'number' | 'title', value: string) => {
    setData(prev => ({
      ...prev,
      hymns: prev.hymns.map(h => h.id === id ? { ...h, [field]: value } : h)
    }))
  }

  const updateVerse = (hymnId: number, verseId: number, field: 'label' | 'content', value: string) => {
    setData(prev => ({
      ...prev,
      hymns: prev.hymns.map(h =>
        h.id === hymnId
          ? { ...h, verses: h.verses.map(v => v.id === verseId ? { ...v, [field]: value } : v) }
          : h
      )
    }))
  }

  const addVerse = (hymnId: number) => {
    setData(prev => ({
      ...prev,
      hymns: prev.hymns.map(h =>
        h.id === hymnId
          ? { ...h, verses: [...h.verses, { id: Date.now(), label: 'Nueva Estrofa', content: '' }] }
          : h
      )
    }))
  }

  const removeVerse = (hymnId: number, verseId: number) => {
    setData(prev => ({
      ...prev,
      hymns: prev.hymns.map(h =>
        h.id === hymnId
          ? { ...h, verses: h.verses.filter(v => v.id !== verseId) }
          : h
      )
    }))
  }

  const generateHTML = () => {
    const t = theme
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV']

    return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Programa de Bautismo - ${data.name}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Great+Vibes&family=Dancing+Script:wght@400;500;600;700&display=swap');

  @page { size: 279.4mm 215.9mm; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { margin: 0; padding: 0; width: 279.4mm; background: #ffffff; font-family: 'Inter', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { width: 279.4mm; height: 215.9mm; display: flex; overflow: hidden; page-break-after: always; position: relative; }
  .page:last-child { page-break-after: auto; }
  .panel { width: 50%; height: 100%; position: relative; overflow: hidden; }

  /* BACK PANEL */
  .back-panel { background: radial-gradient(ellipse at 50% 50%, #fefcf8 0%, #faf4e8 60%, #f3e8d3 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px 28px; position: relative; }
  .back-panel::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(ellipse at 15% 85%, rgba(180, 140, 60, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 85% 15%, rgba(180, 140, 60, 0.06) 0%, transparent 50%); pointer-events: none; }
  .back-frame-outer { position: absolute; top: 18px; left: 18px; right: 18px; bottom: 18px; border: 1px solid rgba(150, 110, 40, 0.25); pointer-events: none; }
  .back-frame-inner { position: absolute; top: 24px; left: 24px; right: 24px; bottom: 24px; border: 0.5px solid rgba(150, 110, 40, 0.15); pointer-events: none; }
  .back-content { position: relative; z-index: 1; text-align: center; max-width: 320px; }
  .back-eyebrow { font-family: 'Inter', sans-serif; font-size: 9px; color: rgba(120, 85, 30, 0.65); letter-spacing: 4px; text-transform: uppercase; margin-bottom: 14px; }
  .back-ornament { width: 50px; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center; gap: 4px; }
  .back-ornament .line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(150, 110, 40, 0.4), transparent); }
  .back-ornament .diamond { width: 6px; height: 6px; background: rgba(150, 110, 40, 0.5); transform: rotate(45deg); }
  .back-scripture-ref { font-family: 'Cormorant Garamond', serif; font-size: 13px; color: rgba(120, 85, 30, 0.85); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 18px; font-weight: 500; }
  .back-scripture-text { font-family: 'Cormorant Garamond', serif; font-size: 15.5px; line-height: 1.7; color: #4a3818; font-style: italic; margin-bottom: 14px; font-weight: 400; }
  .back-scripture-cite { font-family: 'Inter', sans-serif; font-size: 10.5px; color: rgba(120, 85, 30, 0.7); letter-spacing: 1.5px; margin-bottom: 26px; font-weight: 500; }
  .back-divider-ornate { width: 100%; height: 14px; display: flex; align-items: center; justify-content: center; gap: 6px; margin: 0 auto 22px; }
  .back-divider-ornate .line { flex: 0 0 60px; height: 1px; background: linear-gradient(90deg, transparent, rgba(150, 110, 40, 0.35), transparent); }
  .back-divider-ornate .symbol { font-family: 'Cormorant Garamond', serif; font-size: 14px; color: rgba(120, 85, 30, 0.5); }
  .back-prophet-label { font-family: 'Inter', sans-serif; font-size: 9.5px; color: rgba(120, 85, 30, 0.6); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; }
  .back-prophet-quote { font-family: 'Cormorant Garamond', serif; font-size: 14.5px; line-height: 1.65; color: #4a3818; font-style: italic; margin-bottom: 12px; font-weight: 400; }
  .back-prophet-name { font-family: 'Playfair Display', serif; font-size: 12.5px; color: rgba(120, 85, 30, 0.85); letter-spacing: 1.5px; margin-bottom: 4px; font-weight: 600; }
  .back-prophet-cite { font-family: 'Inter', sans-serif; font-size: 9.5px; color: rgba(120, 85, 30, 0.55); letter-spacing: 1px; font-style: italic; }

  /* FRONT PANEL */
  .front-panel { background: linear-gradient(180deg, #fbfdff 0%, #f4f9fd 50%, #eaf3fa 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 26px 22px; position: relative; overflow: hidden; }
  .front-panel::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(ellipse at 50% 25%, rgba(135, 195, 235, 0.18) 0%, transparent 55%), radial-gradient(ellipse at 30% 80%, rgba(100, 165, 220, 0.1) 0%, transparent 45%); pointer-events: none; }
  .floral-garland-top { position: absolute; top: 0; left: 0; right: 0; height: 70px; z-index: 2; pointer-events: none; }
  .floral-garland-bottom { position: absolute; bottom: 0; left: 0; right: 0; height: 70px; z-index: 2; pointer-events: none; transform: rotate(180deg); }
  .front-content { position: relative; z-index: 3; text-align: center; width: 100%; }
  .church-line { font-family: 'Inter', sans-serif; font-size: 9px; letter-spacing: 3.5px; text-transform: uppercase; color: rgba(60, 110, 160, 0.7); margin-bottom: 4px; font-weight: 500; }
  .church-name-full { font-family: 'Cormorant Garamond', serif; font-size: 11.5px; color: rgba(80, 130, 180, 0.65); letter-spacing: 1.5px; margin-bottom: 18px; font-weight: 400; font-style: italic; }
  .front-eyebrow { font-family: 'Cormorant Garamond', serif; font-size: 11px; color: rgba(70, 125, 175, 0.75); letter-spacing: 4px; text-transform: uppercase; margin-bottom: 6px; font-weight: 500; }
  .circular-emblem { width: 100px; height: 100px; margin: 8px auto 16px; position: relative; display: flex; align-items: center; justify-content: center; }
  .circular-emblem .outer-ring { position: absolute; inset: 0; border-radius: 50%; border: 1.5px solid rgba(135, 175, 210, 0.55); background: radial-gradient(circle at 50% 40%, rgba(220, 230, 240, 0.7) 0%, rgba(180, 200, 220, 0.5) 60%, rgba(150, 180, 210, 0.3) 100%); }
  .circular-emblem .inner-ring { position: absolute; inset: 4px; border-radius: 50%; border: 0.5px solid rgba(135, 175, 210, 0.4); background: radial-gradient(circle at 50% 30%, rgba(255, 250, 235, 0.95) 0%, rgba(240, 225, 195, 0.7) 50%, rgba(200, 175, 130, 0.5) 100%); display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .circular-emblem .baptism-scene { width: 100%; height: 100%; position: relative; z-index: 2; }
  .front-title { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 700; color: ${t.primary}; letter-spacing: 2.5px; margin-bottom: 4px; text-transform: uppercase; }
  .front-subtitle { font-family: 'Great Vibes', cursive; font-size: 26px; color: ${t.secondary}; margin-bottom: 18px; font-weight: 400; letter-spacing: 1px; }
  .front-ornament-divider { width: 70px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; gap: 5px; }
  .front-ornament-divider .line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(135, 175, 210, 0.5), transparent); }
  .front-ornament-divider .diamond { width: 5px; height: 5px; background: rgba(135, 175, 210, 0.6); transform: rotate(45deg); }
  .front-honored-label { font-family: 'Inter', sans-serif; font-size: 8.5px; letter-spacing: 3px; text-transform: uppercase; color: rgba(70, 125, 175, 0.55); margin-bottom: 6px; font-weight: 500; }
  .front-name { font-family: 'Dancing Script', cursive; font-size: 26px; color: ${t.primary}; margin-bottom: 16px; font-weight: 600; line-height: 1.2; }
  .front-date-block { display: flex; align-items: center; justify-content: center; gap: 0; margin-top: 6px; }
  .front-date-item { padding: 0 14px; font-family: 'Cormorant Garamond', serif; font-size: 13px; color: rgba(70, 130, 180, 0.85); letter-spacing: 1.5px; }
  .front-date-divider { width: 1px; height: 24px; background: rgba(135, 175, 210, 0.4); }

  /* PROGRAM PANEL */
  .program-panel { background: radial-gradient(ellipse at 0% 0%, #fefdfb 0%, #fbf8f2 100%); padding: 26px 22px 24px 28px; display: flex; flex-direction: column; position: relative; }
  .program-panel::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(180deg, ${t.primary} 0%, ${t.secondary} 50%, ${t.primary} 100%); opacity: 0.7; }
  .program-header { text-align: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid ${t.primary}22; position: relative; }
  .program-header::after { content: '\\2726'; position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); background: #fbf8f2; padding: 0 8px; font-size: 14px; color: ${t.primary}80; line-height: 1; }
  .program-header-church { font-family: 'Inter', sans-serif; font-size: 8px; letter-spacing: 2.5px; text-transform: uppercase; color: ${t.primary}99; margin-bottom: 5px; font-weight: 500; }
  .program-header-title { font-family: 'Playfair Display', serif; font-size: 21px; color: ${t.text}; letter-spacing: 2px; font-weight: 700; }
  .program-header-subtitle { font-family: 'Great Vibes', cursive; font-size: 18px; color: ${t.secondary}cc; margin-top: 2px; font-weight: 400; }
  .program-items { flex: 1; display: flex; flex-direction: column; gap: 0; margin-top: 8px; }
  .program-item { display: flex; align-items: baseline; padding: 6.5px 0; border-bottom: 1px dotted ${t.primary}30; }
  .program-item:last-child { border-bottom: none; }
  .program-number { font-family: 'Playfair Display', serif; font-size: 11px; color: ${t.primary}73; width: 22px; flex-shrink: 0; font-style: italic; font-weight: 500; }
  .program-label { font-family: 'Inter', sans-serif; font-size: 10.5px; color: ${t.text}; letter-spacing: 1.2px; text-transform: uppercase; font-weight: 500; flex: 1; }
  .program-detail { font-family: 'Cormorant Garamond', serif; font-size: 11.5px; color: ${t.text}c0; font-style: italic; text-align: right; max-width: 155px; font-weight: 500; }
  .program-footer { text-align: center; margin-top: 14px; padding-top: 12px; border-top: 1px solid ${t.primary}30; position: relative; }
  .program-footer::before { content: '\\2726 \\2726 \\2726'; position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #fbf8f2; padding: 0 10px; font-size: 9px; color: ${t.primary}73; letter-spacing: 4px; line-height: 1; }
  .program-footer-text { font-family: 'Cormorant Garamond', serif; font-size: 10.5px; color: ${t.text}b3; font-style: italic; letter-spacing: 0.5px; line-height: 1.55; }

  /* HYMN PANEL */
  .hymn-panel { background: radial-gradient(ellipse at 100% 0%, #fefdfb 0%, #f8f5ed 100%); padding: 26px 28px 24px 22px; display: flex; flex-direction: column; position: relative; }
  .hymn-panel::after { content: ''; position: absolute; top: 0; right: 0; width: 4px; height: 100%; background: linear-gradient(180deg, ${t.primary} 0%, ${t.secondary} 50%, ${t.primary} 100%); opacity: 0.5; }
  .hymn-section { flex: 1; display: flex; flex-direction: column; }
  .hymn-block { margin-bottom: 12px; }
  .hymn-block:last-child { margin-bottom: 0; }
  .hymn-header { text-align: center; margin-bottom: 9px; padding-bottom: 7px; border-bottom: 1px solid ${t.primary}30; position: relative; }
  .hymn-header::after { content: '\\25C6'; position: absolute; bottom: -7px; left: 50%; transform: translateX(-50%); background: #f8f5ed; padding: 0 6px; font-size: 8px; color: ${t.primary}80; line-height: 1; }
  .hymn-number-label { font-family: 'Inter', sans-serif; font-size: 7.5px; letter-spacing: 2.5px; text-transform: uppercase; color: ${t.primary}8c; font-weight: 500; }
  .hymn-title { font-family: 'Playfair Display', serif; font-size: 15px; color: ${t.text}; font-weight: 600; margin-top: 2px; letter-spacing: 0.5px; }
  .hymn-verse { margin-bottom: 7px; }
  .hymn-verse-label { font-family: 'Inter', sans-serif; font-size: 7.5px; letter-spacing: 2px; text-transform: uppercase; color: ${t.primary}73; margin-bottom: 3px; font-weight: 500; }
  .hymn-line { font-family: 'Cormorant Garamond', serif; font-size: 12px; line-height: 1.6; color: ${t.text}; font-weight: 400; white-space: pre-line; }
  .hymn-divider { width: 30px; height: 1px; background: ${t.primary}38; margin: 6px auto; }
  .hymn-section-divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, ${t.primary}33, transparent); margin: 8px 0; position: relative; }
  .hymn-section-divider::before { content: '\\2726'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #f8f5ed; padding: 0 8px; font-size: 10px; color: ${t.primary}66; line-height: 1; }
  @media screen { html, body { background: #e5e7eb; display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 20px; width: auto; } .page { box-shadow: 0 4px 25px rgba(0,0,0,0.18); border-radius: 2px; } }
</style>
</head>
<body>

<!-- PAGE 1: OUTSIDE -->
<div class="page">
  <div class="panel back-panel">
    <div class="back-frame-outer"></div>
    <div class="back-frame-inner"></div>
    <div class="back-content">
      <div class="back-eyebrow">Las Sagradas Escrituras</div>
      <div class="back-ornament"><div class="line"></div><div class="diamond"></div><div class="line"></div></div>
      <div class="back-scripture-ref">${data.scriptureRef}</div>
      <div class="back-scripture-text">${data.scriptureText}</div>
      <div class="back-scripture-cite">${data.scriptureCite}</div>
      <div class="back-divider-ornate"><div class="line"></div><div class="symbol">&#10022;</div><div class="line"></div></div>
      <div class="back-prophet-label">${data.prophetLabel}</div>
      <div class="back-prophet-quote">${data.prophetQuote}</div>
      <div class="back-prophet-name">${data.prophetName}</div>
      <div class="back-prophet-cite">${data.prophetCite}</div>
    </div>
  </div>

  <div class="panel front-panel">
    <svg class="floral-garland-top" viewBox="0 0 500 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="rgba(135, 175, 210, 0.55)" stroke-width="1.2">
        <path d="M 250 8 Q 240 15, 235 25 Q 232 35, 240 45 Q 250 55, 260 45 Q 268 35, 265 25 Q 260 15, 250 8" />
        <path d="M 220 50 Q 200 40, 180 45 Q 165 50, 150 40 Q 140 32, 130 38" />
        <path d="M 180 45 Q 175 30, 165 25 Q 155 22, 150 15" />
        <path d="M 150 40 Q 135 35, 120 40 Q 105 45, 90 38" />
        <path d="M 90 38 Q 80 30, 70 32 Q 60 35, 50 30" />
        <path d="M 280 50 Q 300 40, 320 45 Q 335 50, 350 40 Q 360 32, 370 38" />
        <path d="M 320 45 Q 325 30, 335 25 Q 345 22, 350 15" />
        <path d="M 350 40 Q 365 35, 380 40 Q 395 45, 410 38" />
        <path d="M 410 38 Q 420 30, 430 32 Q 440 35, 450 30" />
        <ellipse cx="180" cy="42" rx="4" ry="2" transform="rotate(-30 180 42)" fill="rgba(135, 175, 210, 0.4)"/>
        <ellipse cx="220" cy="48" rx="4" ry="2" transform="rotate(20 220 48)" fill="rgba(135, 175, 210, 0.4)"/>
        <ellipse cx="320" cy="42" rx="4" ry="2" transform="rotate(30 320 42)" fill="rgba(135, 175, 210, 0.4)"/>
        <ellipse cx="280" cy="48" rx="4" ry="2" transform="rotate(-20 280 48)" fill="rgba(135, 175, 210, 0.4)"/>
      </g>
    </svg>
    <div class="front-content">
      <div class="church-line">${data.churchLine}</div>
      <div class="church-name-full">${data.churchName}</div>
      <div class="front-eyebrow">${data.invitationText}</div>
      <div class="circular-emblem">
        <div class="outer-ring"></div>
        <div class="inner-ring">
          <svg class="baptism-scene" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="skyGrad2" cx="50%" cy="25%" r="65%">
                <stop offset="0%" stop-color="#fff4d8" stop-opacity="1"/>
                <stop offset="45%" stop-color="#f5e4b0" stop-opacity="0.85"/>
                <stop offset="100%" stop-color="#c9d8e8" stop-opacity="0.7"/>
              </radialGradient>
              <linearGradient id="waterGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#9bc4dc" stop-opacity="0.85"/>
                <stop offset="50%" stop-color="#6a9cbf" stop-opacity="0.9"/>
                <stop offset="100%" stop-color="#3a6f8f" stop-opacity="0.95"/>
              </linearGradient>
              <linearGradient id="johnRobe" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#a87d4a" stop-opacity="0.95"/>
                <stop offset="50%" stop-color="#7a5230" stop-opacity="0.95"/>
                <stop offset="100%" stop-color="#4a3015" stop-opacity="0.95"/>
              </linearGradient>
              <linearGradient id="christRobe" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#fdf6e3" stop-opacity="0.98"/>
                <stop offset="60%" stop-color="#f0e0c0" stop-opacity="0.95"/>
                <stop offset="100%" stop-color="#c9b890" stop-opacity="0.9"/>
              </linearGradient>
              <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#5a3a1f" stop-opacity="0.95"/>
                <stop offset="60%" stop-color="#7a5230" stop-opacity="0.9"/>
                <stop offset="100%" stop-color="#3a2010" stop-opacity="0.95"/>
              </linearGradient>
              <linearGradient id="mountGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#b8c5d4" stop-opacity="0.7"/>
                <stop offset="100%" stop-color="#8a9aab" stop-opacity="0.8"/>
              </linearGradient>
              <radialGradient id="foliageGrad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stop-color="#6a8f5a" stop-opacity="0.85"/>
                <stop offset="100%" stop-color="#3a5a2a" stop-opacity="0.9"/>
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#skyGrad2)"/>
            <path d="M 5 55 L 18 45 L 28 52 L 40 42 L 52 50 L 65 43 L 78 51 L 90 46 L 95 55 L 95 70 L 5 70 Z" fill="url(#mountGrad)" opacity="0.55"/>
            <g opacity="0.45" stroke="#f5d878" stroke-width="0.5" fill="none" stroke-linecap="round">
              <line x1="50" y1="5" x2="38" y2="22"/>
              <line x1="50" y1="5" x2="44" y2="22"/>
              <line x1="50" y1="5" x2="50" y2="22"/>
              <line x1="50" y1="5" x2="56" y2="22"/>
              <line x1="50" y1="5" x2="62" y2="22"/>
              <line x1="50" y1="5" x2="34" y2="24"/>
              <line x1="50" y1="5" x2="66" y2="24"/>
            </g>
            <g transform="translate(50, 11)">
              <circle cx="0" cy="0" r="6" fill="#fff8dc" opacity="0.4"/>
              <ellipse cx="0" cy="0" rx="4.5" ry="2.5" fill="#ffffff" opacity="0.98"/>
              <circle cx="3.8" cy="-0.5" r="1.5" fill="#ffffff" opacity="0.98"/>
              <path d="M 5.2 -0.3 L 6.2 0 L 5.2 0.3 Z" fill="#d4a040" opacity="0.95"/>
              <circle cx="4.2" cy="-0.7" r="0.2" fill="#3a2010" opacity="0.8"/>
              <path d="M -0.5 -0.5 Q -3 -2.5, -4.5 0 Q -3 1.8, -1 1 Z" fill="#f5f5f0" opacity="0.95"/>
              <path d="M -4 0 L -6 -1.2 L -5.5 0.3 L -6 1.2 Z" fill="#ffffff" opacity="0.95"/>
            </g>
            <g opacity="0.3" stroke="#fff5dc" stroke-width="0.6" fill="none">
              <path d="M 50 18 L 50 40"/>
              <path d="M 47 18 L 44 40"/>
              <path d="M 53 18 L 56 40"/>
            </g>
            <g>
              <path d="M 12 65 Q 11 50, 13 38 Q 14 28, 16 22 Q 17 20, 18 22 Q 17 30, 16 40 Q 15 52, 17 65 Z" fill="url(#trunkGrad)"/>
              <g opacity="0.5" stroke="#3a2010" stroke-width="0.3" fill="none">
                <path d="M 13 35 Q 14 45, 13 55"/>
                <path d="M 15 30 Q 16 40, 15 50"/>
              </g>
              <path d="M 16 28 Q 20 25, 24 24" stroke="url(#trunkGrad)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
              <path d="M 14 32 Q 10 30, 7 28" stroke="url(#trunkGrad)" stroke-width="1" fill="none" stroke-linecap="round"/>
              <ellipse cx="22" cy="22" rx="6" ry="5" fill="url(#foliageGrad)" opacity="0.85"/>
              <ellipse cx="14" cy="20" rx="5" ry="4" fill="url(#foliageGrad)" opacity="0.8"/>
              <ellipse cx="20" cy="16" rx="4" ry="3.5" fill="url(#foliageGrad)" opacity="0.85"/>
              <ellipse cx="10" cy="24" rx="3.5" ry="3" fill="url(#foliageGrad)" opacity="0.75"/>
              <g opacity="0.4" fill="#2a4a1a">
                <circle cx="22" cy="20" r="0.6"/>
                <circle cx="18" cy="22" r="0.5"/>
                <circle cx="13" cy="19" r="0.5"/>
                <circle cx="20" cy="24" r="0.5"/>
              </g>
              <path d="M 12 65 Q 10 68, 8 70" stroke="url(#trunkGrad)" stroke-width="0.8" fill="none" stroke-linecap="round"/>
              <path d="M 17 65 Q 19 68, 21 70" stroke="url(#trunkGrad)" stroke-width="0.8" fill="none" stroke-linecap="round"/>
            </g>
            <path d="M 5 68 Q 25 65, 50 67 Q 75 69, 95 66 L 95 95 L 5 95 Z" fill="url(#waterGrad2)"/>
            <g opacity="0.5" stroke="#ffffff" stroke-width="0.35" fill="none">
              <path d="M 8 71 Q 14 70, 20 71"/>
              <path d="M 75 73 Q 81 72, 87 73"/>
              <path d="M 12 76 Q 20 75, 28 76"/>
              <path d="M 65 78 Q 73 77, 81 78"/>
              <path d="M 18 82 Q 28 81, 38 82"/>
              <path d="M 55 84 Q 65 83, 75 84"/>
              <path d="M 8 88 Q 20 87, 32 88"/>
              <path d="M 60 90 Q 72 89, 84 90"/>
              <path d="M 15 92 Q 30 91, 45 92"/>
              <path d="M 55 93 Q 70 92, 85 93"/>
            </g>
            <g>
              <path d="M 38 33 Q 36 30, 40 28 Q 44 27, 48 28 Q 52 30, 50 33 L 51 38 Q 51 42, 49 44 L 39 44 Q 37 42, 37 38 Z" fill="#3a2010" opacity="0.92"/>
              <ellipse cx="44" cy="38" rx="3.5" ry="4" fill="#e8c8a0" opacity="0.95"/>
              <path d="M 41 41 Q 44 45, 47 41 L 46 44 Q 44 46, 42 44 Z" fill="#3a2010" opacity="0.85"/>
              <path d="M 38 42 L 36 50 L 34 62 L 32 70 L 38 72 L 42 60 L 44 70 L 50 70 L 48 60 L 50 72 L 56 70 L 54 62 L 52 50 L 50 42 Z" fill="url(#christRobe)"/>
              <g opacity="0.35" stroke="#8a7050" stroke-width="0.4" fill="none">
                <path d="M 40 44 Q 39 55, 38 68"/>
                <path d="M 44 44 Q 44 55, 44 68"/>
                <path d="M 48 44 Q 49 55, 50 68"/>
              </g>
              <ellipse cx="44" cy="52" rx="2" ry="1.5" fill="#e8c8a0" opacity="0.95"/>
            </g>
            <g>
              <path d="M 60 32 Q 58 30, 62 28 Q 66 27, 70 28 Q 74 30, 72 33 L 71 36 L 61 36 Z" fill="#2a1a08" opacity="0.92"/>
              <ellipse cx="66" cy="36" rx="3.5" ry="4" fill="#d4a878" opacity="0.95"/>
              <path d="M 63 39 Q 66 43, 69 39 L 68 42 Q 66 44, 64 42 Z" fill="#2a1a08" opacity="0.85"/>
              <path d="M 60 40 L 58 50 L 56 62 L 54 70 L 60 72 L 64 60 L 66 70 L 72 72 L 70 70 L 72 60 L 74 50 L 72 40 Z" fill="url(#johnRobe)"/>
              <g opacity="0.4" fill="#3a2010">
                <path d="M 62 44 L 64 46 L 62 48 Z"/>
                <path d="M 68 46 L 70 48 L 68 50 Z"/>
                <path d="M 60 52 L 62 54 L 60 56 Z"/>
                <path d="M 70 54 L 72 56 L 70 58 Z"/>
                <path d="M 64 60 L 66 62 L 64 64 Z"/>
                <path d="M 58 58 L 60 60 L 58 62 Z"/>
              </g>
              <path d="M 72 42 Q 76 38, 78 32 Q 79 28, 78 24" stroke="#7a5230" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.95"/>
              <circle cx="78" cy="23" r="1.3" fill="#d4a878" opacity="0.95"/>
              <path d="M 78 22 L 78 18" stroke="#d4a878" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.95"/>
              <circle cx="78" cy="18" r="0.6" fill="#d4a878" opacity="0.95"/>
              <path d="M 60 44 Q 56 46, 52 50 Q 48 52, 46 52" stroke="#7a5230" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.95"/>
              <ellipse cx="46" cy="52" rx="1.5" ry="1.2" fill="#d4a878" opacity="0.95"/>
              <g opacity="0.6" stroke="#ffffff" stroke-width="0.4" fill="none">
                <path d="M 43 53 Q 46 54, 49 53"/>
                <path d="M 42 55 Q 46 56, 50 55"/>
              </g>
            </g>
            <g opacity="0.5" fill="#ffffff">
              <ellipse cx="38" cy="71" rx="2" ry="0.8"/>
              <ellipse cx="68" cy="71" rx="2" ry="0.8"/>
              <ellipse cx="44" cy="73" rx="3" ry="1"/>
              <ellipse cx="64" cy="73" rx="2.5" ry="0.9"/>
            </g>
            <g opacity="0.6" stroke="#5a7a3a" stroke-width="0.5" fill="none" stroke-linecap="round">
              <path d="M 6 70 L 6 64"/>
              <path d="M 8 70 L 9 65"/>
              <path d="M 90 70 L 90 65"/>
              <path d="M 92 70 L 91 64"/>
              <path d="M 4 72 L 4 67"/>
              <path d="M 94 72 L 94 67"/>
            </g>
          </svg>
        </div>
      </div>
      <div class="front-title">${data.titleMain}</div>
      <div class="front-subtitle">${data.titleSub}</div>
      <div class="front-ornament-divider"><div class="line"></div><div class="diamond"></div><div class="line"></div></div>
      <div class="front-honored-label">${data.honoredLabel}</div>
      <div class="front-name">${data.name}</div>
      <div class="front-date-block">
        <div class="front-date-item">${data.day}</div>
        <div class="front-date-divider"></div>
        <div class="front-date-item">${data.dateText}</div>
      </div>
    </div>
    <svg class="floral-garland-bottom" viewBox="0 0 500 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="rgba(135, 175, 210, 0.55)" stroke-width="1.2">
        <path d="M 250 8 Q 240 15, 235 25 Q 232 35, 240 45 Q 250 55, 260 45 Q 268 35, 265 25 Q 260 15, 250 8" />
        <path d="M 220 50 Q 200 40, 180 45 Q 165 50, 150 40 Q 140 32, 130 38" />
        <path d="M 180 45 Q 175 30, 165 25 Q 155 22, 150 15" />
        <path d="M 150 40 Q 135 35, 120 40 Q 105 45, 90 38" />
        <path d="M 90 38 Q 80 30, 70 32 Q 60 35, 50 30" />
        <path d="M 280 50 Q 300 40, 320 45 Q 335 50, 350 40 Q 360 32, 370 38" />
        <path d="M 320 45 Q 325 30, 335 25 Q 345 22, 350 15" />
        <path d="M 350 40 Q 365 35, 380 40 Q 395 45, 410 38" />
        <path d="M 410 38 Q 420 30, 430 32 Q 440 35, 450 30" />
        <ellipse cx="180" cy="42" rx="4" ry="2" transform="rotate(-30 180 42)" fill="rgba(135, 175, 210, 0.4)"/>
        <ellipse cx="220" cy="48" rx="4" ry="2" transform="rotate(20 220 48)" fill="rgba(135, 175, 210, 0.4)"/>
        <ellipse cx="320" cy="42" rx="4" ry="2" transform="rotate(30 320 42)" fill="rgba(135, 175, 210, 0.4)"/>
        <ellipse cx="280" cy="48" rx="4" ry="2" transform="rotate(-20 280 48)" fill="rgba(135, 175, 210, 0.4)"/>
      </g>
    </svg>
  </div>
</div>

<!-- PAGE 2: INSIDE -->
<div class="page">
  <div class="panel program-panel">
    <div class="program-header">
      <div class="program-header-church">${data.churchLine} ${data.churchName}</div>
      <div class="program-header-title">${data.programTitle}</div>
      <div class="program-header-subtitle">${data.programSubtitle}</div>
    </div>
    <div class="program-items">
      ${data.program.map((item, i) => `
      <div class="program-item">
        <div class="program-number">${romanNumerals[i] || (i+1)}</div>
        <div class="program-label">${item.label}</div>
        <div class="program-detail">${item.detail}</div>
      </div>
      `).join('')}
    </div>
    <div class="program-footer">
      <div class="program-footer-text">${data.footerScripture}<br><strong style="color: ${t.text}d9; font-style: normal;">${data.footerCite}</strong></div>
    </div>
  </div>

  <div class="panel hymn-panel">
    <div class="hymn-section">
      ${data.hymns.map((hymn, hi) => `
      <div class="hymn-block">
        <div class="hymn-header">
          <div class="hymn-number-label">Himno No. ${hymn.number}</div>
          <div class="hymn-title">${hymn.title}</div>
        </div>
        ${hymn.verses.map((verse, vi) => `
        <div class="hymn-verse">
          <div class="hymn-verse-label">${verse.label}</div>
          <div class="hymn-line">${verse.content}</div>
        </div>
        ${vi < hymn.verses.length - 1 ? '<div class="hymn-divider"></div>' : ''}
        `).join('')}
      </div>
      ${hi < data.hymns.length - 1 ? '<div class="hymn-section-divider"></div>' : ''}
      `).join('')}
    </div>
  </div>
</div>

</body>
</html>`
  }

  const handleDownloadHTML = () => {
    const html = generateHTML()
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bautismo_${data.name.toLowerCase().replace(/\s+/g, '_')}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDownloadPDF = async () => {
    setIsGenerating(true)
    try {
      const html = generateHTML()
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `bautismo_${data.name.toLowerCase().replace(/\s+/g, '_')}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      // Open print dialog
      setTimeout(() => {
        if (previewRef.current?.contentWindow) {
          previewRef.current.contentWindow.print()
        }
      }, 500)
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePrintPDF = () => {
    if (previewRef.current?.contentWindow) {
      previewRef.current.contentWindow.print()
    }
  }

  // Update preview
  useEffect(() => {
    if (previewRef.current) {
      const doc = previewRef.current.contentDocument
      if (doc) {
        doc.open()
        doc.write(generateHTML())
        doc.close()
      }
    }
  }, [data])

  const tabs = [
    { id: 'content' as const, label: 'Contenido', icon: Type },
    { id: 'design' as const, label: 'Diseno', icon: Palette },
    { id: 'preview' as const, label: 'Vista Previa', icon: Eye }
  ]

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-slate-800">
              Editor del Folleto de Bautismo
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Personaliza todo el contenido y descarga tu folleto
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handlePrintPDF}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              Imprimir PDF
            </button>
            <button
              onClick={handleDownloadHTML}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 transition"
            >
              <Download className="w-4 h-4" />
              Descargar HTML
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 border-t border-slate-100">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'content' && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Editor Form */}
            <div className="space-y-6">
              {/* Portada Section */}
              <section className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-5">
                <h2 className="font-serif text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Portada
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Nombre del bautizado</label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={e => update('name', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Dia</label>
                      <input
                        type="text"
                        value={data.day}
                        onChange={e => update('day', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Fecha completa</label>
                      <input
                        type="text"
                        value={data.dateText}
                        onChange={e => update('dateText', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Texto de invitacion</label>
                    <input
                      type="text"
                      value={data.invitationText}
                      onChange={e => update('invitationText', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Titulo principal</label>
                      <input
                        type="text"
                        value={data.titleMain}
                        onChange={e => update('titleMain', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Subtitulo</label>
                      <input
                        type="text"
                        value={data.titleSub}
                        onChange={e => update('titleSub', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Contraportada - Scripture */}
              <section className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-5">
                <h2 className="font-serif text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  Contraportada - Escritura y Profeta
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Referencia de escritura</label>
                    <input
                      type="text"
                      value={data.scriptureRef}
                      onChange={e => update('scriptureRef', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Texto de escritura</label>
                    <textarea
                      value={data.scriptureText}
                      onChange={e => update('scriptureText', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-y"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Cita biblica</label>
                    <input
                      type="text"
                      value={data.scriptureCite}
                      onChange={e => update('scriptureCite', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Etiqueta del profeta</label>
                    <input
                      type="text"
                      value={data.prophetLabel}
                      onChange={e => update('prophetLabel', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Cita del profeta</label>
                    <textarea
                      value={data.prophetQuote}
                      onChange={e => update('prophetQuote', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-y"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Nombre del profeta</label>
                      <input
                        type="text"
                        value={data.prophetName}
                        onChange={e => update('prophetName', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Cargo</label>
                      <input
                        type="text"
                        value={data.prophetCite}
                        onChange={e => update('prophetCite', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Program and Hymns */}
            <div className="space-y-6">
              {/* Program Section */}
              <section className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-slate-600" />
                    Programa del Servicio
                  </h2>
                  <button
                    onClick={addProgramItem}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Agregar
                  </button>
                </div>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {data.program.map((item, i) => (
                    <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                      <span className="text-xs font-mono text-slate-400 w-6 flex-shrink-0">{i + 1}</span>
                      <input
                        type="text"
                        value={item.label}
                        onChange={e => updateProgramItem(item.id, 'label', e.target.value)}
                        placeholder="Etiqueta"
                        className="flex-1 px-2 py-1.5 rounded border border-slate-300 text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                      <input
                        type="text"
                        value={item.detail}
                        onChange={e => updateProgramItem(item.id, 'detail', e.target.value)}
                        placeholder="Himno o detalle"
                        className="flex-1 px-2 py-1.5 rounded border border-slate-300 text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                      <button
                        onClick={() => removeProgramItem(item.id)}
                        className="p-1.5 rounded text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Hymns Section */}
              <section className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-5">
                <h2 className="font-serif text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Music className="w-5 h-5 text-rose-600" />
                  Himnos
                </h2>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                  {data.hymns.map(hymn => (
                    <div key={hymn.id} className="p-3 rounded-lg bg-rose-50/50 border border-rose-100">
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <input
                          type="text"
                          value={hymn.number}
                          onChange={e => updateHymn(hymn.id, 'number', e.target.value)}
                          placeholder="No."
                          className="px-2 py-1.5 rounded border border-slate-300 text-xs focus:ring-1 focus:ring-rose-500 focus:border-rose-500 outline-none"
                        />
                        <input
                          type="text"
                          value={hymn.title}
                          onChange={e => updateHymn(hymn.id, 'title', e.target.value)}
                          placeholder="Titulo del himno"
                          className="col-span-2 px-2 py-1.5 rounded border border-slate-300 text-xs focus:ring-1 focus:ring-rose-500 focus:border-rose-500 outline-none"
                        />
                      </div>
                      {hymn.verses.map(verse => (
                        <div key={verse.id} className="mb-2 p-2 bg-white rounded border border-slate-200">
                          <div className="flex items-center gap-2 mb-1">
                            <input
                              type="text"
                              value={verse.label}
                              onChange={e => updateVerse(hymn.id, verse.id, 'label', e.target.value)}
                              placeholder="Estrofa 1"
                              className="w-24 px-2 py-1 rounded border border-slate-300 text-xs focus:ring-1 focus:ring-rose-500 focus:border-rose-500 outline-none"
                            />
                            <button
                              onClick={() => removeVerse(hymn.id, verse.id)}
                              className="ml-auto p-1 rounded text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <textarea
                            value={verse.content}
                            onChange={e => updateVerse(hymn.id, verse.id, 'content', e.target.value)}
                            placeholder="Letra del himno..."
                            rows={3}
                            className="w-full px-2 py-1.5 rounded border border-slate-300 text-xs focus:ring-1 focus:ring-rose-500 focus:border-rose-500 outline-none resize-y"
                          />
                        </div>
                      ))}
                      <button
                        onClick={() => addVerse(hymn.id)}
                        className="w-full mt-1 py-1.5 rounded border border-dashed border-rose-300 text-rose-600 text-xs font-medium hover:bg-rose-50"
                      >
                        + Agregar estrofa
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'design' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <section className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-6">
              <h2 className="font-serif text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-600" />
                Tema de Color
              </h2>
              <p className="text-sm text-slate-500 mb-4">Elige el esquema de color para tu folleto</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {colorThemes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => update('themeId', t.id)}
                    className={`p-4 rounded-xl border-2 transition text-left ${
                      data.themeId === t.id
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full" style={{ background: t.primary }} />
                      <div className="w-6 h-6 rounded-full" style={{ background: t.secondary }} />
                      <div className="w-6 h-6 rounded-full" style={{ background: t.accent }} />
                    </div>
                    <div className="font-serif font-bold text-sm text-slate-800">{t.name}</div>
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-6">
              <h2 className="font-serif text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Type className="w-5 h-5 text-slate-600" />
                Textos del Encabezado
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Linea superior (La Iglesia de)</label>
                  <input
                    type="text"
                    value={data.churchLine}
                    onChange={e => update('churchLine', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Nombre completo de la Iglesia</label>
                  <input
                    type="text"
                    value={data.churchName}
                    onChange={e => update('churchName', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Titulo del programa</label>
                    <input
                      type="text"
                      value={data.programTitle}
                      onChange={e => update('programTitle', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Subtitulo del programa</label>
                    <input
                      type="text"
                      value={data.programSubtitle}
                      onChange={e => update('programSubtitle', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Escritura del pie de pagina</label>
                  <textarea
                    value={data.footerScripture}
                    onChange={e => update('footerScripture', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Cita del pie de pagina</label>
                  <input
                    type="text"
                    value={data.footerCite}
                    onChange={e => update('footerCite', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </section>

            <div className="bg-blue-50 rounded-xl p-4 ring-1 ring-blue-100">
              <p className="text-sm text-blue-800">
                <strong>Consejo:</strong> Vas a la pestana &quot;Vista Previa&quot; para ver como queda tu folleto en tiempo real. Cuando estes listo, usa los botones de arriba para imprimir como PDF o descargar el HTML.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-3">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-serif text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  Vista Previa en Tiempo Real
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrintPDF}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 text-white text-xs font-medium hover:bg-blue-700"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Imprimir
                  </button>
                  <button
                    onClick={handleDownloadHTML}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-700 text-white text-xs font-medium hover:bg-slate-800"
                  >
                    <Download className="w-3.5 h-3.5" />
                    HTML
                  </button>
                </div>
              </div>
              <div className="overflow-auto bg-slate-200 rounded-lg p-3" style={{ maxHeight: '75vh' }}>
                <iframe
                  ref={previewRef}
                  title="Vista previa del folleto"
                  className="w-full bg-white rounded shadow-lg"
                  style={{ minHeight: '70vh', border: 'none' }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">
                Al imprimir, selecciona: tamano Carta, orientacion Horizontal, a doble cara, escala 100%
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs">
          Editor de Folletos de Bautismo &middot; La Iglesia de Jesucristo de los Santos de los Ultimos Dias
        </div>
      </footer>
    </div>
  )
}
