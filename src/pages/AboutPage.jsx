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
            Based in India.
            Full Stack Developer &amp; Creative
            Engineer. Building performant,
            scalable applications with a focus on
            user experience, real-time systems,
            and AI/ML integration.
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
