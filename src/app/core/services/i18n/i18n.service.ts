import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'es' | 'en';

const DICT: Record<Lang, Record<string, string>> = {
  es: {
    'system.active': 'EN_TELAR',
    'hero.role': 'Embedded Systems & Firmware Engineer | Backend Developer Cloud',
    'hero.tagline': 'Cada línea de código es un hilo.\nCada sistema, un patrón tejido.',
    'hero.cta': 'Explorar el telar',
    'motifs.title': 'Motivos tejidos',
    'motifs.subtitle': 'PATRONES_COMPLETOS',
    'project.code': 'Ver código',
    'project.demo': 'Demo',
    'footer.text': 'Diseñado y tejido por Juan Sebastián Valencia Londoño',
    'toolbar.sidebar.show': 'Mostrar barra lateral',
    'toolbar.sidebar.hide': 'Ocultar barra lateral',
    'toolbar.lang.es': 'Cambiar a español',
    'toolbar.lang.en': 'Switch to English',
    'terminal.placeholder': 'Escribe "help" para ver comandos',
    'terminal.help.title': 'Comandos disponibles',
    'terminal.help.close': 'Cerrar ayuda',
  },
  en: {
    'system.active': 'LOOM_ACTIVE',
    'hero.role': 'Embedded Systems & Firmware Engineer | Backend Developer Cloud',
    'hero.tagline': 'Every line of code is a thread.\nEvery system, a woven pattern.',
    'hero.cta': 'Explore the loom',
    'motifs.title': 'Woven motifs',
    'motifs.subtitle': 'COMPLETED_PATTERNS',
    'project.code': 'View code',
    'project.demo': 'Demo',
    'footer.text': 'Designed and woven by Juan Sebastián Valencia Londoño',
    'toolbar.sidebar.show': 'Show sidebar',
    'toolbar.sidebar.hide': 'Hide sidebar',
    'toolbar.lang.es': 'Cambiar a español',
    'toolbar.lang.en': 'Switch to English',
    'terminal.placeholder': 'Type "help" for commands',
    'terminal.help.title': 'Available Commands',
    'terminal.help.close': 'Close help',
  },
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly _lang = signal<Lang>(this._detectLang());

  readonly lang = this._lang.asReadonly();
  readonly isEs = computed(() => this._lang() === 'es');
  readonly isEn = computed(() => this._lang() === 'en');
  readonly dict = computed(() => DICT[this._lang()]);

  t(key: string): string {
    return DICT[this._lang()]?.[key] ?? key;
  }

  toggle(): void {
    this._lang.set(this._lang() === 'es' ? 'en' : 'es');
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('lang', this._lang());
    }
  }

  private _detectLang(): Lang {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('lang') as Lang | null;
      if (stored === 'es' || stored === 'en') return stored;
    }
    if (typeof navigator !== 'undefined' && navigator.language?.startsWith('es')) {
      return 'es';
    }
    return 'en';
  }
}
