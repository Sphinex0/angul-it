import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CaptchaService } from '../../core/services/captcha.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  private service = inject(CaptchaService);
  private router = inject(Router);

  restart() {
    this.service.reset(); // Clear state and storage
    this.router.navigate(['/']); // Go back to Home
  }
}
