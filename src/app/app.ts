import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

type Language = 'en' | 'es';

interface Capability {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly technologies: readonly string[];
}

interface Experience {
  readonly period: string;
  readonly company: string;
  readonly role: string;
  readonly summary: string;
  readonly highlights: readonly string[];
}

interface PortfolioCopy {
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly skipLink: string;
  readonly primaryNavigation: string;
  readonly homeLabel: string;
  readonly expertiseNav: string;
  readonly experienceNav: string;
  readonly contactNav: string;
  readonly languageToggle: string;
  readonly heroEyebrow: string;
  readonly heroTitle: string;
  readonly heroTitleAccent: string;
  readonly heroIntro: string;
  readonly exploreWork: string;
  readonly viewExpertise: string;
  readonly careerHighlights: string;
  readonly yearsBuilt: string;
  readonly developersLed: string;
  readonly languagesSpoken: string;
  readonly professionalStatement: string;
  readonly contributionKicker: string;
  readonly contributionTitle: string;
  readonly contributionTitleAccent: string;
  readonly contributionCopy: string;
  readonly expertiseKicker: string;
  readonly expertiseTitle: string;
  readonly expertiseTitleSecondLine: string;
  readonly expertiseIntro: string;
  readonly keyTechnologies: string;
  readonly capabilities: readonly Capability[];
  readonly impactKicker: string;
  readonly impactTitle: string;
  readonly impactCopy: string;
  readonly impactAreas: string;
  readonly impactPills: readonly string[];
  readonly experienceKicker: string;
  readonly experienceTitle: string;
  readonly experienceIntro: string;
  readonly experience: readonly Experience[];
  readonly recognitionKicker: string;
  readonly recognitionTitle: string;
  readonly recognitionCopy: string;
  readonly educationKicker: string;
  readonly educationTitle: string;
  readonly webDevelopment: string;
  readonly animation: string;
  readonly internationalTitle: string;
  readonly internationalCopy: string;
  readonly contactKicker: string;
  readonly contactTitle: string;
  readonly contactTitleAccent: string;
  readonly linkedinContact: string;
  readonly footerCraft: string;
  readonly socialLinks: string;
  readonly backToTop: string;
}

const LANGUAGE_STORAGE_KEY = 'pere-borras-language';

