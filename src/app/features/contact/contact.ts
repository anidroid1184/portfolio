import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private _fb = inject(FormBuilder);

  readonly submitted = signal(false);
  readonly sendError = signal(false);

  readonly form = this._fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    const { name, email, message } = this.form.value;
    const body = encodeURIComponent(message ?? '');
    const mailto = `mailto:contacto@sebastian.dev?subject=Portafolio - ${encodeURIComponent(name ?? '')}&body=${body}%0A%0A— ${name} (${email})`;
    window.location.href = mailto;
    this.submitted.set(true);
    this.form.reset();
  }
}
