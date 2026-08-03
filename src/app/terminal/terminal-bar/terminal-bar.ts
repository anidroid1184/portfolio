import { Component, OnInit, OnDestroy, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalCommandService } from '../services/terminal-command.service';
import { I18nService } from '../../core/services/i18n/i18n.service';

type BootLine = { text: string; delay: number };

const BOOT_SEQUENCE: BootLine[] = [
  { text: 'INITIALIZING OPERATOR INTERFACE v8.5', delay: 250 },
  { text: 'MOUNTING FILESYSTEM... OK', delay: 350 },
  { text: 'LOADING IDENTITY_MATRIX... OK', delay: 300 },
  { text: 'CONNECTING TO ARCHIVE NODE... SECURE_LINK', delay: 400 },
  { text: 'RENDERING WOVEN PATTERNS... DONE', delay: 250 },
  { text: 'SYSTEM READY.', delay: 200 },
];

@Component({
  selector: 'app-terminal-bar',
  imports: [CommonModule],
  templateUrl: './terminal-bar.html',
  styleUrl: './terminal-bar.css',
})
export class TerminalBar implements OnInit, OnDestroy {
  readonly sidebarOpen = input(true);
  readonly i18n = inject(I18nService);

  inputValue = '';
  bootLines: string[] = [];
  bootDone = false;
  private _timeouts: ReturnType<typeof setTimeout>[] = [];

  constructor(readonly terminalCommandService: TerminalCommandService) {}

  ngOnInit(): void {
    let cumulative = 0;
    for (const line of BOOT_SEQUENCE) {
      cumulative += line.delay;
      this._timeouts.push(
        setTimeout(() => {
          this.bootLines = [...this.bootLines, line.text];
        }, cumulative),
      );
    }
    this._timeouts.push(
      setTimeout(() => {
        this.bootDone = true;
      }, cumulative + 400),
    );
  }

  ngOnDestroy(): void {
    this._timeouts.forEach(clearTimeout);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.executeCommand(this.inputValue.trim());
      this.inputValue = '';
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.inputValue = this.terminalCommandService.navigateHistory(-1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.inputValue = this.terminalCommandService.navigateHistory(1);
    }
  }

  executeCommand(command: string): void {
    this.terminalCommandService.executeCommand(command);
  }

  toggleHelp(): void {
    this.terminalCommandService.isHelpVisible.update((v) => !v);
  }

  commandsInSection(section: string) {
    return this.terminalCommandService.availableCommands.filter(
      (c) => c.section === section,
    );
  }
}
