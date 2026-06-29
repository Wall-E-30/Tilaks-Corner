import { useMemo } from 'react'

// Generate project images procedurally
function generateCategoryImages(categoryIndex) {
  const palettes = [
    // Projects - blues/teals
    ['#1a3a5c', '#2a5a8c', '#1a4a6c', '#0d3b5e', '#245b82', '#1e4d70'],
    // Experiments - purples/magentas
    ['#3a1a5c', '#5a2a8c', '#4a1a6c', '#3d0d5e', '#5b2482', '#4d1e70'],
    // Design - warm oranges/golds
    ['#5c3a1a', '#8c5a2a', '#6c4a1a', '#5e3d0d', '#825b24', '#704d1e'],
  ]
  const palette = palettes[categoryIndex] || palettes[0]

  const labels = [
    ['Aion Platform', 'PRATYAKSHA', 'Neural Forge', 'Pixel Engine', 'Quantum Dash', 'Cipher Proto'],
    ['WebGL Waves', 'Shader Art', 'Particle Sim', 'Ray Marcher', 'Fluid Dynamics', 'Fractal Gen'],
    ['Brand System', 'UI Kit', 'Motion Design', 'Type Study', 'Color Theory', 'Layout Grid'],
  ]

  return palette.map((color, i) => {
    const canvas = document.createElement('canvas')
    canvas.width = 900
    canvas.height = 600
    const ctx = canvas.getContext('2d')

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    grad.addColorStop(0, color)
    grad.addColorStop(0.5, shiftColor(color, 25))
    grad.addColorStop(1, shiftColor(color, -15))
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add radial glow
    const radGrad = ctx.createRadialGradient(
      canvas.width * 0.4, canvas.height * 0.4, 50,
      canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.6
    )
    radGrad.addColorStop(0, 'rgba(255,255,255,0.08)')
    radGrad.addColorStop(1, 'rgba(0,0,0,0.15)')
    ctx.fillStyle = radGrad
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Geometric decorations
    ctx.globalAlpha = 0.06
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 1

    // Circles
    for (let j = 0; j < 4; j++) {
      ctx.beginPath()
      ctx.arc(
        150 + (i * 127 + j * 183) % 600,
        100 + (i * 89 + j * 137) % 400,
        40 + j * 30,
        0, Math.PI * 2
      )
      ctx.stroke()
    }

    // Grid lines
    ctx.globalAlpha = 0.03
    for (let x = 0; x < canvas.width; x += 60) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y < canvas.height; y += 60) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Project number
    ctx.globalAlpha = 0.07
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 180px "Playfair Display", Georgia, serif'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'bottom'
    ctx.fillText(String(i + 1).padStart(2, '0'), canvas.width - 40, canvas.height - 20)

    // Label
    ctx.globalAlpha = 0.3
    ctx.font = '500 22px "Inter", sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillText(labels[categoryIndex]?.[i] || `Project ${i + 1}`, 40, 30)

    ctx.globalAlpha = 1

    return canvas.toDataURL('image/jpeg', 0.88)
  })
}

function shiftColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount))
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount))
  return `rgb(${r},${g},${b})`
}

// Hook to get images for a category
export function useCategoryImages(categoryIndex) {
  return useMemo(() => generateCategoryImages(categoryIndex), [categoryIndex])
}
