export interface ImageChallengeData {
  target: string;
  items: {
    id: number;
    src: string;
  }[];
}

export interface MathChallengeData {
  equation: string;
}

export interface TextChallengeData {
  scrambledText: string;
}

export interface CaptchaStage {
  id: string;
  type: 'image' | 'math' | 'text';
  prompt: string;
  data: ImageChallengeData // | MathChallengeData | TextChallengeData;
}

export interface CaptchaState {
  currentStageIndex: number;
  stages: CaptchaStage[];
  answers: Record<string, any>;
  isCompleted: boolean;
}


export const MASTER_DATASET = [
  { id: 1, type: 'Hydrant', src: 'assets/images/captchas/Hydrant_1.png' },
  { id: 2, type: 'Hydrant', src: 'assets/images/captchas/Hydrant_2.png' },
  { id: 3, type: 'Hydrant', src: 'assets/images/captchas/Hydrant_3.png' },
  { id: 4, type: 'Hydrant', src: 'assets/images/captchas/Hydrant_4.png' },
  { id: 5, type: 'Hydrant', src: 'assets/images/captchas/Hydrant_5.png' },
  { id: 6, type: 'Hydrant', src: 'assets/images/captchas/Hydrant_6.png' },
  { id: 7, type: 'Hydrant', src: 'assets/images/captchas/Hydrant_7.png' },
  { id: 8, type: 'Hydrant', src: 'assets/images/captchas/Hydrant_8.png' },
  { id: 9, type: 'Hydrant', src: 'assets/images/captchas/Hydrant_9.png' },
  { id: 10, type: 'Car', src: 'assets/images/captchas/Car_1.png' },
  { id: 11, type: 'Car', src: 'assets/images/captchas/Car_2.png' },
  { id: 12, type: 'Car', src: 'assets/images/captchas/Car_3.png' },
  { id: 13, type: 'Car', src: 'assets/images/captchas/Car_4.png' },
  { id: 14, type: 'Car', src: 'assets/images/captchas/Car_5.png' },
  { id: 15, type: 'Car', src: 'assets/images/captchas/Car_6.png' },
  { id: 16, type: 'Car', src: 'assets/images/captchas/Car_7.png' },
  { id: 17, type: 'Car', src: 'assets/images/captchas/Car_8.png' },
  { id: 18, type: 'Car', src: 'assets/images/captchas/Car_9.png' },
  { id: 19, type: 'Stair', src: 'assets/images/captchas/Stair_1.png' },
  { id: 20, type: 'Stair', src: 'assets/images/captchas/Stair_2.png' },
  { id: 21, type: 'Stair', src: 'assets/images/captchas/Stair_3.png' },
  { id: 22, type: 'Stair', src: 'assets/images/captchas/Stair_4.png' },
  { id: 23, type: 'Stair', src: 'assets/images/captchas/Stair_5.png' },
  { id: 24, type: 'Stair', src: 'assets/images/captchas/Stair_6.png' },
  { id: 25, type: 'Stair', src: 'assets/images/captchas/Stair_7.png' },
  { id: 26, type: 'Stair', src: 'assets/images/captchas/Stair_8.png' },
  { id: 27, type: 'Stair', src: 'assets/images/captchas/Stair_9.png' },
  ];
