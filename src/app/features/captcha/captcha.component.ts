import { Component, inject } from '@angular/core';
import { CaptchaService } from '../../core/services/captcha.service';
import { ImageGridComponent } from './ui/image-grid/image-grid.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-captcha',
  imports: [ImageGridComponent],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.css',
})
export class CaptchaComponent {
  captchaService = inject(CaptchaService);
  private router = inject(Router);

  currentStage = this.captchaService.currentStage;
  currentStageIndex = this.captchaService.currentStageIndex;

  currentAnswer = this.captchaService.currentAnswer;

  currentSelection: string[] = this.currentAnswer() || [];
  isStageValid = this.currentSelection.length > 0;

  constructor() {
    if (!this.currentStage()) {
      this.router.navigate(['/']);
    }
    this.captchaService.startNewSession();
    // console.log(this.captchaService.allStages());
  }

  onSelectionChange(selectedIds: string[]) {
    this.currentSelection = selectedIds;
    // Simple UI validation: Button only enables if they selected SOMETHING
    this.isStageValid = selectedIds.length > 0;
  }

  handleNext() {
    // 1. Ask Service to validate the logic
    const isCorrect = this.captchaService.checkAnswer(
      this.currentSelection,
      this.currentStage().data.target,
    );

    if (isCorrect) {
      // 2. If correct, move to next
      const navigate  = this.captchaService.nextStage();
      this.resetUI();

      // 3. Check if we just finished the last one
      console.log("eeeeeeeeeee")
      console.log(this.captchaService.allStages());
      console.log(this.currentStageIndex());
      if (navigate) {
        this.router.navigate(['/result']);
      }
    } else {
      // 4. If wrong, show error (Shake animation or Alert)
      alert('Verification failed. Please try again.');
      // In a real app, you might generate a NEW challenge here.
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
