import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowRight, BarChart3, Check, Code2, Menu, Moon, MousePointer2, Palette, Sun, X, Zap } from 'lucide-react'

const GrowthScene = lazy(() => import('./components/GrowthScene'))

const whatsapp = 'https://wa.me/5500000000000?text=Ol%C3%A1%2C%20quero%20fazer%20minha%20marca%20crescer!'

function Logo({ compact = false }: { compact?: boolean }) {
  return <a href="#inicio" className="logo" aria-label="Growfy, início">
    <img src="/growfy-logo-oficial.png" alt="" aria-hidden="true" />
    {!compact && <span>GROW<span>FY</span></span>}
  </a>
}

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
  </svg>
}

const services = [
  { icon: Code2, number: '01', title: 'Sites & Portfólios', text: 'Sites profissionais que transformam sua experiência em autoridade e novos contatos.' },
  { icon: BarChart3, number: '02', title: 'Tráfego pago', text: 'Campanhas estratégicas para encontrar as pessoas certas e acelerar seus resultados.' },
  { icon: Palette, number: '03', title: 'Presença digital', text: 'Uma comunicação visual consistente para destacar sua marca em todos os canais.' },
]

const audience = ['Advogados', 'Médicos', 'Arquitetos', 'Consultores', 'Clínicas', 'Especialistas']

