import { ChangeDetectionStrategy, Component } from '@angular/core';

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

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly capabilities: readonly Capability[] = [
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
  ];

  protected readonly experience: readonly Experience[] = [
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
  ];

  protected readonly year = new Date().getFullYear();
}
