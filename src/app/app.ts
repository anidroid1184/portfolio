import { Component } from '@angular/core';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  imports: [Home],
  template: `<app-home />`,
  styleUrl: './app.css',
})
export class App {}
