import { computed, effect, Injectable, signal } from '@angular/core';
import { CaptchaStage, CaptchaState, MASTER_DATASET } from '../models/captcha.types';

@Injectable({
  providedIn: 'root',
})
export class CaptchaService {
  private state = signal<CaptchaState>(this.loadState());

  readonly currentStageIndex = computed(() => this.state().currentStageIndex);
  readonly allStages = computed(() => this.state().stages);
  readonly currentStage = computed(() => this.state().stages[this.state().currentStageIndex]);
  readonly isFinished = computed(() => this.state().isCompleted);

  readonly currentAnswer = computed(() => this.state().answers[this.currentStage()?.id] || null);

  private loadState(): CaptchaState {
    const json = localStorage.getItem('angul_it_state');
    if (json) {
      return JSON.parse(json);
    }

    return { currentStageIndex: 0, stages: [], answers: {}, isCompleted: false };
  }

  constructor() {
    effect(() => {
      localStorage.setItem('angul_it_state', JSON.stringify(this.state()));
    });
  }

  startNewSession() {
    const stages = this.generateRandomStages();
    this.state.set({
      currentStageIndex: 0,
      stages: stages,
      answers: {},
      isCompleted: false
    });
  }

  private generateRandomStages(): CaptchaStage[] {
    const challenges: CaptchaStage[] = [];
    const totalStages = 3; // How many levels user must pass

    // 1. Define possible tasks
    const possibleTasks = ['cat', 'traffic'];

    for (let i = 0; i < totalStages; i++) {
      // 2. Pick a random target (e.g., 'cat')
      const targetType = possibleTasks[Math.floor(Math.random() * possibleTasks.length)];

      // 3. Filter the pool
      const correctImages = MASTER_DATASET.filter((img) => img.type === targetType);
      const wrongImages = MASTER_DATASET.filter((img) => img.type !== targetType);

      // 4. Safety Check: Do we have enough images?
      if (correctImages.length < 3) {
        console.error(`Not enough ${targetType} images!`);
        continue;
      }

      // 5. Build the Grid (e.g., 3 Correct + 6 Wrong)
      // Helper function 'shuffle' (Fisher-Yates) needed here
      const selectedCorrect = this.shuffle(correctImages).slice(0, 3);
      const selectedWrong = this.shuffle(wrongImages).slice(0, 6);
      const fullGrid = this.shuffle([...selectedCorrect, ...selectedWrong]);

      challenges.push({
        id: `stage_${i}`,
        type: 'image',
        prompt: `Select all images with ${targetType.toUpperCase()}S`,
        data: { items: fullGrid },
      });
    }

    return challenges;
  }

  // Standard Fisher-Yates Shuffle
  private shuffle(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
