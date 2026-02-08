import { Component, inject } from '@angular/core';
import { CaptchaService } from '../../core/services/captcha.service';
import { ImageGridComponent } from './ui/image-grid/image-grid.component';
import { Router } from '@angular/router';
import { TextInputComponent } from './ui/text-input/text-input.component';
import { SliderCaptchaComponent } from "./ui/slider-captcha/slider-captcha.component";

@Component({
  selector: 'app-captcha',
  imports: [ImageGridComponent, TextInputComponent, SliderCaptchaComponent],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.css',
})
export class CaptchaComponent {
  captchaService = inject(CaptchaService);
  private router = inject(Router);

  currentStage = this.captchaService.currentStage;
  currentStageIndex = this.captchaService.currentStageIndex;

  currentAnswer = this.captchaService.currentAnswer;

  currentSelection: string[] | string= this.currentAnswer() || [];
  isStageValid = this.currentSelection.length > 0;

  constructor() {
    if (!this.currentStage()) {
      this.router.navigate(['/']);
    }
    this.captchaService.loadState();
    // console.log(this.captchaService.allStages());
  }

  onSelectionChange(selectedIds: string[] | string) {
    if (typeof selectedIds === 'string') {
      this.currentSelection = selectedIds;
    this.isStageValid = selectedIds.length >= 3;

    }else{
      this.currentSelection = selectedIds;
    this.isStageValid = selectedIds.length > 0;

    }

  }

  handleNext() {
    // 1. Ask Service to validate the logic
    const isCorrect = this.captchaService.checkAnswer(
      this.currentSelection,
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
    this.currentSelection = this.currentAnswer() || [];
    this.isStageValid = this.currentSelection.length > 0;
  }

  resetUI() {
    this.currentSelection = this.currentAnswer() || [];
    this.isStageValid = this.currentSelection.length > 0;
  }
}
