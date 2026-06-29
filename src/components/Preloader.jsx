import { useEffect, useRef, useState } from 'react'

export default function Preloader({ loading, onComplete }) {
  const [percent, setPercent] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    let current = 0
    intervalRef.current = setInterval(() => {
      current += Math.random() * 8 + 2
      if (current >= 100) {
        current = 100
        clearInterval(intervalRef.current)
        setTimeout(() => onComplete(), 400)
      }
      setPercent(Math.round(current))
    }, 80)

    return () => clearInterval(intervalRef.current)
  }, [onComplete])

  return (
    <div className={`preloader ${!loading ? 'done' : ''}`}>
      <div className="preloader__rings">
        <div className="preloader__ring" />
        <div className="preloader__ring" />
        <div className="preloader__ring" />
      </div>
      <div className="preloader__percent">{percent}%</div>
    </div>
  )
}
