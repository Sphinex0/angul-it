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

export interface SliderChallengeData {
  target: string;
  src: string; // Just one image!
}

export interface TextChallengeData {
  src: string;
  target: string;
}

export interface CaptchaStage {
  id: string;
  type: 'image' | 'slide' | 'text';
  prompt: string;
  data: ImageChallengeData | TextChallengeData | SliderChallengeData; // | MathChallengeData ;
}

export interface CaptchaState {
  currentStageIndex: number;
  stages: CaptchaStage[];
  answers: Record<string, any>;
  isCompleted: boolean;
  startTime: number;
  endTime?: number;
}

export const GRID_DATASET = [
  { id: 1, type: 'Hydrant', src: 'assets/images/captchas/grid/Hydrant_1.png' },
  { id: 2, type: 'Hydrant', src: 'assets/images/captchas/grid/Hydrant_2.png' },
  { id: 3, type: 'Hydrant', src: 'assets/images/captchas/grid/Hydrant_3.png' },
  { id: 4, type: 'Hydrant', src: 'assets/images/captchas/grid/Hydrant_4.png' },
  { id: 5, type: 'Hydrant', src: 'assets/images/captchas/grid/Hydrant_5.png' },
  { id: 6, type: 'Hydrant', src: 'assets/images/captchas/grid/Hydrant_6.png' },
  { id: 7, type: 'Hydrant', src: 'assets/images/captchas/grid/Hydrant_7.png' },
  { id: 8, type: 'Hydrant', src: 'assets/images/captchas/grid/Hydrant_8.png' },
  { id: 9, type: 'Hydrant', src: 'assets/images/captchas/grid/Hydrant_9.png' },
  { id: 10, type: 'Car', src: 'assets/images/captchas/grid/Car_1.png' },
  { id: 11, type: 'Car', src: 'assets/images/captchas/grid/Car_2.png' },
  { id: 12, type: 'Car', src: 'assets/images/captchas/grid/Car_3.png' },
  { id: 13, type: 'Car', src: 'assets/images/captchas/grid/Car_4.png' },
  { id: 14, type: 'Car', src: 'assets/images/captchas/grid/Car_5.png' },
  { id: 15, type: 'Car', src: 'assets/images/captchas/grid/Car_6.png' },
  { id: 16, type: 'Car', src: 'assets/images/captchas/grid/Car_7.png' },
  { id: 17, type: 'Car', src: 'assets/images/captchas/grid/Car_8.png' },
  { id: 18, type: 'Car', src: 'assets/images/captchas/grid/Car_9.png' },
  { id: 19, type: 'Stair', src: 'assets/images/captchas/grid/Stair_1.png' },
  { id: 20, type: 'Stair', src: 'assets/images/captchas/grid/Stair_2.png' },
  { id: 21, type: 'Stair', src: 'assets/images/captchas/grid/Stair_3.png' },
  { id: 22, type: 'Stair', src: 'assets/images/captchas/grid/Stair_4.png' },
  { id: 23, type: 'Stair', src: 'assets/images/captchas/grid/Stair_5.png' },
  { id: 24, type: 'Stair', src: 'assets/images/captchas/grid/Stair_6.png' },
  { id: 25, type: 'Stair', src: 'assets/images/captchas/grid/Stair_7.png' },
  { id: 26, type: 'Stair', src: 'assets/images/captchas/grid/Stair_8.png' },
  { id: 27, type: 'Stair', src: 'assets/images/captchas/grid/Stair_9.png' },
];

export const TEXT_DATASET = [
  { target: 'vgxrub'.toUpperCase(), src: 'assets/images/captchas/text/0_vgxrub.jpeg' },
  { target: 'ne2bt2'.toUpperCase(), src: 'assets/images/captchas/text/1_ne2bt2.jpeg' },
  { target: 'tdk6mf'.toUpperCase(), src: 'assets/images/captchas/text/2_tdk6mf.jpeg' },
  { target: 'hvpvkx'.toUpperCase(), src: 'assets/images/captchas/text/3_hvpvkx.jpeg' },
  { target: '6dmens'.toUpperCase(), src: 'assets/images/captchas/text/4_6dmens.jpeg' },
  { target: 'hdebpv'.toUpperCase(), src: 'assets/images/captchas/text/5_hdebpv.jpeg' },
  { target: 'anphkb'.toUpperCase(), src: 'assets/images/captchas/text/6_anphkb.jpeg' },
  { target: 'vvvesr'.toUpperCase(), src: 'assets/images/captchas/text/7_vvvesr.jpeg' },
  { target: 'gmau6u'.toUpperCase(), src: 'assets/images/captchas/text/8_gmau6u.jpeg' },
  { target: 'epe6en'.toUpperCase(), src: 'assets/images/captchas/text/9_epe6en.jpeg' },
  { target: '6nst2a'.toUpperCase(), src: 'assets/images/captchas/text/10_6nst2a.jpeg' },
];
