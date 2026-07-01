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

export function generateCategoryHeadingImages() {
  const headings = [
    { title: 'ABOUT ME', subtitle: 'Personal Bio & Vision' },
    { title: 'SKILLS & ACHIEVEMENTS', subtitle: 'Core Competencies' },
    { title: 'FEATURED PROJECTS', subtitle: 'Interactive Works' },
    { title: 'HACKATHONS', subtitle: 'Competition History' },
    { title: 'CREATIVE PORTFOLIO', subtitle: 'Media & Creative' }
  ]

  const palettes = [
    ['#00c6ff', '#0072ff'], // About Me
    ['#11998e', '#38ef7d'], // Skills
    ['#ff5e62', '#ff9966'], // Projects
    ['#6a11cb', '#2575fc'], // Hackathons
    ['#ffe259', '#ffa751']  // Creative
  ]

  return headings.map((item, i) => {
    const canvas = document.createElement('canvas')
    canvas.width = 600
    canvas.height = 760
    const ctx = canvas.getContext('2d')
    const [startColor, endColor] = palettes[i]

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
    radGrad.addColorStop(0, 'rgba(255, 255, 255, 0.15)')
    radGrad.addColorStop(1, 'rgba(0, 0, 0, 0.45)')
    ctx.fillStyle = radGrad
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Grid pattern
    ctx.globalAlpha = 0.08
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 1.5
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
    ctx.globalAlpha = 1.0

    // Draw unique category-specific abstract visual artwork (background images)
    if (i === 0) {
      // ABOUT ME: Intersecting orbital paths & floating particles
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, 140, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, 220, 0, Math.PI * 2)
      ctx.stroke()
      
      // Floating glowing rings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.beginPath()
      ctx.ellipse(canvas.width / 2, canvas.height / 2, 280, 100, Math.PI / 6, 0, Math.PI * 2)
      ctx.stroke()

      // Dotted glowing points
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
      for (let p = 0; p < 12; p++) {
        ctx.beginPath()
        ctx.arc(120 + p * 40 + Math.sin(p) * 15, 150 + p * 45, 3 + (p % 4), 0, Math.PI * 2)
        ctx.fill()
      }
    } else if (i === 1) {
      // SKILLS: Neural net / connection nodes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1.5
      const points = [
        { x: 120, y: 150 }, { x: 480, y: 160 }, { x: 180, y: 300 },
        { x: 420, y: 280 }, { x: 150, y: 460 }, { x: 450, y: 480 },
        { x: 220, y: 620 }, { x: 380, y: 600 }, { x: 300, y: 380 }
      ]
      ctx.beginPath()
      for (let p = 0; p < points.length; p++) {
        for (let q = p + 1; q < points.length; q++) {
          const dist = Math.hypot(points[p].x - points[q].x, points[p].y - points[q].y)
          if (dist < 220) {
            ctx.moveTo(points[p].x, points[p].y)
            ctx.lineTo(points[q].x, points[q].y)
          }
        }
      }
      ctx.stroke()

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
      points.forEach(pt => {
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2)
        ctx.fill()
      })
    } else if (i === 2) {
      // PROJECTS: Clean layout grid and layered screen shapes
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.beginPath()
      ctx.roundRect(80, 160, 440, 160, 16)
      ctx.fill()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.stroke()

      ctx.beginPath()
      ctx.roundRect(140, 480, 320, 180, 16)
      ctx.fill()
      ctx.stroke()

      // Drawing code-like lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 4
      for (let lineY = 510; lineY < 630; lineY += 25) {
        ctx.beginPath()
        ctx.moveTo(170, lineY)
        ctx.lineTo(170 + Math.random() * 180 + 60, lineY)
        ctx.stroke()
      }
    } else if (i === 3) {
      // HACKATHONS: Fast sine waves / heartbeats representing momentum
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 3
      ctx.beginPath()
      for (let x = 30; x < canvas.width - 30; x += 8) {
        const y = 380 + Math.sin(x * 0.04) * 110 * Math.sin(x * 0.005)
        if (x === 30) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)'
      ctx.beginPath()
      for (let x = 30; x < canvas.width - 30; x += 8) {
        const y = 410 + Math.cos(x * 0.03 + 1.5) * 80
        if (x === 30) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    } else if (i === 4) {
      // CREATIVE: Shutter aperture geometry & light rays
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let r = 0; r < 12; r++) {
        const angle = (r / 12) * Math.PI * 2
        ctx.moveTo(canvas.width / 2, canvas.height / 2)
        ctx.lineTo(canvas.width / 2 + Math.cos(angle) * 320, canvas.height / 2 + Math.sin(angle) * 320)
      }
      ctx.stroke()

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)'
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, 160, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    }

    // Large background watermark index
    ctx.globalAlpha = 0.09
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 280px "Playfair Display", Georgia, serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(String(i + 1).padStart(2, '0'), canvas.width / 2, canvas.height / 2 - 40)
    ctx.globalAlpha = 1.0

    // Draw card border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.roundRect(30, 30, canvas.width - 60, canvas.height - 60, 20)
    ctx.stroke()

    // Frosted Glassmorphism center card to guarantee extreme text readability
    const cardW = 480
    const cardH = 260
    const cardX = (canvas.width - cardW) / 2
    const cardY = (canvas.height - cardH) / 2 - 10

    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)' // Dark translucent overlay
    ctx.beginPath()
    ctx.roundRect(cardX, cardY, cardW, cardH, 16)
    ctx.fill()
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)' // Delicate border
    ctx.lineWidth = 1.5
    ctx.stroke()

    // Title wrapping/displaying inside the card
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    
    // Split title into words if it's too long
    ctx.font = '900 40px "Inter", sans-serif'
    ctx.textBaseline = 'middle'
    
    const words = item.title.split(' ')
    const cardCenterY = cardY + cardH / 2 - 15

    if (words.length > 1) {
      // Draw stacked title
      ctx.fillText(words[0], canvas.width / 2, cardCenterY - 24)
      if (words.length > 2) {
        ctx.fillText(words.slice(1).join(' '), canvas.width / 2, cardCenterY + 24)
      } else {
        ctx.fillText(words[1], canvas.width / 2, cardCenterY + 24)
      }
    } else {
      ctx.fillText(item.title, canvas.width / 2, cardCenterY)
    }

    // Subtitle inside the card
    ctx.font = 'italic 18px "Playfair Display", Georgia, serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
    ctx.fillText(item.subtitle, canvas.width / 2, cardY + cardH - 55)

    // Category number label at top of the panel
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
    ctx.font = 'bold 13px "Inter", sans-serif'
    ctx.letterSpacing = '4px'
    ctx.textBaseline = 'top'
    ctx.fillText(`SECTION 0${i + 1}`, canvas.width / 2, 65)

    return canvas.toDataURL('image/jpeg', 0.95)
  })
}

export function useCategoryHeadingImages() {
  return useMemo(() => generateCategoryHeadingImages(), [])
}
