export interface NavLink {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Alexandro', href: '/alexandro' },
  { label: 'Academy', href: '/academy' },
  { label: 'Soporte', href: '/soporte' },
  { label: 'Contacto', href: '/contacto' },
]

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Servicios',
    links: [
      { label: 'Soporte y Mantenimiento', href: '/servicios/soporte' },
      { label: 'Conectividad y Redes', href: '/servicios/redes' },
      { label: 'Inteligencia Artificial', href: '/servicios/inteligencia-artificial' },
      { label: 'Desarrollo de Software', href: '/servicios/software' },
      { label: 'Ciberseguridad', href: '/servicios/ciberseguridad' },
      { label: 'Marketing Digital', href: '/servicios/marketing' },
    ],
  },
  {
    title: 'Academy',
    links: [
      { label: 'Cursos', href: '/academy' },
      { label: 'Certificados', href: '/certificados' },
      { label: 'Validar certificado', href: '/certificados' },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { label: 'Centro de soporte', href: '/soporte' },
      { label: 'Tickets', href: '/soporte/tickets' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
]

export interface SocialLink {
  label: string
  href: string
  icon: 'linkedin' | 'instagram' | 'facebook' | 'youtube'
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
]

export const SITE_NAME = 'Grupo AXM Technology'

export const SITE_DESCRIPTION =
  'Plataforma web corporativa premium — tecnología, IA y automatización empresarial.'

// —— Home / Inicio (content/sitio-web.txt · 01_INICIO) ——

export const HOME_HERO = {
  badge: 'Tecnología · IA · Automatización',
  headlineBefore: 'Impulsamos empresas con tecnología, automatización e ',
  headlineHighlight: 'inteligencia artificial',
  headlineAfter: '',
  // Propuesta de valor — content/sitio-web.txt líneas 4-5
  lead: 'Diseñadas para optimizar operaciones, proteger activos y acelerar el crecimiento empresarial. En Grupo AXM Technology convertimos la tecnología en una ventaja competitiva real.',
  ctaPrimary: { label: 'Descubrir solución', href: '/servicios' },
  ctaSecondary: { label: 'Conocer más', href: '/nosotros' },
} as const

export const HOME_SERVICES_SECTION = {
  title: 'Servicios tecnológicos empresariales',
  // content/sitio-web.txt · 02_NOSOTROS · Misión (intro servicios)
  subtitle:
    'Ayudamos a las empresas a evolucionar mediante soluciones tecnológicas integrales, soporte especializado e innovación estratégica orientada a resultados sostenibles y continuidad operativa.',
} as const

export type ServiceIconName =
  | 'Headphones'
  | 'Network'
  | 'Brain'
  | 'Code'
  | 'Shield'
  | 'TrendingUp'

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: ServiceIconName
  href: string
  color: string
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'soporte',
    title: 'Soporte y Mantenimiento',
    description:
      'Brindamos soporte técnico rápido y confiable para mantener la continuidad operativa de su empresa, tanto de forma presencial como remota.',
    icon: 'Headphones',
    href: '/servicios/soporte',
    color: '#009FFC',
  },
  {
    id: 'redes',
    title: 'Conectividad y Redes',
    description:
      'Diseñamos e implementamos redes empresariales robustas, seguras y preparadas para soportar operaciones modernas de alto rendimiento y crecimiento futuro.',
    icon: 'Network',
    href: '/servicios/redes',
    color: '#0075F0',
  },
  {
    id: 'ia',
    title: 'Inteligencia Artificial',
    description:
      'Automatizamos procesos operativos y comerciales para reducir tareas repetitivas, optimizar tiempos y aumentar la productividad empresarial.',
    icon: 'Brain',
    href: '/servicios/inteligencia-artificial',
    color: '#00F0FC',
  },
  {
    id: 'software',
    title: 'Desarrollo de Software',
    description:
      'Creamos plataformas web modernas, rápidas y orientadas a conversión para fortalecer la presencia digital y el crecimiento comercial de su empresa.',
    icon: 'Code',
    href: '/servicios/software',
    color: '#4FC3F7',
  },
  {
    id: 'ciberseguridad',
    title: 'Ciberseguridad',
    description:
      'Evaluamos y fortalecemos la infraestructura tecnológica de su empresa para reducir vulnerabilidades y elevar el nivel de seguridad digital.',
    icon: 'Shield',
    href: '/servicios/ciberseguridad',
    color: '#009FFC',
  },
  {
    id: 'marketing',
    title: 'Marketing Digital',
    description:
      'Construimos marcas tecnológicas sólidas, modernas y memorables que transmiten confianza, innovación y diferenciación empresarial.',
    icon: 'TrendingUp',
    href: '/servicios/marketing',
    color: '#F5A623',
  },
]

export interface StatItem {
  value: string
  label: string
}

export const HOME_STATS: StatItem[] = [
  { value: '500+', label: 'Empresas atendidas' },
  { value: '99%', label: 'Satisfacción' },
  { value: '24/7', label: 'Soporte activo' },
  { value: '6', label: 'Líneas de servicio' },
]

export const HOME_CTA = {
  title: '¿Listo para transformar tu empresa?',
  // content/sitio-web.txt · 08_CONTACTO · Formulario.txt
  subtitle:
    'Conéctese con nuestro equipo para recibir asesoría especializada y soluciones tecnológicas adaptadas a las necesidades de su empresa.',
  primary: { label: 'Contactar ahora', href: '/contacto' },
  // content/sitio-web.txt · 08_CONTACTO · WhatsApp.txt
  whatsapp: {
    label: 'Escribir por WhatsApp',
    href: 'https://wa.me/5212345678900',
  },
} as const
