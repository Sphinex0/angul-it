import { computed, effect, Injectable, signal } from '@angular/core';
import {
  CaptchaStage,
  CaptchaState,
  ImageChallengeData,
  GRID_DATASET,
  TEXT_DATASET,
} from '../models/captcha.types';

const STORAGE_KEY = 'angul_it_state';
const TOTAL_STAGES = 3;
const STAGE_TYPES = ['image', 'text', 'slide'] as const;
const SLIDER_TOLERANCE = 5;
const CORRECT_IMAGES_COUNT = 3;
const WRONG_IMAGES_COUNT = 6;

@Injectable({
  providedIn: 'root',
})
export class CaptchaService {
  readonly state = signal<CaptchaState>(this.loadState());

  readonly currentStageIndex = computed(() => this.state().currentStageIndex);
  readonly allStages = computed(() => this.state().stages);
  readonly currentStage = computed(() => this.state().stages[this.state().currentStageIndex]);
  readonly isFinished = computed(() => this.state().isCompleted);
  readonly currentAnswer = computed(() => this.state().answers[this.currentStage()?.id] || null);

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state()));
    });
  }

  loadState(): CaptchaState {
    const json = localStorage.getItem(STORAGE_KEY);
    if (json) {
      return JSON.parse(json);
    }
    return this.createNewSession();
  }

  private createNewSession(): CaptchaState {
    return {
      currentStageIndex: 0,
      stages: this.generateRandomStages(),
      answers: {},
      isCompleted: false,
      startTime: Date.now(),
      endTime: undefined,
    };
  }

  private generateRandomStages(): CaptchaStage[] {
    const stages: CaptchaStage[] = [];
    for (let i = 0; i < TOTAL_STAGES; i++) {
      const stageType = STAGE_TYPES[Math.floor(Math.random() * STAGE_TYPES.length)];
      switch (stageType) {
        case 'image':
          stages.push(this.generateImageStage(i));
          break;
        case 'text':
          stages.push(this.generateTextStage(i));
          break;
        case 'slide':
          stages.push(this.generateSlideStage(i));
          break;
      }
    }
    return stages;
  }

  private generateSlideStage(index: number): CaptchaStage {
    const randomTarget = Math.floor(Math.random() * 140) + 100;
    const randomImageIndex = Math.floor(Math.random() * GRID_DATASET.length);

    return {
      id: `stage_${index}`,
      type: 'slide',
      prompt: 'Slide the piece into the right position',
      data: {
        target: randomTarget.toString(),
        src: GRID_DATASET[randomImageIndex].src,
      },
    };
  }

  private generateTextStage(index: number): CaptchaStage {
    const randomChallengeIndex = Math.floor(Math.random() * TEXT_DATASET.length);
    const challenge = TEXT_DATASET[randomChallengeIndex];

    return {
      id: `stage_${index}`,
      type: 'text',
      prompt: 'Type the text in the image',
      data: challenge,
    };
  }

  private generateImageStage(index: number): CaptchaStage {
    const categories = ['Hydrant', 'Stair', 'Car'];
    const targetCategory = categories[Math.floor(Math.random() * categories.length)];

    const correctImages = GRID_DATASET.filter((img) => img.type === targetCategory);
    const wrongImages = GRID_DATASET.filter((img) => img.type !== targetCategory);

    const selectedCorrect = this.shuffle(correctImages).slice(0, CORRECT_IMAGES_COUNT);
    const selectedWrong = this.shuffle(wrongImages).slice(0, WRONG_IMAGES_COUNT);
    const gridItems = this.shuffle([...selectedCorrect, ...selectedWrong]);

    return {
      id: `stage_${index}`,
      type: 'image',
      prompt: `Select all images with ${targetCategory.toUpperCase()}S`,
      data: { target: targetCategory, items: gridItems },
    };
  }

  private shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  nextStage() {
    this.state.update((s) => {
      const nextIndex = s.currentStageIndex + 1;
      return nextIndex >= s.stages.length
        ? { ...s, isCompleted: true, endTime: Date.now() }
        : { ...s, currentStageIndex: nextIndex };
    });
  }

  prevStage() {
    this.state.update((s) => ({
      ...s,
      currentStageIndex: Math.max(0, s.currentStageIndex - 1),
    }));
  }

  checkAnswer(userSelection: string[] | string, targetCategory: string): boolean {
    const stage = this.currentStage();
    if (!stage) return false;

    switch (stage.type) {
      case 'image':
        return !Array.isArray(userSelection)
          ? false
          : this.checkGrid(userSelection, targetCategory, stage);
      case 'text':
        return typeof userSelection !== 'string'
          ? false
          : this.checkText(userSelection, targetCategory, stage);
      case 'slide':
        return typeof userSelection !== 'string'
          ? false
          : this.checkSlide(userSelection, targetCategory, stage);
      default:
        return false;
    }
  }

  private checkSlide(userSelection: string, target: string, stage: CaptchaStage): boolean {
    const diff = Math.abs(+userSelection - +target);
    const isCorrect = diff < SLIDER_TOLERANCE;
    if (isCorrect) {
      this.saveAnswer(stage.id, target);
    }
    return isCorrect;
  }

  private checkText(userSelection: string, target: string, stage: CaptchaStage): boolean {
    const isCorrect = userSelection === target;
    if (isCorrect) {
      this.saveAnswer(stage.id, target);
    }
    return isCorrect;
  }

  private checkGrid(
    userSelection: string[],
    targetCategory: string,
    stage: CaptchaStage
  ): boolean {
    const stageData = stage.data as ImageChallengeData;
    const currentImageIds = stageData.items.map((item) => item.id);

    const correctIds = GRID_DATASET.filter(
      (img) => img.type === targetCategory && currentImageIds.includes(img.id)
    ).map((img) => img.id);

    const isMatch =
      JSON.stringify([...userSelection].sort()) === JSON.stringify([...correctIds].sort());

    if (isMatch) {
      this.saveAnswer(stage.id, userSelection);
    }
    return isMatch;
  }

  saveAnswer(stageId: string, answer: any) {
    this.state.update((s) => ({
      ...s,
      answers: { ...s.answers, [stageId]: answer },
    }));
  }

  reset() {
    localStorage.removeItem(STORAGE_KEY);
    this.state.set(this.createNewSession());
  }
}