function App() {
  const [menu, setMenu] = useState(false)
  const [light, setLight] = useState(() => localStorage.getItem('growfy-theme') === 'light')
  const { scrollYProgress } = useScroll()
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '150%'])

  useEffect(() => {
    document.documentElement.dataset.theme = light ? 'light' : 'dark'
    localStorage.setItem('growfy-theme', light ? 'light' : 'dark')
  }, [light])

  useEffect(() => {
    const isMobile = () => window.matchMedia('(max-width: 900px)').matches
    const preventGestureZoom = (event: Event) => {
      if (isMobile()) event.preventDefault()
    }
    const preventPinchZoom = (event: TouchEvent) => {
      if (isMobile() && event.touches.length > 1) event.preventDefault()
    }

    document.addEventListener('gesturestart', preventGestureZoom, { passive: false })
    document.addEventListener('gesturechange', preventGestureZoom, { passive: false })
    document.addEventListener('gestureend', preventGestureZoom, { passive: false })
    document.addEventListener('touchmove', preventPinchZoom, { passive: false })

    return () => {
      document.removeEventListener('gesturestart', preventGestureZoom)
      document.removeEventListener('gesturechange', preventGestureZoom)
      document.removeEventListener('gestureend', preventGestureZoom)
      document.removeEventListener('touchmove', preventPinchZoom)
    }
  }, [])

  return <main>
    <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
    <motion.div className="ambient" style={{ y: glowY }} />
    <header>
      <Logo />
      <nav className={menu ? 'open' : ''} aria-label="Navegação principal">
        {['Serviços', 'Processo', 'Sobre'].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenu(false)}>{item}</a>)}
        <a className="nav-cta" href={whatsapp}>Fale com a gente <ArrowDownRight size={17}/></a>
      </nav>
      <div className="header-actions">
        <button className="theme-toggle" onClick={() => setLight(!light)} aria-label={light ? 'Ativar tema escuro' : 'Ativar tema claro'}>{light ? <Moon/> : <Sun/>}<span>{light ? 'Escuro' : 'Claro'}</span></button>
        <button className="menu" onClick={() => setMenu(!menu)} aria-label="Abrir menu">{menu ? <X/> : <Menu/>}</button>
      </div>
    </header>

    <section className="hero" id="inicio">
      <div className="hero-copy">
        <motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><i/> MARKETING + TECNOLOGIA</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12, duration: .7 }}>Sua autoridade<br/>merece <em>ser vista.</em></motion.h1>
        <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>Criamos experiências digitais e campanhas que transformam profissionais em marcas fortes — e presença em crescimento real.</motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .4 }}>
          <a className="button primary" href={whatsapp}>Começar um projeto <ArrowRight size={18}/></a>
          <a className="button ghost" href="#serviços">Conheça nosso trabalho</a>
        </motion.div>
      </div>
      <motion.div className="hero-visual" initial={{ opacity: 0, scale: .88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [.16,1,.3,1] }}>
        <div className="scene-shell"><Suspense fallback={<div className="scene-loader"><Logo compact/></div>}><GrowthScene light={light}/></Suspense></div>
        <div className="scene-label"><i/> ARRASTE PARA EXPLORAR</div>
        <motion.div className="float-card card-a" animate={{ y: [0,-12,0], rotate: [-3,-1,-3] }} transition={{ repeat: Infinity, duration: 5 }}><Zap size={17}/> Estratégia inteligente</motion.div>
        <motion.div className="float-card card-b" animate={{ y: [0,10,0], rotate: [3,1,3] }} transition={{ repeat: Infinity, duration: 6 }}><span>+132%</span> em visibilidade</motion.div>
      </motion.div>
      <div className="scroll-hint"><MousePointer2 size={16}/> explore</div>
    </section>

    <section className="ticker" aria-label="Público atendido"><motion.div animate={{ x: ['0%', '-50%'] }} transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}>{[...audience,...audience].map((a,i)=><span key={i}>{a}<b>✦</b></span>)}</motion.div></section>

    <section className="section services" id="serviços">
      <div className="section-head"><div><span className="kicker">O QUE FAZEMOS</span><h2>Estratégia completa<br/>para sua marca <em>crescer.</em></h2></div><p>Da primeira impressão ao próximo cliente. Unimos design, tecnologia e performance em uma entrega pensada para você.</p></div>
      <div className="service-grid">{services.map((s,i)=><motion.article key={s.title} initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }} whileHover={{ rotateX: -3, rotateY: i === 1 ? 0 : i === 0 ? 3 : -3, y: -10 }} viewport={{ once:true, amount:.3 }} transition={{ delay:i*.1 }}>
        <span className="service-num">{s.number}</span><div className="icon-box"><s.icon/></div><h3>{s.title}</h3><p>{s.text}</p><a href={whatsapp}>Quero saber mais <ArrowRight size={17}/></a>
      </motion.article>)}</div>
    </section>

    <section className="showcase" id="processo">
      <div className="showcase-card">
        <div className="dash-top"><Logo/><span>growfy.com.br</span><i/><i/></div>
        <div className="dash-content"><span>VISIBILIDADE</span><strong>Resultados que<br/><em>movem negócios.</em></strong><div className="chart">{[35,54,46,72,65,91].map((h,i)=><motion.i key={i} initial={{height:0}} whileInView={{height:`${h}%`}} viewport={{once:true}} transition={{delay:i*.1,duration:.7}}/>)}</div></div>
      </div>
      <div className="showcase-copy"><span className="kicker">NOSSO PROCESSO</span><h2>Clareza do primeiro contato ao resultado.</h2><div className="steps">{[
        ['01','Entendemos seu momento','Uma conversa para mapear seus objetivos, público e diferenciais.'],
        ['02','Criamos a estratégia','Definimos posicionamento, experiência e canais com mais potencial.'],
        ['03','Colocamos em movimento','Lançamos, acompanhamos e aprimoramos para sua marca crescer.']
      ].map(s=><div className="step" key={s[0]}><span>{s[0]}</span><div><h3>{s[1]}</h3><p>{s[2]}</p></div></div>)}</div></div>
    </section>

    <section className="about section" id="sobre">
      <div><span className="kicker">POR QUE A GROWFY</span><h2>Mais do que estar online.<br/><em>É sobre ser escolhido.</em></h2></div>
      <div className="about-copy"><p>Seu trabalho já tem valor. Nossa missão é fazer o mercado perceber isso. Construímos uma presença que transmite confiança, diferencia você e abre portas.</p><ul>{['Estratégia sob medida','Design que transmite autoridade','Tecnologia rápida e responsiva','Foco em conversão e resultado'].map(x=><li key={x}><Check size={15}/>{x}</li>)}</ul></div>
    </section>

    <section className="cta-section"><div className="cta-orb"><Logo compact/></div><span>PRONTO PARA CRESCER?</span><h2>Vamos transformar sua<br/>presença em <em>resultado.</em></h2><a className="button light" href={whatsapp}>Falar com um especialista <ArrowRight size={18}/></a></section>

    <footer><Logo/><div><a href="#serviços">Serviços</a><a href="#processo">Processo</a><a href="#sobre">Sobre</a></div><div className="social"><a className="footer-email" href="mailto:contato@growfyy.com.br">contato@growfyy.com.br</a><a className="instagram-link" href="https://www.instagram.com/growfy.agencia/" target="_blank" rel="noreferrer" aria-label="Instagram da Growfy"><InstagramIcon/></a></div><small>© 2026 Growfy. Todos os direitos reservados.</small></footer>
  </main>
}

export default App
