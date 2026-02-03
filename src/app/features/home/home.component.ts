import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CaptchaService } from '../../core/services/captcha.service';

@Component({
  selector: 'app-home',
  standalone: true,
  // imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private router = inject(Router);
  private captchaService = inject(CaptchaService);


  // You can navigate programmatically if you need to run logic before starting
  startChallenge() {
    this.captchaService.reset();
    this.router.navigate(['/challenge']);
  }
}
