import { Component, inject } from '@angular/core';
import { CaptchaService } from '../../core/services/captcha.service';

@Component({
  selector: 'app-captcha',
  imports: [],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.css',
})
export class CaptchaComponent {
  captchaService = inject(CaptchaService);

  constructor() {
    this.captchaService.startNewSession()
    console.log(this.captchaService.allStages());
    
  }
}
