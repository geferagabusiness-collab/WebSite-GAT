/** Copy from content/sitio-web.txt — internal pages */

export const NOSOTROS_CONTENT = {
  title: 'Nosotros',
  subtitle: 'Tecnología integral con visión estratégica',
  sections: [
    {
      id: 'mision',
      title: 'Misión',
      body: 'Ayudamos a las empresas a evolucionar mediante soluciones tecnológicas integrales, soporte especializado e innovación estratégica orientada a resultados sostenibles y continuidad operativa.',
      cta: 'Saber más',
    },
    {
      id: 'vision',
      title: 'Visión',
      body: 'Ser una referencia en transformación tecnológica empresarial en Latinoamérica, liderando la integración de inteligencia artificial, automatización y ciberseguridad para organizaciones modernas.',
      cta: 'Conocer nuestra visión',
    },
    {
      id: 'equipo',
      title: 'Equipo',
      body: 'Contamos con un equipo multidisciplinario enfocado en tecnología, infraestructura, automatización y soluciones empresariales de alto impacto. Experiencia técnica con visión estratégica.',
      cta: 'Hablar con un especialista',
    },
  ],
} as const

export const CONTACTO_CONTENT = {
  title: 'Contacto',
  subtitle: 'Conéctese con Grupo AXM Technology',
  form: {
    intro:
      'Conéctese con nuestro equipo para recibir asesoría especializada y soluciones tecnológicas adaptadas a las necesidades de su empresa.',
    cta: 'Contactar ahora',
  },
  whatsapp: {
    intro:
      'Hable directamente con un especialista de Grupo AXM Technology y reciba atención rápida para proyectos, soporte o asesoría tecnológica.',
    label: 'Escribir por WhatsApp',
    href: 'https://wa.me/573000000000',
  },
  social: {
    intro:
      'Descubra novedades, contenido tecnológico y soluciones empresariales a través de nuestras redes oficiales y comunidad digital.',
    label: 'Seguirnos en redes',
  },
} as const

export interface SupportDownload {
  name: string
  description: string
  cta: string
  href: string
}

export const SOPORTE_CONTENT = {
  title: 'Soporte',
  subtitle: 'Atención técnica empresarial',
  ticket: {
    intro:
      'Gestione solicitudes e incidencias de soporte de forma organizada, rápida y eficiente mediante nuestra plataforma empresarial de atención.',
    cta: 'Crear ticket',
    priorities: ['Baja', 'Media', 'Alta', 'Crítica'] as const,
    areas: ['TI', 'Operaciones', 'Comercial', 'Administración', 'Otro'] as const,
  },
  downloads: {
    title: 'Acceso remoto',
    subtitle: 'Acceda a descarga de utilidades de soporte remoto',
    items: [
      {
        name: 'AnyDesk',
        description:
          'Acceda a soporte remoto seguro y ágil mediante AnyDesk para resolver incidencias técnicas sin interrumpir sus operaciones.',
        cta: 'Descargar ahora',
        href: 'https://anydesk.com/es/downloads',
      },
      {
        name: 'RustDesk',
        description:
          'Herramienta de asistencia remota enfocada en control seguro, estabilidad y soporte técnico empresarial eficiente.',
        cta: 'Descargar utilidad',
        href: 'https://rustdesk.com/',
      },
      {
        name: 'TeamViewer',
        description:
          'Conectividad remota confiable para soporte técnico empresarial inmediato y continuidad operativa sin desplazamientos innecesarios.',
        cta: 'Descargar',
        href: 'https://www.teamviewer.com/es/download/',
      },
    ] satisfies SupportDownload[],
  },
} as const

export interface ServiceSubItem {
  title: string
  description: string
}

export interface ServiceDetail {
  id: string
  title: string
  description: string
  color: string
  subservices: ServiceSubItem[]
}

