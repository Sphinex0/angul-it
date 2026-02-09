import { Component, computed, inject } from '@angular/core';
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
  private readonly service = inject(CaptchaService);
  private readonly router = inject(Router);

  protected readonly duration = computed(() => {
    const state = this.service.state();
    return state.startTime && state.endTime ? state.endTime - state.startTime : 0;
  });

  restart() {
    this.service.reset();
    this.router.navigate(['/']);
  }
}
