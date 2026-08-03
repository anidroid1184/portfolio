import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';

type LoadingStage = {
  message: string;
};

const STAGES: LoadingStage[] = [
  { message: 'Tensando urdimbre...' },
  { message: 'Cruzando lanzadera...' },
  { message: 'Tejido completo' },
];

@Component({
  selector: 'app-loading',
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading implements OnInit, OnDestroy {
  readonly stages = STAGES;

  readonly progress = signal(0);
  readonly activeStage = signal(-1);

  private _timer: ReturnType<typeof setTimeout> | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this._run();
  }

  ngOnDestroy(): void {
    if (this._timer !== null) clearTimeout(this._timer);
  }

  private _run(): void {
    const total = 1200;
    const tickMs = 40;
    const step = 100 / (total / tickMs);
    const stageSpan = 100 / this.stages.length;

    const tick = () => {
      const next = Math.min(this.progress() + step, 100);
      this.progress.set(next);
      this.activeStage.set(Math.min(Math.floor(next / stageSpan), this.stages.length - 1));

      if (next >= 100) {
        this._timer = setTimeout(() => this.router.navigate(['/home']), 200);
        return;
      }
      this._timer = setTimeout(tick, tickMs);
    };

    this._timer = setTimeout(tick, 200);
  }

  skip(): void {
    if (this._timer !== null) clearTimeout(this._timer);
    this.router.navigate(['/home']);
  }
}
