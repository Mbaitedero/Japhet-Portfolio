import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  CircleDot,
  Clipboard,
  Code2,
  Database,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  Menu,
  Moon,
  Network,
  Phone,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Sun,
  Terminal,
  X,
} from 'lucide-react'
import { cvFiles, profile, type Project, type ProjectCategory, type SkillGroup } from './data/profile'
import { supabase } from './lib/supabase'
import './Portfolio.css'
import japhetImg from './assets/japhet.png'

function GithubIcon({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.26.82-.57 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.79 2.81 1.27 3.5.97.11-.76.42-1.27.76-1.56-2.67-.3-5.47-1.31-5.47-5.84 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 3-.4c1.02 0 2.05.13 3 .4 2.29-1.53 3.3-1.21 3.3-1.21.66 1.64.24 2.86.12 3.16.77.83 1.24 1.88 1.24 3.17 0 4.54-2.81 5.53-5.49 5.83.43.36.81 1.08.81 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.22.69.83.57A12.04 12.04 0 0 0 24 12.29C24 5.78 18.63.5 12 .5z" />
    </svg>
  )
}

function LinkedinIcon({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

const Github = GithubIcon
const Linkedin = LinkedinIcon

const navigation = [
  { label: 'Accueil', id: 'accueil' },
  { label: 'À propos', id: 'a-propos' },
  { label: 'Compétences', id: 'competences' },
  { label: 'Expérience', id: 'experience' },
  { label: 'Projets', id: 'projets' },
  { label: 'Formation', id: 'formation' },
  { label: 'Contact', id: 'contact' },
]

const skillIcons: Record<string, typeof Database> = {
  pipeline: Network,
  model: Sparkles,
  deploy: Server,
  chart: BarChart3,
  database: Database,
  tools: Terminal,
}

function scrollToSection(id: string, closeMenu: () => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  closeMenu()
}

function Portfolio() {
  const [darkMode, setDarkMode] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState<'Tous' | ProjectCategory>('Tous')
  const [copied, setCopied] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const [formError, setFormError] = useState('')
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [showFloatingContact, setShowFloatingContact] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('light-theme', !darkMode)
  }, [darkMode])

  useEffect(() => {
    document.body.style.overflow = menuOpen || Boolean(selectedProject) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, selectedProject])

  useEffect(() => {
    const handleScroll = () => setShowFloatingContact(window.scrollY > window.innerHeight * 0.75)
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null)
        setMenuOpen(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKey)
    }
  }, [])

  const filteredProjects = useMemo(
    () => filter === 'Tous' ? profile.projects : profile.projects.filter((project) => project.category === filter),
    [filter],
  )

  const closeMenu = () => setMenuOpen(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') return

    setFormSent(false)
    setFormError('')
    setFormSubmitting(true)

    const cleanSubmission = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    }

    const { error: databaseError } = await supabase.from('contact_messages').insert(cleanSubmission)

    if (databaseError) {
      setFormError('Impossible d’enregistrer votre message pour le moment. Veuillez réessayer ou utiliser directement l’adresse email.')
      setFormSubmitting(false)
      return
    }

    const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
      body: cleanSubmission,
    })

    if (emailError) {
      setFormError('Une erreur est survenue, veuillez réessayer')
    } else {
      setFormSent(true)
      form.reset()
    }

    setFormSubmitting(false)
  }

  return (
    <div className="portfolio">
      <nav className="navbar" aria-label="Navigation principale">
        <div className="nav-container">
          <button className="brand" onClick={() => scrollToSection('accueil', closeMenu)} aria-label="Retour à l'accueil">
            <span className="brand-mark">JA</span>
            <span className="brand-name">Japhet<span>.</span></span>
          </button>
          <div className={`nav-menu ${menuOpen ? 'is-open' : ''}`}>
            <div className="nav-links">
              {navigation.map((item) => (
                <button key={item.id} onClick={() => scrollToSection(item.id, closeMenu)} className="nav-link">
                  {item.label}
                </button>
              ))}
            </div>
            <div className="nav-actions">
              <a className="button button-small button-outline" href={cvFiles[0].path} download>
                <Download size={16} /> Télécharger CV
              </a>
              <button className="theme-button" onClick={() => setDarkMode(!darkMode)} aria-label={darkMode ? 'Activer le thème clair' : 'Activer le thème sombre'}>
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <main>
        <section id="accueil" className="hero section-shell">
          <div className="network-background" aria-hidden="true"><span /><span /><span /><span /><span /></div>
          <div className="hero-grid container">
            <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="eyebrow"><span className="status-dot" /> Disponible pour stage PFE / premier emploi</div>
              <h1>Des données fiables.<br /><span>Des décisions plus fortes.</span></h1>
              <p className="hero-role">{profile.role} <span>/</span> Data Science & IA</p>
              <p className="hero-tagline">{profile.tagline}</p>
              <div className="hero-meta"><span><CircleDot size={15} /> {profile.location}</span><span className="meta-separator" /><span>ENSA de Fès</span></div>
              <div className="hero-ctas">
                <button className="button button-primary" onClick={() => scrollToSection('projets', closeMenu)}>Voir mes projets <ArrowDown size={17} /></button>
                <button className="button button-ghost" onClick={() => scrollToSection('contact', closeMenu)}>Me contacter <ArrowUpRight size={17} /></button>
              </div>
              <div className="social-links" aria-label="Réseaux sociaux">
                <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /></a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a>
                <a href={`mailto:${profile.email}`} aria-label="Envoyer un email"><Mail size={19} /></a>
              </div>
            </motion.div>
            <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
              <div className="portrait-frame"><div className="portrait-glow" /><img src={japhetImg} alt="Portrait de Japhet Allah-N'diguim" /></div>
              <div className="floating-card card-one"><span className="mini-icon blue"><Database size={15} /></span><span><strong>Data Engineering</strong><small>Lakehouse · ETL · BI</small></span></div>
              <div className="floating-card card-two"><span className="mini-icon green"><ShieldCheck size={15} /></span><span><strong>ML industrialisé</strong><small>MLflow · FastAPI · MLOps</small></span></div>
            </motion.div>
          </div>
          <div className="scroll-hint"><span>Défiler pour explorer</span><ArrowDown size={15} /></div>
        </section>

        <section className="metrics-strip" aria-label="Chiffres clés">
          <div className="container metrics-grid">
            {profile.metrics.map((metric) => <div className="metric-item" key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span><small>{metric.note}</small></div>)}
          </div>
        </section>

        <section id="a-propos" className="content-section about-section">
          <div className="container about-grid"><div className="section-intro"><span className="section-kicker">01 / À PROPOS</span><h2>Relier la qualité<br /><span>technique</span> à l’impact.</h2></div><div className="about-copy"><p className="lead">{profile.about}</p><div className="about-points"><div><strong>01</strong><span>De la donnée brute<br />au produit exploitable</span></div><div><strong>02</strong><span>Une culture<br />orientée production</span></div></div></div></div>
        </section>

        <section id="competences" className="content-section skills-section">
          <div className="container"><div className="section-header"><div><span className="section-kicker">02 / COMPÉTENCES</span><h2>Une stack pensée<br /><span>pour livrer.</span></h2></div><p>Des fondations data solides, des modèles mesurables et des interfaces qui parlent métier.</p></div><div className="skills-grid">{profile.skills.map((group) => <SkillCard key={group.title} group={group} />)}</div></div>
        </section>

        <section id="experience" className="content-section experience-section">
          <div className="container"><div className="section-header"><div><span className="section-kicker">03 / EXPÉRIENCE</span><h2>Construire.<br /><span>Industrialiser.</span></h2></div><p>Des expériences concrètes, de l’exploration initiale au service supervisé.</p></div><div className="timeline">{profile.experience.map((item) => <div className={`timeline-item ${item.featured ? 'featured' : ''}`} key={item.title}><div className="timeline-marker" /><div className="timeline-date">{item.date}</div><div className="timeline-content"><div className="timeline-type"><BriefcaseBusiness size={15} /> {item.featured ? 'Projet de Fin d’Année' : 'Stage'}</div><h3>{item.title}</h3><h4>{item.organization}</h4><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div></div>)}</div></div>
        </section>

        <section id="projets" className="content-section projects-section">
          <div className="container"><div className="section-header projects-heading"><div><span className="section-kicker">04 / PROJETS</span><h2>Du pipeline<br /><span>à la décision.</span></h2></div><p>Quelques réalisations qui montrent comment je transforme un besoin en système data fiable.</p></div><div className="filter-row" role="tablist" aria-label="Filtrer les projets">{(['Tous', 'Data Engineering', 'Machine Learning', 'BI'] as const).map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} role="tab" aria-selected={filter === item}>{item}</button>)}</div><div className="projects-grid">{filteredProjects.map((project) => <ProjectCard key={project.id} project={project} onOpen={() => setSelectedProject(project)} />)}</div></div>
        </section>

        <section id="formation" className="content-section education-section">
          <div className="container education-grid"><div><span className="section-kicker">05 / FORMATION</span><h2>Apprendre pour<br /><span>mieux construire.</span></h2></div><div className="education-list">{profile.education.map((item) => <div className="education-item" key={item.title}><GraduationCap size={21} /><div><h3>{item.title}</h3><p>{item.institution}</p></div><time>{item.date}</time></div>)}<div className="certification"><Check size={17} /><span>{profile.certification}</span></div><div className="languages"><h3>Langues</h3>{profile.languages.map((language) => <div key={language.name}><span>{language.name}</span><small>{language.level}</small></div>)}</div></div></div>
        </section>

        <section id="contact" className="content-section contact-section">
          <div className="container contact-grid"><div className="contact-copy"><span className="section-kicker">06 / CONTACT</span><h2>Parlons de la<br /><span>suite.</span></h2><p>Ouvert aux opportunités de stage PFE et de premier emploi en Data.</p><div className="contact-links"><a href={`mailto:${profile.email}`}><span className="contact-icon"><Mail size={18} /></span><span><small>Email</small>{profile.email}</span></a><button onClick={copyEmail} className="copy-button" aria-label="Copier l'adresse email">{copied ? <Check size={17} /> : <Clipboard size={17} />}</button><a href={`tel:${profile.phone.replaceAll(' ', '')}`}><span className="contact-icon"><Phone size={18} /></span><span><small>Téléphone</small>{profile.phone}</span></a><a href={profile.whatsapp} target="_blank" rel="noreferrer"><span className="contact-icon whatsapp">W</span><span><small>WhatsApp</small>Écrire un message</span></a></div><div className="contact-socials"><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a></div></div><form className="contact-form" onSubmit={handleSubmit}><div className="form-heading"><span>Un projet en tête ?</span><Send size={20} /></div><label htmlFor="name">Nom</label><input id="name" name="name" type="text" placeholder="Votre nom" required /><label htmlFor="email">Email</label><input id="email" name="email" type="email" placeholder="vous@exemple.com" required /><label htmlFor="message">Message</label><textarea id="message" name="message" rows={5} placeholder="Parlez-moi de votre besoin..." required /><button className="button button-primary" type="submit" disabled={formSubmitting}>{formSubmitting ? 'Envoi en cours…' : 'Envoyer le message'} {!formSubmitting && <ArrowUpRight size={17} />}</button>{formSent && <p className="form-success"><Check size={16} /> Merci, votre message a bien été envoyé.</p>}{formError && <p className="form-error">{formError}</p>}</form></div>
        </section>
      </main>

      <footer className="footer"><div className="container footer-inner"><div className="brand footer-brand"><span className="brand-mark">JA</span><span className="brand-name">Japhet<span>.</span></span></div><p>Data Engineering · ML / MLOps · BI</p><span>© {new Date().getFullYear()} Japhet Allah-N'diguim</span></div></footer>

      <AnimatePresence>{showFloatingContact && <motion.button className="floating-contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={() => scrollToSection('contact', closeMenu)}><Mail size={17} /> Me contacter</motion.button>}</AnimatePresence>

      <AnimatePresence>{selectedProject && <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}><motion.div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Fermer"><X size={21} /></button><span className="section-kicker">{selectedProject.category}</span><h2 id="project-title">{selectedProject.title}</h2><p className="modal-description">{selectedProject.details}</p><div className="modal-results">{selectedProject.results.map((result) => <strong key={result}>{result}</strong>)}</div><h3>Architecture</h3><div className="architecture">{selectedProject.architecture.map((step, index) => <span key={step}><b>{String(index + 1).padStart(2, '0')}</b>{step}{index < selectedProject.architecture.length - 1 && <ArrowDown size={15} />}</span>)}</div><h3>Technologies</h3><div className="tag-list">{selectedProject.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>{selectedProject.github && <a className="modal-github" href={selectedProject.github} target="_blank" rel="noreferrer"><Github size={17} /> Voir le projet sur GitHub <ExternalLink size={15} /></a>}</motion.div></motion.div>}</AnimatePresence>
    </div>
  )
}

function SkillCard({ group }: { group: SkillGroup }) {
  const Icon = skillIcons[group.icon] ?? Code2
  return <motion.article className="skill-card" whileHover={{ y: -4 }}><div className="skill-card-heading"><span className="skill-icon"><Icon size={19} /></span><h3>{group.title}</h3></div><div className="tag-list">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></motion.article>
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return <motion.article className={`project-card ${project.featured ? 'featured-project' : ''}`} layout onClick={onOpen} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onOpen() }}><div className="project-card-top"><span className="project-category">{project.category}</span><ArrowUpRight size={19} /></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-results">{project.results.map((result) => <span key={result}>{result}</span>)}</div><div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>{project.github && <a className="project-github" href={project.github} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}><Github size={15} /> GitHub</a>}<button className="project-details" onClick={(event) => { event.stopPropagation(); onOpen() }}>Voir les détails <ArrowUpRight size={15} /></button></motion.article>
}

export default Portfolio
