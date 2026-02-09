import { computed, effect, Injectable, signal } from '@angular/core';
import {
  CaptchaStage,
  CaptchaState,
  ImageChallengeData,
  GRID_DATASET,
  TextChallengeData,
  TEXT_DATASET,
  SliderChallengeData,
} from './../models/captcha.types';

@Injectable({
  providedIn: 'root',
})
export class CaptchaService {
  public state = signal<CaptchaState>(this.loadState());

  readonly currentStageIndex = computed(() => this.state().currentStageIndex);
  readonly allStages = computed(() => this.state().stages);
  readonly currentStage = computed(() => this.state().stages[this.state().currentStageIndex]);
  readonly isFinished = computed(() => this.state().isCompleted);

  readonly currentAnswer = computed(() => this.state().answers[this.currentStage()?.id] || null);

  public loadState(): CaptchaState {
    const json = localStorage.getItem('angul_it_state');
    if (json) {
      return JSON.parse(json);
    }
    const stages = this.generateRandomStages();

    return {
      currentStageIndex: 0,
      stages: stages,
      answers: {},
      isCompleted: false,
      startTime: Date.now(),
      endTime: undefined,
    };
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
      isCompleted: false,
      startTime: Date.now(),
      endTime: undefined,
    });
  }

  private generateRandomStages(): CaptchaStage[] {
    const challenges: CaptchaStage[] = [];
    const totalStages = 3;
    const possibleStages = ['image', 'text', 'slide'];

    for (let i = 0; i < totalStages; i++) {
      const targetType = possibleStages[Math.floor(Math.random() * possibleStages.length)];

      switch (targetType) {
        case 'image':
          challenges.push(this.generateImageStage(i));
          break;
        case 'text':
          challenges.push(this.generateTextStage(i));
          break;
        case 'slide':
          challenges.push(this.generateSlideStage(i));
          break;
        default:
          break;
      }
    }

    return challenges;
  }

  private generateSlideStage(i: number): CaptchaStage {
    let random_target = Math.floor(Math.random() * 140) + 100
    const stage_data: SliderChallengeData = {
      target: (random_target).toString(),
      src: GRID_DATASET[Math.floor(Math.random() * TEXT_DATASET.length)].src,
    };
    return {
      id: `stage_${i}`,
      type: 'slide',
      prompt: `Slide the piece into the right position:`,
      data: stage_data,
    };
  }

  private generateTextStage(i: number): CaptchaStage {
    const stage_data: TextChallengeData =
      TEXT_DATASET[Math.floor(Math.random() * TEXT_DATASET.length)];
    return {
      id: `stage_${i}`,
      type: 'text',
      prompt: `Type the text in the image:`,
      data: stage_data,
    };
  }

  private generateImageStage(i: number): CaptchaStage {
    const possibleTasks = ['Hydrant', 'Stair', 'Car'];

    const targetType = possibleTasks[Math.floor(Math.random() * possibleTasks.length)];

    const correctImages = GRID_DATASET.filter((img) => img.type === targetType);
    const wrongImages = GRID_DATASET.filter((img) => img.type !== targetType);

    if (correctImages.length < 3) {
      console.error(`Not enough ${targetType} images!`);
    }

    const selectedCorrect = this.shuffle(correctImages).slice(0, 3);
    const selectedWrong = this.shuffle(wrongImages).slice(0, 6);
    const fullGrid = this.shuffle([...selectedCorrect, ...selectedWrong]);
    return {
      id: `stage_${i}`,
      type: 'image',
      prompt: `Select all images with ${targetType.toUpperCase()}S`,
      data: { target: targetType, items: fullGrid },
    };
  }

  // Standard Fisher-Yates Shuffle
  private shuffle(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  nextStage() {
    this.state.update((s) => {
      const nextIndex = s.currentStageIndex + 1;

      // If we are out of stages, mark as completed
      if (nextIndex >= s.stages.length) {
        return { ...s, isCompleted: true, endTime: Date.now() };
      }

      return { ...s, currentStageIndex: nextIndex };
    });
  }

  /**
   * Moves back to the previous stage.
   */
  prevStage() {
    this.state.update((s) => {
      const prev = Math.max(0, s.currentStageIndex - 1);
      return { ...s, currentStageIndex: prev };
    });
  }

  checkAnswer(userSelection: string[] | string, targetCategory: string): boolean {
    const stage = this.currentStage();

    // Safety check
    if (!stage) return false;

    switch (stage.type) {
      case 'image':
        if (typeof userSelection === 'string') {
          return false;
        }
        return this.checkGrid(userSelection, targetCategory, stage);
      case 'text':
        if (typeof userSelection !== 'string') {
          return false;
        }
        return this.checkText(userSelection, targetCategory, stage);

      case 'slide':
        if (typeof userSelection !== 'string') {
          return false;
        }

        return this.checkSlide(userSelection, targetCategory, stage);

      default:
        return false;
    }
  }

  checkSlide(userSelection: string, target: string, stage: CaptchaStage) {
    const diff = Math.abs(+userSelection - +target);
    const isSuccess: boolean = diff < 5 ;
    if (isSuccess) {
      this.saveAnswer(stage.id, target);
      return true;
    }

    return false;
  }

  checkText(userSelection: string, target: string, stage: CaptchaStage) {
    if (userSelection === target) {
      this.saveAnswer(stage.id, target);
      return true;
    }
    return false;
  }

  checkGrid(userSelection: string[], targetCategory: string, stage: CaptchaStage) {
    const stageData = stage.data as ImageChallengeData;

    const currentStageImageIds = stageData.items.map((i) => i.id);
    const correctIds = GRID_DATASET.filter(
      (img) => img.type === targetCategory && currentStageImageIds.includes(img.id),
    ).map((img) => img.id);

    const sortedUser = [...userSelection].sort();
    const sortedCorrect = [...correctIds].sort();

    const isMatch = JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);

    if (isMatch) {
      this.saveAnswer(stage.id, userSelection);
      return true;
    }
    return false;
  }

  public saveAnswer(stageId: string, answer: any) {
    this.state.update((s) => ({
      ...s,
      answers: { ...s.answers, [stageId]: answer },
    }));
  }

  reset() {
    localStorage.removeItem('angul_it_state');
    this.startNewSession();
  }
}
