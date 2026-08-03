import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export type CommandResult = {
  type: 'navigate' | 'message' | 'error';
  message?: string;
  route?: string;
};

@Injectable({ providedIn: 'root' })
export class TerminalCommandService {
  readonly commandHistory = signal<string[]>([]);
  readonly historyIndex = signal<number>(-1);
  readonly lastFeedback = signal<string>('');
  readonly isHelpVisible = signal<boolean>(false);

  readonly availableCommands = [
    { name: 'whoami', description: 'Sobre mí / About me', route: '/whoami', section: 'nav' },
    { name: 'projects', description: 'Proyectos / Projects', route: '/projects', section: 'nav' },
    {
      name: 'experience',
      description: 'Experiencia / Experience',
      route: '/experience',
      section: 'nav',
    },
    { name: 'contact', description: 'Contacto / Contact', route: '/contact', section: 'nav' },
    {
      name: 'help',
      description: 'Mostrar esta guía / Show this guide',
      route: null,
      section: 'info',
    },
    { name: 'clear', description: 'Limpiar terminal / Clear terminal', route: null, section: 'info' },
    { name: 'date', description: 'Fecha actual / Current date', route: null, section: 'info' },
    { name: 'sysinfo', description: 'Info del sistema / System info', route: null, section: 'info' },
    { name: 'echo <msg>', description: 'Repetir mensaje / Echo message', route: null, section: 'info' },
    {
      name: 'home',
      description: 'Ir al inicio / Go home',
      route: '/home',
      section: 'nav',
    },
  ];

  readonly sections = [
    { key: 'nav', label: '— NAVEGACIÓN / NAVIGATION —' },
    { key: 'info', label: '— UTILIDADES / UTILITIES —' },
  ];

  constructor(private router: Router) {}

  executeCommand(input: string): CommandResult {
    const trimmed = input.trim();
    if (!trimmed) {
      return { type: 'message', message: '' };
    }

    this.commandHistory.update((history) => [...history, trimmed]);
    this.historyIndex.set(this.commandHistory().length);
    this.isHelpVisible.set(false);

    const parts = trimmed.split(/\s+/);
    const commandName = parts[0].toLowerCase();

    const result = this.resolveCommand(commandName, parts.slice(1));

    if (result.type === 'navigate' && result.route) {
      this.lastFeedback.set(`> ${trimmed}`);
      this.router.navigate([result.route]);
    } else if (result.type === 'message') {
      this.lastFeedback.set(result.message || '');
    } else if (result.type === 'error') {
      this.lastFeedback.set(
        result.message ||
          'Command not found. Type "help" for available commands.',
      );
    }

    return result;
  }

  private resolveCommand(name: string, args: string[]): CommandResult {
    const navMap: Record<string, string> = {
      whoami: '/whoami',
      projects: '/projects',
      experience: '/experience',
      contact: '/contact',
      home: '/home',
      ls_projects: '/projects',
      ls_experience: '/experience',
    };

    if (navMap[name]) {
      return { type: 'navigate', route: navMap[name] };
    }

    switch (name) {
      case 'help':
      case '--help':
        this.isHelpVisible.set(true);
        return { type: 'message', message: 'Mostrando guía de comandos...' };

      case 'clear':
        this.lastFeedback.set('');
        this.commandHistory.set([]);
        return { type: 'message', message: '' };

      case 'date':
        return {
          type: 'message',
          message: `> ${new Date().toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}`,
        };

      case 'sysinfo':
        return {
          type: 'message',
          message: '> OPERATOR_INTERFACE v8.5 | Angular 21 | Node 24 | Jacquard Protocol',
        };

      case 'echo':
        return { type: 'message', message: `> ${args.join(' ') || ''}` };

      default:
        return {
          type: 'error',
          message: `Command not found: "${name}". Type "help" to see available commands.`,
        };
    }
  }

  navigateHistory(direction: number): string {
    const history = this.commandHistory();
    if (history.length === 0) return '';

    const newIndex = this.historyIndex() + direction;
    const clamped = Math.max(0, Math.min(newIndex, history.length - 1));
    this.historyIndex.set(clamped);
    return history[clamped] || '';
  }
}