export const SERVICIOS_PAGE_CONTENT = {
  title: 'Servicios',
  subtitle: 'Soluciones tecnológicas integrales para su empresa',
  services: [
    {
      id: 'soporte',
      title: 'Soporte y Mantenimiento',
      description:
        'Brindamos soporte técnico rápido y confiable para mantener la continuidad operativa de su empresa, tanto de forma presencial como remota.',
      color: '#009FFC',
      subservices: [
        {
          title: 'Asistencia técnica in situ y remota',
          description:
            'Brindamos soporte técnico rápido y confiable para mantener la continuidad operativa de su empresa, tanto de forma presencial como remota. Respuesta eficiente cuando más lo necesita.',
        },
        {
          title: 'Planes de mantenimiento preventivo',
          description:
            'Prevenimos fallas antes de que afecten su operación mediante planes de mantenimiento diseñados para maximizar estabilidad, rendimiento y vida útil tecnológica.',
        },
        {
          title: 'Administración de parque tecnológico',
          description:
            'Gestionamos integralmente los activos tecnológicos de su empresa para garantizar control, eficiencia y operación continua en todos sus sistemas y equipos.',
        },
        {
          title: 'Mesa de ayuda empresarial',
          description:
            'Centralice el soporte de su organización con una mesa de ayuda profesional orientada a resolver incidencias de forma ágil, organizada y escalable.',
        },
      ],
    },
    {
      id: 'redes',
      title: 'Conectividad y Redes Empresariales',
      description:
        'Diseñamos e implementamos redes empresariales robustas, seguras y preparadas para soportar operaciones modernas de alto rendimiento y crecimiento futuro.',
      color: '#0075F0',
      subservices: [
        {
          title: 'Instalación de redes UTP y fibra óptica',
          description:
            'Diseñamos e implementamos redes empresariales robustas, seguras y preparadas para soportar operaciones modernas de alto rendimiento y crecimiento futuro.',
        },
        {
          title: 'WiFi corporativo y multi-sede',
          description:
            'Conectividad inalámbrica empresarial optimizada para oficinas, sedes múltiples y entornos de alta demanda, con estabilidad y cobertura profesional.',
        },
        {
          title: 'Servidores y almacenamiento de datos',
          description:
            'Infraestructura de servidores y almacenamiento diseñada para proteger la información crítica de su empresa y garantizar disponibilidad permanente.',
        },
        {
          title: 'Optimización y continuidad de internet',
          description:
            'Mejoramos la estabilidad y rendimiento de su conexión empresarial para reducir interrupciones y asegurar operaciones sin pausas.',
        },
      ],
    },
    {
      id: 'ia',
      title: 'Inteligencia Artificial y Automatización',
      description:
        'Automatizamos procesos operativos y comerciales para reducir tareas repetitivas, optimizar tiempos y aumentar la productividad empresarial.',
      color: '#00F0FC',
      subservices: [
        {
          title: 'Agentes IA para WhatsApp y ventas',
          description:
            'Implemente agentes inteligentes capaces de atender clientes, responder consultas y aumentar conversiones de manera automatizada y escalable.',
        },
        {
          title: 'Automatización de procesos y CRM',
          description:
            'Automatizamos procesos operativos y comerciales para reducir tareas repetitivas, optimizar tiempos y aumentar la productividad empresarial.',
        },
        {
          title: 'Asistentes virtuales e internos',
          description:
            'Integre asistentes impulsados por IA para apoyar áreas internas, mejorar flujos de trabajo y potenciar la eficiencia organizacional.',
        },
        {
          title: 'Análisis inteligente de datos',
          description:
            'Transforme datos empresariales en decisiones estratégicas mediante inteligencia artificial, automatización analítica y visualización inteligente.',
        },
      ],
    },
    {
      id: 'software',
      title: 'Desarrollo de Software y Plataformas',
      description:
        'Creamos plataformas web modernas, rápidas y orientadas a conversión para fortalecer la presencia digital y el crecimiento comercial de su empresa.',
      color: '#4FC3F7',
      subservices: [
        {
          title: 'Sitios web y tiendas virtuales',
          description:
            'Creamos plataformas web modernas, rápidas y orientadas a conversión para fortalecer la presencia digital y el crecimiento comercial de su empresa.',
        },
        {
          title: 'Aplicaciones móviles y corporativas',
          description:
            'Desarrollamos aplicaciones empresariales adaptadas a sus procesos, optimizadas para escalabilidad, rendimiento y experiencia de usuario.',
        },
        {
          title: 'Sistemas de gestión personalizados',
          description:
            'Diseñamos sistemas a medida para centralizar operaciones, automatizar tareas y optimizar el control estratégico de su negocio.',
        },
        {
          title: 'Integración de sistemas y APIs',
          description:
            'Conectamos plataformas, servicios y herramientas empresariales para crear ecosistemas digitales integrados, eficientes y escalables.',
        },
      ],
    },
    {
      id: 'ciberseguridad',
      title: 'Ciberseguridad y Protección Digital',
      description:
        'Evaluamos y fortalecemos la infraestructura tecnológica de su empresa para reducir vulnerabilidades y elevar el nivel de seguridad digital.',
      color: '#009FFC',
      subservices: [
        {
          title: 'Auditorías y blindaje de redes',
          description:
            'Evaluamos y fortalecemos la infraestructura tecnológica de su empresa para reducir vulnerabilidades y elevar el nivel de seguridad digital.',
        },
        {
          title: 'Copias de seguridad y recuperación',
          description:
            'Proteja la información crítica de su organización con soluciones de respaldo y recuperación diseñadas para minimizar riesgos operativos.',
        },
        {
          title: 'Licencias SO, antivirus y ofimática',
          description:
            'Suministramos licenciamiento tecnológico empresarial confiable para garantizar legalidad, seguridad y productividad corporativa.',
        },
        {
          title: 'Protección contra virus y secuestro de datos',
          description:
            'Implementamos estrategias de protección avanzadas frente a ransomware, malware y amenazas que comprometen la continuidad empresarial.',
        },
        {
          title: 'Monitoreo de seguridad 24/7',
          description:
            'Supervisión continua de infraestructura y entornos digitales para detectar amenazas oportunamente y actuar antes de que impacten su negocio.',
        },
      ],
    },
    {
      id: 'marketing',
      title: 'Marketing y Branding Digital',
      description:
        'Construimos marcas tecnológicas sólidas, modernas y memorables que transmiten confianza, innovación y diferenciación empresarial.',
      color: '#F5A623',
      subservices: [
        {
          title: 'Identidad corporativa y diseño',
          description:
            'Construimos marcas tecnológicas sólidas, modernas y memorables que transmiten confianza, innovación y diferenciación empresarial.',
        },
        {
          title: 'Automatización de contenidos con IA',
          description:
            'Acelere la producción de contenido con inteligencia artificial aplicada al marketing, mejorando consistencia, velocidad y alcance comercial.',
        },
        {
          title: 'Embudos de venta y WhatsApp marketing',
          description:
            'Diseñamos flujos comerciales automatizados para captar clientes, nutrir oportunidades y aumentar conversiones desde WhatsApp y canales digitales.',
        },
      ],
    },
  ] satisfies ServiceDetail[],
} as const

