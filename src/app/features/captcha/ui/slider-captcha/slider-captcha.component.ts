import { Component, input, output, signal, effect } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-slider-captcha',
  imports: [ReactiveFormsModule],
  templateUrl: './slider-captcha.component.html',
  styleUrl: './slider-captcha.component.css',
})
export class SliderCaptchaComponent {
  data = input.required<any>();
  initialAnswer = input<string>('');
  answerChange = output<string>();

  sliderControl = new FormControl(0, { nonNullable: true });
  sliderValue = signal<number>(0);
  targetX = signal<number>(0);
  targetY = signal<number>(40);

  readonly puzzlePath =
    'M 10 0 L 30 0 C 30 0 30 10 40 10 C 50 10 50 0 50 0 L 70 0 L 70 30 L 60 30 C 60 30 50 30 50 40 C 50 50 60 50 60 50 L 70 50 L 70 70 L 10 70 L 10 0 Z';

  constructor() {
    effect(() => {
      this.targetX.set(+this.data().target);
      this.sliderControl.setValue(+this.initialAnswer() || 50);
    });

    this.sliderControl.valueChanges.subscribe((val) => {
      this.sliderValue.set(val);
    });
  }

  onRelease() {
    this.answerChange.emit(this.sliderControl.value!.toString());
  }
}
