export default function Header({ onAboutClick, currentPage }) {
  return (
    <header className="header">
      <a href="#" onClick={(e) => { e.preventDefault(); onAboutClick(); }}>
        Tilak
      </a>
      <span> is a developer from India.</span>
    </header>
  )
}
