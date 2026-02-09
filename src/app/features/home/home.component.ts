import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CaptchaService } from '../../core/services/captcha.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly captchaService = inject(CaptchaService);

  startChallenge() {
    this.captchaService.reset();
    this.router.navigate(['/challenge']);
  }
}
