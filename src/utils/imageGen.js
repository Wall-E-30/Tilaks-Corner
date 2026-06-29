import { useMemo } from 'react'
import { portfolioData } from './portfolioData'

function generateCategoryImages(categoryIndex) {
  const category = portfolioData[categoryIndex] || portfolioData[0]
  const items = category.items

  const palettes = [
    // 1. About Me - Vibrant Blues/Purples (Analogous, Trust, Identity)
    [
      ['#00c6ff', '#0072ff'],
      ['#0072ff', '#5f72bd'],
      ['#3f51b5', '#6a11cb']
    ],
    // 2. Skills & Achievements - Vibrant Cyans/Teals/Emeralds (Logic, Logic flow)
    [
      ['#11998e', '#38ef7d'],
      ['#00b4d8', '#0077b6'],
      ['#02aab0', '#00cdac'],
      ['#0575e6', '#00f260'],
      ['#3a7bd5', '#3a6073'],
      ['#1fa2ff', '#12d6df']
    ],
    // 3. Projects - Vibrant Sunset Warm Oranges/Reds (Energy, Building, Saturated)
    [
      ['#ff5e62', '#ff9966'],
      ['#f857a6', '#ff5858'],
      ['#ff9966', '#ff5e62'],
      ['#f12711', '#f5af19']
    ],
    // 4. Hackathons - Vibrant Purples/Pinks/Magentas (Action, High Adrenaline)
    [
      ['#6a11cb', '#2575fc'],
      ['#8e2de2', '#4a00e0'],
      ['#fc00ff', '#00dbde'],
      ['#ec008c', '#fc6767']
    ],
    // 5. Creative Portfolio - Golds/Aesthetic Warm Ambers (Aesthetics, Balance)
    [
      ['#ffe259', '#ffa751'],
      ['#f12711', '#f5af19'],
      ['#e15309', '#ad1457'],
      ['#f3904f', '#3b4371']
    ]
  ]
  const palette = palettes[categoryIndex] || palettes[0]

  return items.map((item, i) => {
    const canvas = document.createElement('canvas')
    // Set aspect ratio to portrait to fit the tall cylinder panels
    canvas.width = 600
    canvas.height = 760
    const ctx = canvas.getContext('2d')
    const [startColor, endColor] = palette[i % palette.length]

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
    grad.addColorStop(0, startColor)
    grad.addColorStop(1, endColor)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add radial overlay glow
    const radGrad = ctx.createRadialGradient(
      canvas.width * 0.5, canvas.height * 0.4, 100,
      canvas.width * 0.5, canvas.height * 0.5, canvas.height * 0.6
    )
    radGrad.addColorStop(0, 'rgba(255, 255, 255, 0.06)')
    radGrad.addColorStop(1, 'rgba(0, 0, 0, 0.25)')
    ctx.fillStyle = radGrad
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Tech grid patterns
    ctx.globalAlpha = 0.05
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 1
    for (let x = 0; x < canvas.width; x += 50) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y < canvas.height; y += 50) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Concentric abstract background circles
    ctx.globalAlpha = 0.04
    for (let j = 0; j < 3; j++) {
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, 100 + j * 90, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Large background index watermark
    ctx.globalAlpha = 0.08
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 220px "Playfair Display", Georgia, serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(String(i + 1).padStart(2, '0'), canvas.width / 2, canvas.height / 2 - 20)

    // Content Drawing
    ctx.globalAlpha = 1.0

    // Top tag
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 12px "Inter", sans-serif'
    ctx.letterSpacing = '3px'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText(category.name.toUpperCase(), canvas.width / 2, 45)

    // Draw card border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.roundRect(25, 25, canvas.width - 50, canvas.height - 50, 16)
    ctx.stroke()

    // Title
    ctx.font = 'bold 32px "Inter", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(item.title, canvas.width / 2, 110)

    // Separator line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(canvas.width * 0.2, 175)
    ctx.lineTo(canvas.width * 0.8, 175)
    ctx.stroke()

    // Subtitle
    ctx.font = 'italic 18px "Playfair Display", Georgia, serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
    ctx.textAlign = 'center'
    ctx.fillText(item.subtitle, canvas.width / 2, 195)

    // Description text wrapping
    ctx.font = '400 16px "Inter", sans-serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
    ctx.textAlign = 'center'
    
    const descYStart = 260
    const descWidth = canvas.width - 120
    const descLineHeight = 24
    wrapText(ctx, item.description, canvas.width / 2, descYStart, descWidth, descLineHeight)

    // Tech details badge background & text
    if (item.details) {
      ctx.font = '500 13px "Inter", sans-serif'
      const detailsMetrics = ctx.measureText(item.details)
      const badgeWidth = Math.min(canvas.width - 100, detailsMetrics.width + 30)
      const badgeHeight = 36
      const badgeY = canvas.height - 110

      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.beginPath()
      ctx.roundRect((canvas.width - badgeWidth) / 2, badgeY, badgeWidth, badgeHeight, 18)
      ctx.fill()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.stroke()

      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // If details text is too long, draw it slightly smaller or truncated
      if (detailsMetrics.width > canvas.width - 120) {
        ctx.font = '500 11px "Inter", sans-serif'
      }
      ctx.fillText(item.details, canvas.width / 2, badgeY + badgeHeight / 2)
    }

    return canvas.toDataURL('image/jpeg', 0.9)
  })
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ')
  let line = ''
  let currentY = y

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' '
    const metrics = ctx.measureText(testLine)
    const testWidth = metrics.width
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY)
      line = words[n] + ' '
      currentY += lineHeight
    } else {
      line = testLine
    }
  }
  ctx.fillText(line, x, currentY)
  return currentY
}

function shiftColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount))
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount))
  return `rgb(${r},${g},${b})`
}

export function useCategoryImages(categoryIndex) {
  return useMemo(() => generateCategoryImages(categoryIndex), [categoryIndex])
}
