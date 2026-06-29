export default function AboutPage({ contactOpen, onToggleContact }) {
  const year = new Date().getFullYear()
  const now = new Date()
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata'
  })

  return (
    <div className="about-page">
      <div className="about-page__inner">
        <div className="about-page__label">Profile</div>
        <div className="about-page__content">
          <div className="about-page__bio">
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--color-black)' }}>Tilak</h3>
            <div style={{ fontSize: '15px', fontStyle: 'italic', marginBottom: '16px', opacity: 0.85, color: 'var(--color-text)' }}>
              Third-Year Computer Science Student | Full-Stack Developer
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
              A dedicated computer science student with a strong foundation in software engineering, full-stack web development, and database management. Experienced in building scalable applications, tackling real-world automation challenges through hackathons, and integrating AI/ML technologies into practical web solutions.
            </p>
          </div>

          <div className="about-page__contact-list">
            <div className="about-page__contact-row">
              <span className="about-page__contact-label">Email</span>
              <span className="about-page__contact-value">
                <a href="mailto:hello@tilak.dev">hello@tilak.dev</a>
              </span>
            </div>
            <div className="about-page__contact-row">
              <span className="about-page__contact-label">GitHub</span>
              <span className="about-page__contact-value">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">github.com/tilak</a>
              </span>
            </div>
            <div className="about-page__contact-row">
              <span className="about-page__contact-label">LinkedIn</span>
              <span className="about-page__contact-value">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">linkedin.com/in/tilak</a>
              </span>
            </div>
          </div>

          <div className="about-page__footer">
            <div className="about-page__time">
              {timeStr} IST<br />
              <span style={{ opacity: 0.6 }}>Designed &amp; Developed by Tilak</span>
            </div>
            <div className="about-page__copyright">
              ©{year}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
