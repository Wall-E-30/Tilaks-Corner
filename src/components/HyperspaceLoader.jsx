export default function HyperspaceLoader() {
  return (
    <div
      role="status"
      aria-label="Loading sector telemetry"
      style={{
        minHeight: '65vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        fontFamily: 'var(--font-mono)',
        padding: '60px 24px',
        textAlign: 'center'
      }}
    >
      {/* Pulsing Stardust Gyroscope */}
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          border: '2px solid rgba(255, 200, 87, 0.25)',
          borderTopColor: 'var(--stardust-gold)',
          borderRightColor: 'var(--aurora-teal)',
          animation: 'hyperspaceSpin 1s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite',
          boxShadow: '0 0 24px rgba(255, 200, 87, 0.3)'
        }}
      />

      {/* Telemetry Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--stardust-gold)', fontSize: '0.78rem', letterSpacing: '0.12em' }}>
        <span>✦</span>
        <span>TUNING SUBSPACE TELEMETRY...</span>
        <span>✦</span>
      </div>

      <style>{`
        @keyframes hyperspaceSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
