import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TerminalCommandService {
  readonly commandHistory = signal<string[]>([]);
  readonly historyIndex = signal<number>(-1);
  readonly lastFeedback = signal<string>('');
  readonly isHelpVisible = signal<boolean>(false);
  readonly scrollTarget = signal<string | null>(null);

  readonly availableCommands = [
    { name: 'whoami', description: 'Sobre mí', scrollTo: 'about', section: 'nav' },
    { name: 'home', description: 'Ir al inicio', scrollTo: 'top', section: 'nav' },
    { name: 'experience', description: 'Experiencia', scrollTo: 'experience', section: 'nav' },
    { name: 'projects', description: 'Proyectos', scrollTo: 'projects', section: 'nav' },
    { name: 'contact', description: 'Contacto', scrollTo: 'contact', section: 'nav' },
    { name: 'help', description: 'Mostrar esta guía', section: 'info' },
    { name: 'clear', description: 'Limpiar terminal', section: 'info' },
    { name: 'date', description: 'Fecha actual', section: 'info' },
    { name: 'sysinfo', description: 'Info del sistema', section: 'info' },
    { name: 'echo <msg>', description: 'Repetir mensaje', section: 'info' },
  ];

  readonly sections = [
    { key: 'nav', label: '— NAVEGACIÓN —' },
    { key: 'info', label: '— UTILIDADES —' },
  ];

  executeCommand(input: string): void {
    const trimmed = input.trim();
    if (!trimmed) return;

    this.commandHistory.update((h) => [...h, trimmed]);
    this.historyIndex.set(this.commandHistory().length);
    this.isHelpVisible.set(false);
    this.scrollTarget.set(null);

    const name = trimmed.split(/\s+/)[0].toLowerCase();
    const cmd = this.availableCommands.find((c) => c.name.split(' ')[0] === name);

    if (cmd && cmd.scrollTo) {
      this.lastFeedback.set(`> ${trimmed}`);
      this.scrollTarget.set(cmd.scrollTo);
      return;
    }

    if (name === 'help') {
      this.isHelpVisible.set(true);
      this.lastFeedback.set('Mostrando guía de comandos...');
      return;
    }

    if (name === 'clear') {
      this.lastFeedback.set('');
      this.commandHistory.set([]);
      return;
    }

    if (name === 'date') {
      this.lastFeedback.set(`> ${new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`);
      return;
    }

    if (name === 'sysinfo') {
      this.lastFeedback.set('> Jacquard Protocol | Angular 21 | Node 24 | Telar activo');
      return;
    }

    if (name === 'echo') {
      const msg = trimmed.split(/\s+/).slice(1).join(' ');
      this.lastFeedback.set(`> ${msg || ''}`);
      return;
    }

    this.lastFeedback.set(`Comando no encontrado: "${name}". Escribe "help" para ver los disponibles.`);
  }

  navigateHistory(direction: number): string {
    const history = this.commandHistory();
    if (history.length === 0) return '';
    const i = Math.max(0, Math.min(this.historyIndex() + direction, history.length - 1));
    this.historyIndex.set(i);
    return history[i] || '';
  }
}
