import { useEffect, useState } from 'react'

const links = [
  { id: 'home', href: '#home', label: '首页' },
  { id: 'project', href: '#project', label: '项目介绍' },
  { id: 'works', href: '#works', label: '作品集' },
  { id: 'about', href: '#about', label: '关于我' },
]

export default function PortfolioNav() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const updateActiveSection = () => {
      const focusLine = window.innerHeight * 0.38
      const visibleSections = links
        .map((link) => ({ id: link.id, rect: document.getElementById(link.id)?.getBoundingClientRect() }))
        .filter(({ rect }) => rect && rect.height > 0)
      const current = visibleSections.reduce((active, section) => (
        section.rect.top <= focusLine ? section.id : active
      ), 'home')
      setActiveSection(current)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [])

  return (
    <header className="floating-header">
      <nav className="pill-nav" aria-label="主导航">
        {links.map((link) => (
          <a
            className={activeSection === link.id ? 'is-active' : ''}
            href={link.href}
            aria-current={activeSection === link.id ? 'page' : undefined}
            onClick={() => setActiveSection(link.id)}
            key={link.href}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
