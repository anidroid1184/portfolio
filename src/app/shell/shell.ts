import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TerminalBar } from '../terminal/terminal-bar/terminal-bar';
import { I18nService } from '../core/services/i18n/i18n.service';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, TerminalBar],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell {
  readonly i18n = inject(I18nService);

  readonly sidebarOpen = signal(false);

  avatarUrl = 'avatar.jpeg';

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  toggleLang(): void {
    this.i18n.toggle();
  }
}