const CONTENT: Record<Language, PortfolioCopy> = {
  en: {
    metaTitle: 'Pere Antoni Borràs Expósito | Senior .NET & Angular Developer',
    metaDescription:
      'Portfolio of Pere Antoni Borràs Expósito, Senior Full Stack Developer and Team Lead specialising in .NET, Angular, Azure and distributed systems.',
    skipLink: 'Skip to content',
    primaryNavigation: 'Primary navigation',
    homeLabel: 'Pere Antoni Borràs Expósito, home',
    expertiseNav: 'Expertise',
    experienceNav: 'Experience',
    contactNav: "Let's talk",
    languageToggle: 'Switch language to Spanish',
    heroEyebrow: 'Senior .NET Engineer · Team Lead · Angular',
    heroTitle: 'I turn complexity into',
    heroTitleAccent: 'software that moves businesses forward.',
    heroIntro:
      "I'm Pere Antoni Borràs Expósito, a full-stack engineer focused on .NET, Angular and distributed systems. I connect architecture, people and product to ship work that matters.",
    exploreWork: 'Explore my work',
    viewExpertise: 'View expertise',
    careerHighlights: 'Career highlights',
    yearsBuilt: 'years building enterprise software',
    developersLed: 'developers led and mentored',
    languagesSpoken: 'languages for global collaboration',
    professionalStatement: 'Professional statement',
    contributionKicker: 'What I bring',
    contributionTitle: 'Senior engineering is more than writing code.',
    contributionTitleAccent: "It's making the next decision easier.",
    contributionCopy:
      'I work across the full delivery lifecycle: understanding the real problem, shaping the solution, guiding implementation and helping the team raise the bar together.',
    expertiseKicker: 'Expertise',
    expertiseTitle: 'Deep where it counts.',
    expertiseTitleSecondLine: 'Broad where it helps.',
    expertiseIntro:
      'A backend-first profile with the range to connect technical strategy, cloud delivery and the user experience.',
    keyTechnologies: 'Key technologies',
    capabilities: [
      {
        eyebrow: '01 / Engineering',
        title: 'Backend systems built to last.',
        description:
          'From business rules to resilient distributed services, I design APIs and platforms that stay understandable as they grow.',
        technologies: ['.NET', 'C#', 'REST & SOAP', 'SQL Server', 'MongoDB'],
      },
      {
        eyebrow: '02 / Architecture',
        title: 'Clarity before complexity.',
        description:
          'I turn requirements into technical direction using pragmatic architecture, clear boundaries and decisions a team can own.',
        technologies: ['DDD', 'Hexagonal', 'Clean Architecture', 'SOLID', 'Event Driven'],
      },
      {
        eyebrow: '03 / Product',
        title: 'A true full-stack perspective.',
        description:
          'I connect robust services with polished Angular experiences, keeping product value and user needs in the same conversation.',
        technologies: ['Angular', 'TypeScript', 'RxJS', 'Material', 'Cypress'],
      },
      {
        eyebrow: '04 / Delivery',
        title: 'Cloud, automation and momentum.',
        description:
          'Azure services, CI/CD and AI-assisted workflows help me shorten feedback loops without compromising engineering quality.',
        technologies: ['Azure', 'Service Bus', 'CI/CD', 'AI Agents', 'xUnit'],
      },
    ],
    impactKicker: 'From requirements to results',
    impactTitle: 'Engineering with business context.',
    impactCopy:
      'At Avoris Tech, I help evolve a platform used by international tour operators and travel agencies — combining hands-on delivery, direct client collaboration and technical leadership to support sustained business growth.',
    impactAreas: 'Areas of impact',
    impactPills: [
      'International B2B & B2C',
      'Distributed services',
      'Technical leadership',
      'Travel technology',
    ],
    experienceKicker: 'Experience',
    experienceTitle: 'Built through ownership.',
    experienceIntro: 'From full-stack delivery to technical leadership and architecture.',
    experience: [
      {
        period: '2023 - Now',
        company: 'AVORIS TECH',
        role: 'Team Lead Full Stack Developer',
        summary:
          'Leading a team of seven on an international B2B and B2C travel platform, translating business goals into scalable technical solutions.',
        highlights: [
          'Designing REST microservices and distributed workflows with .NET and Azure Service Bus.',
          'Shaping architecture proposals, engineering standards, reviews and mentoring.',
          'Working directly with international clients on a platform supporting multimillion-euro business growth.',
        ],
      },
      {
        period: '2022 - 2023',
        company: 'RIU',
        role: 'Full Stack Developer',
        summary:
          'Built and maintained business-critical backend and frontend applications across .NET, Java and Angular.',
        highlights: [
          'Migrated a legacy monolith toward microservices using the Strangler Fig pattern.',
          'Delivered tested backend services and Angular features in a cross-functional agile team.',
        ],
      },
    ],
    recognitionKicker: 'Recognition · 2023',
    recognitionTitle: 'Circular Innovation Hackathon winner',
    recognitionCopy:
      'First-place team in a 24-hour challenge led by Impulsa Balears with Hotelbeds, creating a gamified concept for more sustainable, decentralised tourism.',
    educationKicker: 'Foundation',
    educationTitle: 'Technology with a creative edge.',
    webDevelopment: 'Web Application Development',
    animation: '3D Animation & Interactive Environments',
    internationalTitle: 'Local roots. International mindset.',
    internationalCopy: 'Native Spanish and Catalan, professional English.',
    contactKicker: "Let's build something meaningful",
    contactTitle: 'Architecture. Product. People.',
    contactTitleAccent: 'One engineering mindset.',
    linkedinContact: 'Connect on LinkedIn',
    footerCraft: 'Designed with intention. Built with Angular.',
    socialLinks: 'Social links',
    backToTop: 'Back to top ↑',
  },
  es: {
    metaTitle: 'Pere Antoni Borràs Expósito | Desarrollador sénior .NET y Angular',
    metaDescription:
      'Portfolio de Pere Antoni Borràs Expósito, desarrollador Full Stack sénior y Team Lead especializado en .NET, Angular, Azure y sistemas distribuidos.',
    skipLink: 'Saltar al contenido',
    primaryNavigation: 'Navegación principal',
    homeLabel: 'Pere Antoni Borràs Expósito, inicio',
    expertiseNav: 'Especialización',
    experienceNav: 'Experiencia',
    contactNav: 'Hablemos',
    languageToggle: 'Cambiar el idioma a inglés',
    heroEyebrow: 'Ingeniero sénior .NET · Team Lead · Angular',
    heroTitle: 'Convierto la complejidad en',
    heroTitleAccent: 'software que impulsa el negocio.',
    heroIntro:
      'Soy Pere Antoni Borràs Expósito, ingeniero full stack especializado en .NET, Angular y sistemas distribuidos. Conecto arquitectura, personas y producto para entregar soluciones que importan.',
    exploreWork: 'Conoce mi trayectoria',
    viewExpertise: 'Ver especialización',
    careerHighlights: 'Hitos profesionales',
    yearsBuilt: 'años creando software empresarial',
    developersLed: 'desarrolladores liderados y mentorizados',
    languagesSpoken: 'idiomas para colaborar a nivel global',
    professionalStatement: 'Presentación profesional',
    contributionKicker: 'Lo que aporto',
    contributionTitle: 'La ingeniería sénior es más que escribir código.',
    contributionTitleAccent: 'Es facilitar la siguiente decisión.',
    contributionCopy:
      'Trabajo en todo el ciclo de entrega: entender el problema real, definir la solución, guiar la implementación y ayudar al equipo a elevar el nivel conjuntamente.',
    expertiseKicker: 'Especialización',
    expertiseTitle: 'Profundidad donde importa.',
    expertiseTitleSecondLine: 'Visión global donde aporta valor.',
    expertiseIntro:
      'Un perfil orientado al backend con la amplitud necesaria para conectar estrategia técnica, cloud y experiencia de usuario.',
    keyTechnologies: 'Tecnologías principales',
    capabilities: [
      {
        eyebrow: '01 / Ingeniería',
        title: 'Sistemas backend preparados para crecer.',
        description:
          'Desde las reglas de negocio hasta los servicios distribuidos resilientes, diseño APIs y plataformas que siguen siendo comprensibles mientras evolucionan.',
        technologies: ['.NET', 'C#', 'REST y SOAP', 'SQL Server', 'MongoDB'],
      },
      {
        eyebrow: '02 / Arquitectura',
        title: 'Claridad antes que complejidad.',
        description:
          'Transformo requisitos en dirección técnica mediante una arquitectura pragmática, límites claros y decisiones que el equipo puede hacer suyas.',
        technologies: ['DDD', 'Hexagonal', 'Clean Architecture', 'SOLID', 'Event Driven'],
      },
      {
        eyebrow: '03 / Producto',
        title: 'Una perspectiva full stack real.',
        description:
          'Conecto servicios robustos con experiencias Angular cuidadas, manteniendo el valor de producto y las necesidades del usuario en la misma conversación.',
        technologies: ['Angular', 'TypeScript', 'RxJS', 'Material', 'Cypress'],
      },
      {
        eyebrow: '04 / Entrega',
        title: 'Cloud, automatización y ritmo.',
        description:
          'Los servicios de Azure, CI/CD y los flujos asistidos por IA me ayudan a acortar los ciclos de feedback sin comprometer la calidad de ingeniería.',
        technologies: ['Azure', 'Service Bus', 'CI/CD', 'Agentes IA', 'xUnit'],
      },
    ],
    impactKicker: 'De los requisitos a los resultados',
    impactTitle: 'Ingeniería con contexto de negocio.',
    impactCopy:
      'En Avoris Tech, contribuyo a evolucionar una plataforma utilizada por turoperadores y agencias de viajes internacionales, combinando desarrollo, colaboración directa con clientes y liderazgo técnico para sostener el crecimiento del negocio.',
    impactAreas: 'Áreas de impacto',
    impactPills: [
      'B2B y B2C internacional',
      'Servicios distribuidos',
      'Liderazgo técnico',
      'Tecnología turística',
    ],
    experienceKicker: 'Experiencia',
    experienceTitle: 'Una trayectoria construida con responsabilidad.',
    experienceIntro: 'Desde la entrega full stack hasta el liderazgo técnico y la arquitectura.',
    experience: [
      {
        period: '2023 - Actualidad',
        company: 'AVORIS TECH',
        role: 'Team Lead Full Stack Developer',
        summary:
          'Lidero un equipo de siete personas en una plataforma turística internacional B2B y B2C, transformando objetivos de negocio en soluciones técnicas escalables.',
        highlights: [
          'Diseño de microservicios REST y flujos distribuidos con .NET y Azure Service Bus.',
          'Definición de propuestas de arquitectura, estándares de ingeniería, revisiones y mentoría.',
          'Trabajo directo con clientes internacionales en una plataforma que impulsa un crecimiento de negocio multimillonario.',
        ],
      },
      {
        period: '2022 - 2023',
        company: 'RIU',
        role: 'Full Stack Developer',
        summary:
          'Desarrollé y mantuve aplicaciones de backend y frontend críticas para el negocio con .NET, Java y Angular.',
        highlights: [
          'Migración de un monolito legacy hacia microservicios mediante el patrón Strangler Fig.',
          'Entrega de servicios backend probados y funcionalidades Angular en un equipo ágil multidisciplinar.',
        ],
      },
    ],
    recognitionKicker: 'Reconocimiento · 2023',
    recognitionTitle: 'Ganador del Circular Innovation Hackathon',
    recognitionCopy:
      'Primer puesto por equipos en un reto de 24 horas organizado por Impulsa Balears junto a Hotelbeds, creando un concepto gamificado para un turismo más sostenible y descentralizado.',
    educationKicker: 'Formación',
    educationTitle: 'Tecnología con una mirada creativa.',
    webDevelopment: 'Desarrollo de Aplicaciones Web',
    animation: 'Animación 3D y Entornos Interactivos',
    internationalTitle: 'Raíces locales. Mentalidad internacional.',
    internationalCopy: 'Español y catalán nativos, inglés profesional.',
    contactKicker: 'Construyamos algo con sentido',
    contactTitle: 'Arquitectura. Producto. Personas.',
    contactTitleAccent: 'Una única visión de ingeniería.',
    linkedinContact: 'Conectar en LinkedIn',
    footerCraft: 'Diseñado con intención. Desarrollado con Angular.',
    socialLinks: 'Enlaces sociales',
    backToTop: 'Volver arriba ↑',
  },
};

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  protected readonly language = signal<Language>(this.getInitialLanguage());
  protected readonly copy = computed(() => CONTENT[this.language()]);
  protected readonly year = new Date().getFullYear();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateDocumentLanguage();
    }
  }

  protected toggleLanguage(): void {
    this.language.update((language) => (language === 'en' ? 'es' : 'en'));

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, this.language());
    } catch {
      // Language switching still works when browser storage is unavailable.
    }

    this.updateDocumentLanguage();
  }

  private getInitialLanguage(): Language {
    if (!isPlatformBrowser(this.platformId)) {
      return 'en';
    }

    try {
      const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (storedLanguage === 'en' || storedLanguage === 'es') {
        return storedLanguage;
      }
    } catch {
      // Fall back to the browser language when storage is unavailable.
    }

    return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
  }

  private updateDocumentLanguage(): void {
    const copy = this.copy();
    this.document.documentElement.lang = this.language();
    this.title.setTitle(copy.metaTitle);
    this.meta.updateTag({ name: 'description', content: copy.metaDescription });
    this.meta.updateTag({ property: 'og:title', content: copy.metaTitle });
    this.meta.updateTag({ property: 'og:description', content: copy.metaDescription });
    this.meta.updateTag({ name: 'twitter:title', content: copy.metaTitle });
    this.meta.updateTag({ name: 'twitter:description', content: copy.metaDescription });
  }
}
