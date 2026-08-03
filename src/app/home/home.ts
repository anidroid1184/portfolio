import { Component, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { ProjectCard, type MotifProject } from '../shared/components/project-card/project-card';
import { I18nService } from '../core/services/i18n/i18n.service';

@Component({
  selector: 'app-home',
  imports: [ProjectCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {
  readonly i18n = inject(I18nService);

  readonly projects: MotifProject[] = [
    {
      name: 'Attendance System',
      index: '001-A',
      featured: true,
      description: 'Sistema de control de asistencia con API y gestión de registros.',
      impact: 'Optimicé consultas de asistencia reduciendo la latencia de respuesta en un 40%.',
      stack: ['FastAPI', 'Redis', 'PostgreSQL', 'Docker'],
      icon: 'fingerprint',
      accentColor: '#cc9a2e',
      sourceUrl: 'https://github.com',
      demoUrl: 'https://example.com',
    },
    {
      name: 'Palette ID',
      index: '002-B',
      description: 'Identificación de paletas desde imágenes para análisis visual.',
      impact: 'Reduje el tiempo de extracción de paleta para prototipos de branding visual.',
      stack: ['Python', 'OpenCV', 'FastAPI'],
      icon: 'palette',
      accentColor: '#e8b840',
      sourceUrl: 'https://github.com',
      demoUrl: 'https://example.com',
    },
    {
      name: 'Auth Service',
      index: '003-C',
      description: 'Gestión de usuarios y roles con enfoque en rendimiento y seguridad.',
      impact: 'Diseñé RBAC simple y mantenible para acelerar el desarrollo de nuevas features.',
      stack: ['Go', 'REST', 'JWT', 'PostgreSQL'],
      icon: 'lock',
      accentColor: '#cc9a2e',
      sourceUrl: 'https://github.com',
    },
    {
      name: 'Node Redactor',
      index: '004-D',
      description: 'Automatización de enmascaramiento de datos PII con procesamiento en streaming.',
      impact: 'Eliminé riesgo de exposición de datos sensibles en pipelines de logging.',
      stack: ['Go', 'Kafka', 'Redis'],
      icon: 'ink_eraser',
      accentColor: '#b8943f',
      sourceUrl: 'https://github.com',
    },
    {
      name: 'Grid Monitor',
      index: '005-E',
      description: 'Visualización y análisis de paquetes de red en tiempo real.',
      impact: 'Reduje el tiempo de diagnóstico de incidencias de red en un 60%.',
      stack: ['Python', 'WebSocket', 'D3.js'],
      icon: 'monitoring',
      accentColor: '#cc9a2e',
      sourceUrl: 'https://github.com',
    },
    {
      name: 'Log Parser',
      index: '006-F',
      description: 'Middleware de agregación y búsqueda de logs distribuidos.',
      impact: 'Centralicé +500GB diarios de logs con queries sub-100ms.',
      stack: ['Go', 'Elasticsearch', 'gRPC'],
      icon: 'data_object',
      accentColor: '#e8b840',
      sourceUrl: 'https://github.com',
    },
  ];

  private _observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const grid = document.querySelector('.motifs-grid');
    if (!grid) return;

    const children = Array.from(grid.children) as HTMLElement[];
    const total = children.length;

    this._observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const host = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            host.classList.add('motif-visible');
          } else {
            host.classList.remove('motif-visible');
          }
        }
      },
      { threshold: 0.15 },
    );

    for (let i = 0; i < total; i++) {
      const from = i % 2 === 0 ? '-40px' : '40px';
      children[i].style.setProperty('--slide-from', from);
      this._observer.observe(children[i]);
    }
  }

  ngOnDestroy(): void {
    this._observer?.disconnect();
  }

  scrollToProjects(): void {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