export const ACADEMY_CONTENT = {
  title: 'Academy',
  subtitle: 'Capacitación empresarial en inteligencia artificial',
  courses: [
    {
      title: 'IA para Empresas',
      description:
        'Capacitamos empresas para integrar inteligencia artificial en sus operaciones y aprovechar su potencial estratégico de manera práctica y aplicada.',
      cta: 'Reservar cupo',
    },
    {
      title: 'Talleres Corporativos IA',
      description:
        'Entrenamientos especializados orientados a equipos empresariales que buscan acelerar la adopción tecnológica y la productividad con IA.',
      cta: 'Solicitar información',
    },
    {
      title: 'IA para Equipos Comerciales',
      description:
        'Entrene a su equipo de ventas en herramientas de inteligencia artificial para mejorar prospectación, seguimiento y cierre comercial.',
      cta: 'Capacitar mi equipo',
    },
    {
      title: 'IA para Gerencia',
      description:
        'Programas ejecutivos enfocados en líderes empresariales que desean integrar IA en estrategia, productividad y toma de decisiones.',
      cta: 'Conocer programa',
    },
    {
      title: 'Adopción Empresarial IA',
      description:
        'Acompañamos la implementación estratégica de inteligencia artificial en empresas para garantizar adopción efectiva y resultados medibles.',
      cta: 'Hablar con un consultor',
    },
  ],
  certificates: {
    title: 'Consulta de certificados',
    description:
      'Verifique certificados emitidos por Grupo AXM Technology de manera rápida, segura y digital desde nuestra plataforma oficial.',
    cta: 'Consultar certificado',
    placeholderResult:
      'Ingrese un código de certificado para verificar su validez. La consulta en línea estará disponible próximamente.',
  },
} as const

export const ALEXANDRO_PAGE_CONTENT = {
  title: 'Alexandro',
  badge: 'Gerente Operativo IA',
  headline: 'Alexandro',
  description:
    'Alexandro es un gerente operativo potenciado por inteligencia artificial, diseñado para optimizar procesos, automatizar operaciones y apoyar la toma de decisiones empresariales.',
  cta: 'Conocer Alexandro',
} as const
