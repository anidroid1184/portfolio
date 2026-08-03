import { Component, signal, inject, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TerminalBar } from '../terminal/terminal-bar/terminal-bar';
import { I18nService } from '../core/services/i18n/i18n.service';

const DESKTOP_BP = 1024;

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TerminalBar],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell implements OnInit, OnDestroy {
  readonly i18n = inject(I18nService);

  readonly sidebarOpen = signal(false);

  avatarUrl = 'avatar.jpeg';

  ngOnInit(): void {
    this.sidebarOpen.set(this._isDesktop());
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this._isDesktop()) {
      this.sidebarOpen.set(false);
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  toggleLang(): void {
    this.i18n.toggle();
  }

  private _isDesktop(): boolean {
    return typeof window !== 'undefined' && window.innerWidth >= DESKTOP_BP;
  }

  ngOnDestroy(): void {}
}
