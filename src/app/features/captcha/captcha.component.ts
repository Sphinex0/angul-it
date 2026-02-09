import { Component, inject, signal, effect } from '@angular/core';
import { CaptchaService } from '../../core/services/captcha.service';
import { ImageGridComponent } from './ui/image-grid/image-grid.component';
import { Router } from '@angular/router';
import { TextInputComponent } from './ui/text-input/text-input.component';
import { SliderCaptchaComponent } from './ui/slider-captcha/slider-captcha.component';

@Component({
  selector: 'app-captcha',
  imports: [ImageGridComponent, TextInputComponent, SliderCaptchaComponent],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.css',
})
export class CaptchaComponent {
  private readonly captchaService = inject(CaptchaService);
  private readonly router = inject(Router);

  readonly currentStage = this.captchaService.currentStage;
  readonly currentStageIndex = this.captchaService.currentStageIndex;
  readonly currentAnswer = this.captchaService.currentAnswer;

  private readonly currentSelection = signal<string[] | string>([]);
  private readonly isStageValid = signal<boolean>(false);

  constructor() {
    this.captchaService.loadState();

    effect(() => {
      if (!this.currentStage()) {
        this.router.navigate(['/']);
      }
      this.updateValidation();
    });
  }

  protected get selection() {
    return this.currentSelection();
  }

  protected get isValid() {
    return this.isStageValid();
  }

  onSelectionChange(selectedIds: string[] | string) {
    this.currentSelection.set(selectedIds);
    this.captchaService.saveAnswer(this.currentStage().id, selectedIds);
    this.updateValidation();
  }

  handleNext() {
    const isCorrect = this.captchaService.checkAnswer(
      this.currentSelection(),
      this.currentStage().data.target,
    );

    if (isCorrect) {
      this.captchaService.nextStage();
      this.resetUI();

      if (this.captchaService.isFinished()) {
        this.router.navigate(['/result']);
      }
    } else {
      alert('Verification failed. Please try again.');
    }
  }

  handlePrev() {
    this.captchaService.prevStage();
    this.resetUI();
  }

  private resetUI() {
    this.currentSelection.set(this.currentAnswer() || []);
    this.updateValidation();
  }

  private updateValidation() {
    const selection = this.currentSelection();
    const isValid = Array.isArray(selection) ? selection.length > 0 : selection.length > 0;
    this.isStageValid.set(isValid);
  }
}
