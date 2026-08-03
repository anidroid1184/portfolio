import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private fb = inject(FormBuilder);

  submitted = false;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.valid) {
      const { name, email, message } = this.form.value;
      window.open(
        `mailto:contacto@sebastian.dev?subject=Contacto desde portafolio - ${name}&body=${encodeURIComponent(message ?? '')}%0A%0A— ${name} (${email})`,
        '_blank',
      );
      this.submitted = true;
      this.form.reset();
    }
  }
}
